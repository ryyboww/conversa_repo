# Domain, DNS, and TLS Verification

The canonical public address is:

`https://converastrategies.com`

The Netlify configuration already redirects `www.converastrategies.com` to the apex domain.

## After Netlify deployment

1. Add `converastrategies.com` as the production custom domain in Netlify.
2. Apply the DNS records Netlify provides at the current DNS host.
3. Wait for DNS propagation and Netlify certificate provisioning.
4. Confirm both the apex and `www` hostname resolve.
5. Confirm the `www` hostname redirects to the apex domain.
6. Confirm the browser reports a valid HTTPS certificate with no mixed-content warnings.
7. Confirm canonical metadata on the homepage points to `https://converastrategies.com/`.
8. Mark `OPS_CANONICAL_DOMAIN_VERIFIED=true` only after these checks succeed.
9. Mark `OPS_SSL_VERIFIED=true` only after HTTPS is verified from a normal browser session.

## Verification commands

After deployment:

```bash
npm run live:audit -- https://converastrategies.com
npm run go-live:status
```

Do not change DNS records solely to make an audit pass. Resolve any mismatch against the actual Netlify domain configuration first.
