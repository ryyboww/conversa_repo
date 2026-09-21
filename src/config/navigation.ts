import { features } from './features';

export const navigation = [
  { label: 'Home', href: '/', enabled: true },
  { label: 'Mission', href: '/mission/', enabled: features.mission },
  { label: 'Services', href: '/services/', enabled: features.services },
  { label: 'Approach', href: '/about/#convera-approach', enabled: true },
  { label: 'Publications', href: '/publications/', enabled: features.publications },
  { label: 'About', href: '/about/', enabled: true },
  { label: 'Contact', href: '/contact/', enabled: true },
  { label: 'Support the Work', href: '/support/', enabled: features.support }
].filter((item) => item.enabled);

export const footerNavigation = [
  ...navigation,
  { label: 'Work With Convera', href: '/work-with-convera/', enabled: features.services },
  { label: 'Support', href: '/support/', enabled: features.support }
].filter((item) => item.enabled);
