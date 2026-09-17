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
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

export const publications: Publication[] = [
  {
    slug: 'types-of-appellate-review-and-harmlessness',
    title: 'Types of Appellate Review and the “Harmlessness” of Prosecutorial Misconduct in New Jersey',
    description: 'An examination of preserved and unpreserved prosecutorial error, harmlessness review, and the standards appellate courts use when evaluating prosecutorial misconduct.',
    date: '2025-03-20',
    category: 'Law, Justice & Public Authority',
    href: 'https://policylab.rutgers.edu/publication/types-of-appellate-review-and-the-harmlessness-of-prosecutorial-misconduct-in-new-jersey/',
    authors: ['Elizabeth Griffiths', 'Heather L. Scheuerman', 'Ryan Brown'],
    publisher: 'New Jersey State Policy Lab',
    readMinutes: 12,
    external: true,
    image: '/images/publications/publication-types-review.jpg',
    imageAlt: 'Editorial image of courthouse columns representing appellate review',
    imagePosition: 'center'
  },
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
    external: true,
    image: '/images/publications/publication-objective-strategy.jpg',
    imageAlt: 'Editorial image of light and shadow across an institutional interior',
    imagePosition: 'center'
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
    external: true,
    image: '/images/publications/publication-prosecutorial-errors.jpg',
    imageAlt: 'Editorial image of courthouse columns representing judicial review',
    imagePosition: 'center'
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
    external: true,
    image: '/images/publications/publication-appellate-court.jpg',
    imageAlt: 'Editorial image of a legal reading room representing appellate review',
    imagePosition: 'center'
  }
];

export const publicationRecordHref = (publication: Publication) => `/publications/${publication.slug}/`;
export const featuredPublication = publications.find((item) => item.featured) ?? publications[0];
