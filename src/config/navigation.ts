import { features } from './features';

export const navigation = [
  { label: 'Home', href: '/', enabled: true },
  { label: 'Mission', href: '/mission/', enabled: features.mission },
  { label: 'Services', href: '/services/', enabled: features.services },
  { label: 'Publications', href: '/publications/', enabled: features.publications },
  { label: 'Community', href: '/community/', enabled: features.community },
  { label: 'About', href: '/about/', enabled: true },
  { label: 'Contact', href: '/contact/', enabled: true }
].filter((item) => item.enabled);

export const footerNavigation = [
  ...navigation,
  { label: 'Work With Convera', href: '/work-with-convera/', enabled: features.services },
  { label: 'Support', href: '/support/', enabled: features.support }
].filter((item) => item.enabled);
