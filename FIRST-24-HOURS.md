# First 24 Hours After Launch

The first day should emphasize observation and correction rather than new feature development.

## Immediately after launch

- Run `npm run live:audit -- https://converastrategies.com`.
- Complete the desktop and mobile QA checklist.
- Test Contact and Work With Convera submissions.
- Test one-time and recurring contribution checkout without completing an unintended charge; use the provider's safe test/verification method where available.
- Verify social sharing preview and favicon behavior.
- Confirm branded email delivery.

## During the first day

- Watch Netlify deploy status and form submissions.
- Check for broken links, unexpected 404s, and layout issues reported by early visitors.
- Review analytics only if analytics was intentionally enabled.
- Avoid introducing nonessential features during the stabilization window.

## If a material issue appears

Use `ROLLBACK.md` rather than patching production impulsively. Preserve the failing deployment information so the cause can be diagnosed.
