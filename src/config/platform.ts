/**
 * Preserved platform modules from the wider RyanBrownOnline development path.
 * These are intentionally separated from launch navigation so Convera can launch
 * cleanly without deleting infrastructure intended for later phases.
 */
export const platformModules = [
  {
    id: 'newsletter',
    label: 'Newsletter',
    status: 'preserved',
    purpose: 'Email updates for publications, community activity, and future events.'
  },
  {
    id: 'student-resources',
    label: 'Student Resources',
    status: 'preserved',
    purpose: 'Future course and student-facing resources.'
  },
  {
    id: 'supporter-lounge',
    label: 'Supporter Lounge',
    status: 'preserved',
    purpose: 'Future supporter-only material and updates.'
  },
  {
    id: 'podcast',
    label: 'Podcast',
    status: 'preserved',
    purpose: 'Future audio conversations and interviews.'
  },
  {
    id: 'institute',
    label: 'Institute',
    status: 'preserved',
    purpose: 'Long-term institutional expansion; not active at launch.'
  },
  {
    id: 'events',
    label: 'Events',
    status: 'preserved',
    purpose: 'Future talks, workshops, and public conversations.'
  },
  {
    id: 'speaking',
    label: 'Speaking',
    status: 'preserved',
    purpose: 'Future speaking and facilitated-discussion inquiries.'
  }
] as const;
