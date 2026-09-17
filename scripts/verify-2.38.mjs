import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root,p),'utf8');
const exists = (p) => fs.existsSync(path.join(root,p));
const checks = [];
const add = (name, ok) => checks.push([name, Boolean(ok)]);
const pkg = JSON.parse(read('package.json'));
const version = JSON.parse(read('VERSION.json'));
const home = read('src/pages/index.astro');
const homeCss = read('src/styles/home.css');
const about = read('src/pages/about.astro');
const profile = read('src/pages/profile.astro');
const community = read('src/pages/community.astro');
const work = read('src/pages/work-with-convera.astro');
const publications = read('src/pages/publications.astro');
const pubConfig = read('src/config/publications.ts');
const blogIndex = read('src/pages/blog.astro');
const blogRecord = read('src/pages/blog/[slug].astro');
const rss = read('src/pages/rss.xml.ts');
const engagement = read('src/config/engagement.ts');
const inquiries = read('src/config/inquiries.ts');
const intake = read('src/pages/intake.astro');

add('package version is 2.39.0', pkg.version === '2.39.0');
add('VERSION metadata is 2.39.0', version.version === '2.39.0');
add('VERSION baseline is 2.37.0', String(version.baseline).startsWith('2.37.0'));

add('home includes second featured essay section', home.includes('home-connection-band') && home.includes('Featured Essay'));
add('home second feature uses people-connection image', home.includes('/images/editorial/people-connection.jpg'));
add('home connection band is equal split at desktop', /\.home-connection-card\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*1fr\)/s.test(homeCss));
add('home inquiry fields remain equal thirds', /\.home-inquiry-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/s.test(homeCss));

add('About is company-first', about.includes('What Convera Is') && about.includes('About Convera'));
add('About includes fellowship/public-engagement imagery', about.includes('/images/editorial/about-fellowship-cohort.jpg') && about.includes('/images/editorial/about-public-conversation.jpg'));
add('About founder bridge appears after company sections', about.indexOf('What Convera Is') < about.indexOf('Founder'));
add('About links to founder Profile', about.includes('href="/profile/"'));

add('Profile route exists', exists('src/pages/profile.astro'));
add('Profile covers experience and vision', profile.includes('Experience') && profile.includes('Vision') && profile.includes('Why Convera'));
add('Profile links downloadable CV', profile.includes('/downloads/ryan-brown-cv.pdf') && exists('public/downloads/ryan-brown-cv.pdf'));
add('Profile includes selected photography', profile.includes('/images/editorial/profile-service.jpg') && profile.includes('/images/editorial/profile-public-service.jpg'));

add('Community fellowship gallery removed', !community.includes('community-fellows.jpg') && !community.includes('community-statehouse.jpg'));
add('Community page centers participation pathways', community.includes('communityPathways'));

add('Publications use compact three-column cards', /publication-card-grid[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/s.test(publications));
add('Publication card image height is compact', publications.includes('height:138px'));
add('Formal archive includes four publications', (pubConfig.match(/slug:\s*'/g) || []).length === 4);
add('Each publication has normalized image', (pubConfig.match(/image:\s*'\/images\/publications\//g) || []).length === 4);
add('New types-review publication image exists', exists('public/images/publications/publication-types-review.jpg'));

const blogFiles = fs.readdirSync(path.join(root,'src/content/blog')).filter((f)=>/\.mdx?$/.test(f));
add('Blog archive route exists', exists('src/pages/blog.astro'));
add('Blog record route exists', exists('src/pages/blog/[slug].astro'));
add('Exactly five public-ready essays migrated', blogFiles.length === 5);
add('Talk Is Cheap migrated', blogFiles.includes('talk-is-cheap-and-getting-cheaper.md'));
add('Stubborn Child migrated', blogFiles.includes('the-stubborn-child.md'));
add('Blog index filters published public entries', blogIndex.includes("data.status === 'published'") && blogIndex.includes("data.access === 'public'"));
add('Blog records are statically generated', blogRecord.includes('getStaticPaths'));
add('RSS includes publications and blog essays', rss.includes("getCollection('blog'") && rss.includes('publications'));

add('Work With Convera includes Q&A section', work.includes('Questions & Answers') && work.includes('<details class="qa-item">'));
add('Work With Convera uses question/context framing', work.includes('Begin with context. Define the next step.'));
add('Engagement config avoids Start with the challenge', !engagement.includes('Start with the challenge'));
add('Inquiry config avoids discuss the following challenge', !inquiries.includes('following challenge'));
add('Intake label uses understanding framing', intake.includes('What would you like Convera to understand?'));

for (const file of [
  'public/images/editorial/people-connection.jpg',
  'public/images/editorial/about-fellowship-cohort.jpg',
  'public/images/editorial/about-public-conversation.jpg',
  'public/images/ryan-brown-profile.jpg',
  'public/images/editorial/profile-service.jpg',
  'public/images/editorial/profile-public-service.jpg',
  'public/images/publications/publication-types-review.jpg'
]) add(`asset exists: ${file}`, exists(file));

let failed=0;
for (const [name,ok] of checks) { console.log(`${ok?'PASS':'FAIL'}  ${name}`); if(!ok) failed++; }
console.log(`\n${checks.length-failed}/${checks.length} 2.38 checks passed.`);
if (failed) process.exit(1);
