import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const excludedFromSitemap = [
  '/404/',
  '/thank-you/',
  '/support/thank-you/',
  '/work-with-convera/thank-you/',
  '/intake/',
  '/intake/thank-you/',
  '/follow/thank-you/',
  '/dashboard/'
];

export default defineConfig({
  output: 'static',
  site: 'https://converastrategies.com',
  integrations: [
    sitemap({
      filter: (page) => !excludedFromSitemap.some((path) => page.endsWith(path))
    })
  ],
  trailingSlash: 'always'
});
