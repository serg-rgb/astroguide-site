# AstroGuide Landing — Handoff

Static high-fi mockup of the AstroGuide landing, built per `LANDING_DESIGN_BRIEF.md`. Ready to be wrapped by Next.js + Tailwind + next-intl during the engineering pass.

---

## Structure

```
landing/
  index.html              Root x-default page with language links; no client-side redirect.
  en/                     English (primary)
    index.html            Main page — hero · features (6) · product tour (8) · creed · disclaimer · how-it-works · FAQ · footer
    privacy.html
    terms.html
    account-deletion.html
    support.html
    ai-disclosure.html
    disclaimer.html
  es/                     Spanish — all seven pages fully translated
    index.html · privacy.html · terms.html · account-deletion.html · support.html · ai-disclosure.html · disclaimer.html
  ru/                     Russian — all seven pages fully translated
    index.html · privacy.html · terms.html · account-deletion.html · support.html · ai-disclosure.html · disclaimer.html
  tokens.css              Design tokens (1:1 with AstroPalette.kt)
  landing.css             Shared component styles
  planets/                NASA / Solar System Scope planet textures (CC-BY-4.0 / public domain) — see Attribution
  og-image.png            1200×630 open-graph image used by social previews
  favicon.ico/.svg/.png   Production favicon set
  apple-touch-icon.png    iOS home-screen icon
  AstroGuide*.html        Interactive prototype shells used by landing iframes; noindex
  app.jsx                 Shared prototype routing logic
  components*.jsx         Locale-specific prototype UI strings + widgets
  screens-*.jsx           Locale-specific prototype screens
  styles.css              Shared prototype styles
  tweaks-panel.jsx        Prototype tweak panel
  robots.txt              Production crawl policy
  sitemap.xml             Canonical sitemap with hreflang alternates
  README.md               This file
```

Original prototype source also exists in `Astrology (3)/`. The production `landing/` folder includes a copy so iframe previews continue to work when the static site is deployed by itself.

```
Astrology (3)/
  AstroGuide-en.html      English prototype shell (loads components-en + screens-*-en)
  AstroGuide-es.html      Spanish prototype shell (loads components-es + screens-*-es)
  AstroGuide.html         Russian prototype shell (loads components + screens-*)
  app.jsx                 Shared routing logic for all three shells (URL-driven)
  components-{en,es}.jsx  Locale-specific UI strings + shared widgets
  components.jsx          Russian — original prototype
  screens-{a,b,c}-{en,es}.jsx   Locale screens
  screens-{a,b,c}.jsx     Russian screens
  styles.css              Shared prototype styles
```

---

## Locales — all three are fully wired

| Locale | Landing pages | Prototype shell | iframe params |
|--------|---------------|-----------------|---------------|
| **en** | 7/7 translated | `AstroGuide-en.html` (Sam) | `name=Sam` set in URL (overrides RU default of "Сергей") |
| **es** | 7/7 translated | `AstroGuide-es.html` (Sam) | no name override needed — `DEFAULTS.userName="Сергей"` only matters for RU shell |
| **ru** | 7/7 translated | `AstroGuide.html` (Сергей) | no name override — Russian default is correct |

The header language switcher (top-right of every page) and the footer switcher both link between `/en/<page>.html`, `/es/<page>.html`, and `/ru/<page>.html` — the active locale is shown as a filled gold chip and is non-interactive (`aria-current="page"`). Move between any pair of locales on any page in one click.

The root `landing/index.html` is a lightweight x-default page that links to `/en/`, `/es/`, and `/ru/`. It intentionally does not redirect, so Google can keep a stable canonical root URL.

---

## Production deployment snapshot

Current production domain: <https://astroguides.app/>.

| Target | Repository | Status |
|--------|------------|--------|
| Production | `serg-rgb/astroguide-site` | GitHub Pages, custom domain `astroguides.app`, HTTPS enforced |
| Preview | `serg-rgb/astroguide-site-preview` | GitHub Pages project URL, no custom domain |
| Source | `serg-rgb/astroguide-android` | `landing/` source plus prototype sources |

The production GitHub Pages certificate is approved for both `astroguides.app` and `www.astroguides.app` via Let's Encrypt, with `www` redirecting to the apex domain. On May 16, 2026 the certificate provisioning had to be restarted by removing and re-adding the Pages custom domain in GitHub; GitHub then created the CNAME reset commits in the production Pages repository and HTTPS enforcement was enabled.

Production SEO metadata is intentionally absolute:

