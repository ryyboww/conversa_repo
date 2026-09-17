import { starterEngagements } from './services';

export const engagementOptions = [
  { value: 'not-sure', label: 'I am not sure yet' },
  ...starterEngagements.map((item) => ({ value: item.id, label: item.title }))
] as const;

export const engagementFit = [
  'You have a project, decision, communication issue, or organizational question that needs clearer framing.',
  'You want focused outside perspective without committing to a large consulting engagement.',
  'You value practical direction grounded in people, context, institutions, and available evidence.',
  'You are open to beginning with a defined scope and adjusting only when the work justifies it.'
] as const;

export const engagementBoundaries = [
  'Legal advice or legal representation',
  'Licensed human-resources compliance services',
  'Formal employee investigations',
  'Emergency, crisis-response, or clinical services'
] as const;
