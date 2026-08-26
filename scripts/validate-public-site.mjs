import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const locales = ['en', 'es', 'ru'];
const localizedPages = [
  'index.html',
  'privacy.html',
  'terms.html',
  'account-deletion.html',
  'support.html',
  'ai-disclosure.html',
  'disclaimer.html',
];
const expectedPublicPaths = new Set([
  '/',
  ...locales.flatMap((locale) => localizedPages.map((page) =>
    page === 'index.html' ? `/${locale}/` : `/${locale}/${page}`)),
]);

function fail(message) {
  throw new Error(message);
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function localFileForUrl(urlPath) {
  if (urlPath === '/') return 'index.html';
  if (urlPath.endsWith('/')) return `${urlPath.slice(1)}index.html`;
  return urlPath.slice(1);
}

function attributeValues(html, attribute) {
  const values = [];
  const expression = new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'gi');
  for (const match of html.matchAll(expression)) values.push(match[2]);
  return values;
}

function stripQueryAndFragment(value) {
  return value.split('#', 1)[0].split('?', 1)[0];
}

function assertLocalTarget(sourceFile, rawTarget) {
  if (!rawTarget || rawTarget.startsWith('#') || rawTarget.startsWith('data:')) return;
  if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(rawTarget)) return;
  const target = stripQueryAndFragment(rawTarget);
  if (!target) return;
  const resolved = target.startsWith('/')
    ? path.join(root, localFileForUrl(target))
    : path.resolve(path.dirname(path.join(root, sourceFile)), target);
  if (!resolved.startsWith(`${root}${path.sep}`) && resolved !== root) {
    fail(`${sourceFile}: local target escapes the site root: ${rawTarget}`);
  }
  const candidate = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()
    ? path.join(resolved, 'index.html')
    : resolved;
  if (!fs.existsSync(candidate)) fail(`${sourceFile}: missing local target ${rawTarget}`);
}

const sitemap = read('sitemap.xml');
const sitemapPaths = new Set(
  [...sitemap.matchAll(/<loc>https:\/\/astroguides\.app([^<]*)<\/loc>/g)]
    .map((match) => match[1] || '/'),
);
if (sitemapPaths.size !== expectedPublicPaths.size) {
  fail(`sitemap path count ${sitemapPaths.size}, expected ${expectedPublicPaths.size}`);
}
for (const expected of expectedPublicPaths) {
  if (!sitemapPaths.has(expected)) fail(`sitemap is missing ${expected}`);
  const file = localFileForUrl(expected);
  if (!fs.existsSync(path.join(root, file))) fail(`sitemap target is missing locally: ${file}`);
}
for (const actual of sitemapPaths) {
  if (!expectedPublicPaths.has(actual)) fail(`sitemap contains unexpected path ${actual}`);
}

const publicFiles = ['index.html', ...locales.flatMap((locale) =>
  localizedPages.map((page) => `${locale}/${page}`))];
for (const file of publicFiles) {
  const html = read(file);
  if (!/<html\b[^>]*\blang=["'][a-z]{2}["']/i.test(html)) fail(`${file}: missing html lang`);
  if (!/<main\b/i.test(html)) fail(`${file}: missing main landmark`);
  if (!/<a\b[^>]*class=["'][^"']*skip-link/i.test(html)) fail(`${file}: missing skip link`);
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) fail(`${file}: expected exactly one h1, found ${h1Count}`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=\s*(["']).*?\1/i.test(image[0])) fail(`${file}: img without alt`);
  }
  for (const target of [...attributeValues(html, 'href'), ...attributeValues(html, 'src')]) {
    assertLocalTarget(file, target);
  }
}

for (const locale of locales) {
  const landing = read(`${locale}/index.html`);
  if (!/Solar System Scope/i.test(landing) || !/creativecommons\.org\/licenses\/by\/4\.0/i.test(landing)) {
    fail(`${locale}/index.html: missing visible Solar System Scope / CC BY 4.0 attribution`);
  }
}

const headers = read('_headers');
for (const required of [
  'Content-Security-Policy:',
  'Permissions-Policy:',
  'Referrer-Policy:',
  'Strict-Transport-Security:',
  'X-Content-Type-Options:',
  'X-Frame-Options:',
]) {
  if (!headers.includes(required)) fail(`_headers is missing ${required}`);
}

console.log(`public site validation: PASS (${publicFiles.length} pages, ${sitemapPaths.size} sitemap URLs)`);