- canonical URLs use `https://astroguides.app/...`
- Open Graph and Twitter images use `https://astroguides.app/og-image.png`
- hreflang alternates cover `en`, `es`, `ru`, plus `x-default`
- `robots.txt` points to `https://astroguides.app/sitemap.xml`
- `sitemap.xml` includes every indexable public page: `/`, `/en/`, `/es/`, `/ru/`, plus privacy, terms, account deletion, support, AI disclosure, and disclaimer in all three locales
- legal/support/disclosure pages stay public for store compliance and are indexable
- interactive prototype shells are `noindex, nofollow` to prevent query-param demo screens from entering the index

---

## Planet textures (Hero background)

- `2k_saturn.jpg` — Saturn equirectangular map (Solar System Scope, CC-BY-4.0)
- `2k_saturn_ring_alpha.png` — Saturn rings with alpha channel (Solar System Scope, CC-BY-4.0)
- `2k_uranus.jpg` — Uranus equirectangular map (Solar System Scope, CC-BY-4.0)
- `2k_moon.jpg` — Lunar surface, Clementine data (NASA / public domain via Wikimedia Commons)
- `2k_jupiter.jpg` — Jupiter cylindrical map (Solar System Scope, CC-BY-4.0)

**Attribution required**: Solar System Scope textures are CC-BY-4.0 from <https://www.solarsystemscope.com/textures/>. Add an attribution line to the colophon or `/about` in the final site.

Production pages use the 512px WebP variants in `planets/optimized/`; the original
files stay in the repository for attribution/source fidelity. All planet motion is
disabled to avoid continuous GPU work on mobile devices.

---

## Prototype URL parameters

`app.jsx` accepts these URL params, used by landing iframes to deep-link into each screen:

| Param | Effect |
|-------|--------|
| `?screen=` | Initial tab: `horoscope` (default), `natal`, `days`, `oracle`, `profile`. |
| `?sub=` | Sub-screen: `forecast`, `journal`, `journalHistory`, `synastry`, `cardOfDay`, `spread`, `natalCreate`. |
| `?period=` | For forecast sub: `day`, `week`, `month`. |
| `?sign=` | Sign override for the forecast. |
| `?welcome=1` | Force the welcome ritual screen. |
| `?promo=1` | Force the natal-promo screen. |
| `?picker=own` / `?picker=other` | Open the sign-picker sheet. |
| `?hasNatal=0` / `?hasNatal=1` | Override the natal-state for a clean tour shot. |
| `?name=` | Override the user name (English landing uses `name=Sam`). |
| `?embed=1` | Strip the prototype's outer phone-frame so it sits cleanly inside the landing's frame. |

---

## Engineering handoff notes

- Landing CSS is in two flat files (`tokens.css` + `landing.css`), and shared
  behavior lives in `landing.js`.
- The first paint uses 42 localized WebP posters. Interactive prototypes are
  created only after a visitor presses a preview button; only one sandboxed
  iframe remains loaded at a time.
- Prototype production shells load the local minified React runtime in `vendor/`
  and the locale bundles `astroguide-*.min.js`. Source JSX remains alongside the
  bundles for maintenance. Rebuild all three deterministically with
  `npm ci && npm run build:prototypes`; the ordered source manifest lives in
  `scripts/build-prototypes.mjs`.
- `<details>`-based FAQ works without JS.
- Support and deletion forms POST to `https://api.astroguides.app/api/v1/...`.
  The backend validates, rate-limits and queues requests in persistent Redis
  before attempting optional SMTP notification.
- `_headers` contains the production CSP, HSTS, privacy and asset-cache
  policy for hosts that support this file (for example Cloudflare Pages). GitHub
  Pages ignores `_headers`, so configure the same values at a CDN/reverse proxy
  before public launch; `frame-ancestors 'self'` is intentional because the
  prototype shells are embedded by the same origin.
- The `og-image.png` is referenced from `<meta property="og:image">` because Twitter/X, Facebook, and LinkedIn do not reliably parse SVG previews.
- Do not reintroduce a client-side locale redirect at `/`. If the Next.js port adds language detection, use a server-side redirect only after deciding whether `/` should remain the public x-default canonical.

---

## Remaining TODOs

1. **Legal review** of the localized Privacy/Terms — the translations are accurate to the EN voice but a lawyer should sign off on the RU and ES versions before a launch that takes payments.
2. **Press section** — slot reserved above the footer, not built yet.
3. **Deployment configuration**: set the API secrets/origins documented in the
   backend `.env.example`, publish both repositories, and apply `_headers` at the
   edge in front of GitHub Pages.

That's it.
