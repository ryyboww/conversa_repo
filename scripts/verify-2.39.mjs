import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(root, rel));
const checks = [];
const add = (name, ok) => checks.push({ name, ok });
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const globalCss = read('src/styles/global.css');
const hero = read('src/components/PageHero.astro');
const publications = read('src/pages/publications.astro');
const blog = read('src/pages/blog.astro');
const blogRecord = read('src/pages/blog/[slug].astro');
const motion = read('public/assets/convera-motion.js');
const base = read('src/layouts/BaseLayout.astro');

add('package version is 2.39.0', pkg.version === '2.39.0');
add('VERSION metadata is 2.39.0', version.version === '2.39.0');
add('shared card radius softened', globalCss.includes('--radius: 10px;'));
add('dense PageHero mode exists', hero.includes("dense?: boolean") && hero.includes("page-hero--dense"));
add('dense PageHero CSS exists', globalCss.includes('.page-hero--dense'));
add('publication archive uses dense hero', publications.includes(' dense />'));
add('publication archive uses two-column card grid', publications.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
add('publication cards use horizontal image/body layout', publications.includes('grid-template-columns:168px minmax(0,1fr)'));
add('publication cards keep compact body copy', publications.includes('-webkit-line-clamp:2'));
add('blog archive uses dense hero', blog.includes(' dense />'));
add('blog archive includes editorial images', blog.includes('blog-card__image') && blog.includes('post.data.image'));
add('blog article supports image aside', blogRecord.includes('essay-hero-image') && blogRecord.includes('slot="aside"'));
add('content schema supports editorial image metadata', read('src/content.config.ts').includes('imageAlt: z.string().optional()'));
add('Talk Is Cheap remains public', read('src/content/blog/talk-is-cheap-and-getting-cheaper.md').includes('status: published') && read('src/content/blog/talk-is-cheap-and-getting-cheaper.md').includes('access: public'));
add('Strong Country remains public', read('src/content/blog/a-strong-country-is-rooted-in-a-strong-population.md').includes('status: published') && read('src/content/blog/a-strong-country-is-rooted-in-a-strong-population.md').includes('access: public'));
for (const f of ['fight-against-the-machines.md','objective-magnetism.md','the-stubborn-child.md']) {
  const t = read(`src/content/blog/${f}`);
  add(`${f} preserved as non-public draft`, t.includes('status: draft') && t.includes('draft: true') && t.includes('access: private'));
}
for (const f of ['talk-is-cheap.jpg','strong-country.jpg','fight-machines.jpg','objective-magnetism.jpg','stubborn-child.jpg']) add(`blog image exists: ${f}`, exists(`public/images/blog/${f}`));
add('motion script reveals archive cards individually', motion.includes("'.publication-card'") && motion.includes("'.blog-card'"));
add('motion script avoids nested whole-archive reveal', motion.includes(':not(.publication-archive):not(.blog-index)'));
add('obsolete motion-ready class removed', !base.includes('motion-ready'));
add('About remains company-first', read('src/pages/about.astro').includes('What Convera Is') && read('src/pages/about.astro').includes('Meet the person behind Convera'));

const failures = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}`);
console.log(`
${checks.length - failures.length}/${checks.length} 2.39 checks passed.`);
if (failures.length) process.exit(1);
