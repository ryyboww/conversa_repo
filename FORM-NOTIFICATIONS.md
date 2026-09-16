# Netlify Forms and Notification Verification

Convera uses separate form pathways for general contact, professional intake, and optional newsletter signup when enabled.

## Production verification

After the first successful Netlify deployment:

1. Open the Netlify Forms area and confirm the expected forms were detected.
2. Submit one test through the public Contact page.
3. Submit one test through Work With Convera.
4. Confirm both redirect to the correct success page.
5. Confirm the submissions appear in Netlify.
6. Configure notification delivery to the intended branded mailbox.
7. Submit fresh tests and confirm notification emails arrive.
8. Check spam/junk placement and sender labeling.
9. Delete or clearly label test submissions according to your operating practice.
10. Only then mark both form operational flags as true.

```text
OPS_NETLIFY_FORMS_VERIFIED=true
OPS_FORM_NOTIFICATIONS_VERIFIED=true
```

Do not place mailbox passwords or SMTP credentials in the Astro repository.
