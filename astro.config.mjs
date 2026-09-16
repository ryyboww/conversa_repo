import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const excludedFromSitemap = [
  '/404/',
  '/thank-you/',
  '/support/thank-you/',
  '/work-with-convera/thank-you/'
];

export default defineConfig({
  site: 'https://converastrategies.com',
  integrations: [
    sitemap({
      filter: (page) => !excludedFromSitemap.some((path) => page.endsWith(path))
    })
  ],
  trailingSlash: 'always'
});
