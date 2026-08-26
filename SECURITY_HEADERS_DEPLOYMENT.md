# Production security-header gate

The repository-level `_headers` file is the source of truth for the public
site's response headers. The current GitHub Pages origin does not apply that
file. On 2026-08-26, `npm run check:live-headers` failed because
`https://astroguides.app/` did not return `Content-Security-Policy`.

This is a release gate, not an informational TODO. Do not mark a public-site
deployment complete until all of the following are true:

1. Serve the repository through a host or edge proxy that applies `_headers`
   (for example Cloudflare Pages), while preserving the canonical
   `https://astroguides.app` URLs.
2. Confirm the custom-domain certificate and redirects before changing DNS.
3. Run `npm run check` against the exact deployed source.
4. Run `ASTROGUIDE_SITE_URL=https://astroguides.app npm run check:live-headers`.
5. Verify support and account-deletion form submissions after the CSP is live.

The live check covers `/`, `/en/privacy.html`, and
`/en/account-deletion.html`. It requires CSP, Permissions-Policy,
Referrer-Policy, HSTS, X-Content-Type-Options, and X-Frame-Options. A deployment
that serves only matching HTML `<meta>` elements does not pass: directives such
as `frame-ancestors` and HSTS require HTTP response headers.

DNS migration and custom-domain activation are intentionally not automated by
this repository because a partial change can interrupt the legal and deletion
pages. Capture the successful command output and the provider deployment ID in
the release evidence.
