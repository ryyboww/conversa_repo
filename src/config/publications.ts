export type Publication = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  href: string;
  authors: string[];
  publisher: string;
  readMinutes: number;
  featured?: boolean;
  external?: boolean;
};

export const publications: Publication[] = [
  {
    slug: 'an-objective-strategy',
    title: 'An Objective Strategy: Weighing Trial Objections in Appellate Review of Plain Error Cases',
    description: 'A public-facing analysis of trial objections, strategic silence, plain-error review, and the assumptions appellate courts make when counsel does not object.',
    date: '2024-12-02',
    category: 'Law, Justice & Public Authority',
    href: 'https://policylab.rutgers.edu/publication/an-objective-strategy-weighing-trial-objections-in-appellate-review-of-plain-error-cases/',
    authors: ['Ryan Brown', 'Elizabeth Griffiths', 'Heather L. Scheuerman'],
    publisher: 'New Jersey State Policy Lab',
    readMinutes: 10,
    featured: true,
    external: true
  },
  {
    slug: 'prosecutorial-errors-harmless-vs-not',
    title: 'Prosecutorial Errors: Determining “Harmless” vs. “Not” at the Appellate Level',
    description: 'An examination of harmless-error and plain-error standards used by appellate courts when reviewing prosecutorial misconduct.',
    date: '2024-10-10',
    category: 'Law, Justice & Public Authority',
    href: 'https://policylab.rutgers.edu/publication/prosecutorial-errors-determining-harmless-vs-not-at-the-appellate-level/',
    authors: ['Heather L. Scheuerman', 'Ryan Brown', 'Elizabeth Griffiths'],
    publisher: 'New Jersey State Policy Lab',
    readMinutes: 8,
    external: true
  },
  {
    slug: 'appellate-court-policing-prosecutorial-misconduct',
    title: 'Appellate Court Policing of Prosecutorial Misconduct',
    description: 'A public-facing introduction to appellate oversight of prosecutorial misconduct and the institutional standards used to evaluate harm.',
    date: '2024-08-29',
    category: 'Law, Justice & Public Authority',
    href: 'https://policylab.rutgers.edu/publication/appellate-court-policing-of-prosecutorial-misconduct/',
    authors: ['Elizabeth Griffiths', 'Heather L. Scheuerman', 'Ryan Brown'],
    publisher: 'New Jersey State Policy Lab',
    readMinutes: 7,
    external: true
  }
];

export const publicationRecordHref = (publication: Publication) => `/publications/${publication.slug}/`;
export const featuredPublication = publications.find((item) => item.featured) ?? publications[0];
