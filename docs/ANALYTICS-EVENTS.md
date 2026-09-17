# Public Journey Event Dictionary — 2.30

The purpose of measurement is to understand which public work and pathways lead to meaningful engagement. It is not to maximize surveillance or page-view volume.

## Event bridge

`/assets/convera-growth.js` emits a browser `CustomEvent` named `convera:event` with a small payload. If the site already has a `window.dataLayer`, the same event is pushed there as `convera_public_journey`.

The script itself makes no analytics-network request.

## Recommended events

| Event | Meaning | Decision it can support |
| --- | --- | --- |
| `publication_follow` | Reader chose Follow the Work from a publication | Which writing builds ongoing audience |
| `publication_speaking` | Reader moved from publication to Speaking | Which writing generates public-conversation interest |
| `publication_contact` | Reader moved from publication to Contact | Which writing generates professional inquiries |
| `nav_speaking` | Speaking selected from navigation | General demand for public-engagement information |
| `nav_follow` | Follow selected from navigation | General audience-retention interest |
| `nav_press_kit` | Press Kit selected from navigation | Media/organizer self-service usage |
| `footer_speaking` | Speaking selected from footer | Secondary discovery behavior |
| `footer_follow` | Follow selected from footer | Secondary audience-retention behavior |
| `footer_press_kit` | Press Kit selected from footer | Secondary media-resource use |
| `contact_submit` | Visitor attempted to submit Contact | Top-of-funnel professional/general correspondence intent |
| `follow_submit` | Visitor attempted to submit Follow the Work | Audience-retention intent |

A browser submit event is an **attempt**, not proof Netlify accepted the form. Operational reporting should continue to treat the Netlify submission record as the authoritative form receipt.

## Attribution fields

Current session attribution can include:

- `source_referrer`
- `source_entry_path`
- `source_utm_source`
- `source_utm_medium`
- `source_utm_campaign`
- `source_utm_content`
- `source_utm_term`
- `source_submission_path`

Do not use these values to infer protected or sensitive characteristics.

## Provider boundary

When an analytics provider is eventually selected, configure only the events and retention actually needed. Do not add fingerprinting, ad-retargeting, cross-site identity resolution, or session-replay tools by default.
