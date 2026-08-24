import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const formScript = fs.readFileSync(path.join(root, 'forms-fallback.js'), 'utf8');

const expected = {
  en: {
    completed: /permanently deleted/i,
    notFound: /no matching account was found[^.]*no account was deleted/i,
    receipt: /does not confirm deletion/i,
    page: [/anonymous user ID/i, /recovery secret/i, /does not collect or store/i],
  },
  ru: {
    completed: /безвозвратно удалены/i,
    notFound: /аккаунт не найден[^.]*не был удалён/i,
    receipt: /не подтверждает удаление/i,
    page: [/анонимному ID пользователя/i, /секрету восстановления/i, /не собирает и не хранит/i],
  },
  es: {
    completed: /se eliminaron de forma permanente/i,
    notFound: /no encontramos una cuenta coincidente[^.]*no se eliminó ninguna cuenta/i,
    receipt: /no confirma la eliminación/i,
    page: [/ID de usuario anónimo/i, /secreto de recuperación/i, /no recopila ni guarda/i],
  },
};

function renderQuery(lang, search) {
  let onReady;
  const status = {
    textContent: '',
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  const form = {
    name: 'account-deletion',
    elements: { website: {} },
    querySelector(selector) {
      if (selector === '[data-form-status]') return status;
      if (selector === '[type="submit"]') return { textContent: 'Submit' };
      return null;
    },
    addEventListener() {},
    removeAttribute() {},
  };
  const context = {
    URLSearchParams,
    window: { location: { search } },
    sessionStorage: { getItem() { return null; }, removeItem() {}, setItem() {} },
    document: {
      documentElement: { lang },
      addEventListener(name, callback) { if (name === 'DOMContentLoaded') onReady = callback; },
      querySelectorAll() { return [form]; },
    },
  };
  vm.createContext(context);
  vm.runInContext(formScript, context);
  assert.equal(typeof onReady, 'function');
  onReady();
  return status;
}

for (const [lang, checks] of Object.entries(expected)) {
  const completed = renderQuery(lang, '?deleted=1');
  assert.equal(completed.attributes['data-state'], 'success', `${lang}: deleted=1 state`);
  assert.match(completed.textContent, checks.completed, `${lang}: deleted=1 copy`);

  const notFound = renderQuery(lang, '?deletion=not_found');
  assert.equal(notFound.attributes['data-state'], 'error', `${lang}: not_found state`);
  assert.match(notFound.textContent, checks.notFound, `${lang}: not_found copy`);

  const receipt = renderQuery(lang, '?submitted=1&request=req-1');
  assert.equal(receipt.attributes['data-state'], 'info', `${lang}: submitted receipt state`);
  assert.match(receipt.textContent, checks.receipt, `${lang}: submitted receipt copy`);

  const pagePath = path.join(root, lang, 'account-deletion.html');
  const page = fs.readFileSync(pagePath, 'utf8');
  for (const pattern of checks.page) assert.match(page, pattern, `${lang}: anonymous contract copy`);
  assert.match(page, /href="support\.html"/, `${lang}: support link`);
  assert.ok(fs.existsSync(path.join(path.dirname(pagePath), 'support.html')), `${lang}: support target`);
  assert.doesNotMatch(page, /name="(?:anonymousUserId|recoverySecret)"/, `${lang}: static form must not collect anonymous secrets`);
}

assert.doesNotMatch(formScript, /deletionVerified/, 'obsolete conditional completion copy');
console.log('account-deletion contract validation: PASS');
