import process from 'node:process';

const base = (process.env.ASTROGUIDE_SITE_URL || 'https://astroguides.app').replace(/\/$/, '');
const required = new Map([
  ['content-security-policy', ['default-src', 'frame-ancestors', 'form-action']],
  ['permissions-policy', ['camera=()', 'microphone=()', 'geolocation=()']],
  ['referrer-policy', ['strict-origin-when-cross-origin']],
  ['strict-transport-security', ['max-age=']],
  ['x-content-type-options', ['nosniff']],
  ['x-frame-options', ['SAMEORIGIN']],
]);

for (const pathname of ['/', '/en/privacy.html', '/en/account-deletion.html']) {
  const response = await fetch(`${base}${pathname}`, { redirect: 'error' });
  if (!response.ok) throw new Error(`${pathname}: HTTP ${response.status}`);
  for (const [header, fragments] of required) {
    const value = response.headers.get(header);
    if (!value) throw new Error(`${pathname}: missing live ${header}`);
    for (const fragment of fragments) {
      if (!value.toLowerCase().includes(fragment.toLowerCase())) {
        throw new Error(`${pathname}: ${header} is missing ${fragment}`);
      }
    }
  }
}

console.log(`live security headers: PASS (${base})`);
