export type ServiceArea = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  highlights: string[];
  contactReason: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    id: 'social-perspectives',
    title: 'Social Perspectives',
    shortTitle: 'Social Perspectives',
    summary: 'Broader context for complex organizational and institutional questions.',
    description:
      'Convera examines the social, institutional, community, and relational conditions surrounding a challenge so decisions are not made from an unnecessarily narrow view.',
    highlights: [
      'Contextual review of organizational or institutional challenges',
      'Stakeholder, community, and social-condition framing',
      'Interpretation of recurring patterns, language, and competing perspectives'
    ],
    contactReason: 'social-perspectives'
  },
  {
    id: 'workplace-culture',
    title: 'Workplace Culture',
    shortTitle: 'Workplace Culture',
    summary: 'A closer look at communication, expectations, relationships, and trust.',
    description:
      'Convera helps organizations understand the everyday conditions shaping workplace experience, including internal communication, expectations, relationships, trust, recurring friction, and organizational language.',
    highlights: [
      'Focused workplace-culture review',
      'Communication and expectation analysis',
      'Identification of recurring culture concerns and practical opportunities'
    ],
    contactReason: 'workplace-culture'
  },
  {
    id: 'organizational-strategy',
    title: 'Organizational Strategy',
    shortTitle: 'Organizational Strategy',
    summary: 'Practical direction grounded in context, priorities, and organizational realities.',
    description:
      'Convera works with owners, professionals, and organizations to clarify challenges, identify priorities, assess options, and develop practical next steps without forcing every problem into a predetermined model.',
    highlights: [
      'Focused strategy sessions',
      'Problem framing and priority clarification',
      'Option review and practical next-step planning'
    ],
    contactReason: 'organizational-strategy'
  }
];

export const starterEngagements = [
  {
    id: 'focused-strategy-session',
    title: 'Focused Strategy Session',
    description:
      'A structured conversation to clarify a challenge, identify what matters most, and define practical next steps.'
  },
  {
    id: 'workplace-culture-review',
    title: 'Workplace Culture Review',
    description:
      'A focused examination of communication, expectations, workplace relationships, trust, and recurring culture concerns.'
  },
  {
    id: 'organizational-analysis',
    title: 'Organizational Analysis & Problem Framing',
    description:
      'For problems that are visible but difficult to define. Convera examines available information, patterns, context, and competing explanations.'
  },
  {
    id: 'communication-document-review',
    title: 'Communication & Document Review',
    description:
      'Review of policies, internal communications, procedures, reports, surveys, or organizational materials for clarity, consistency, tone, and recurring patterns.'
  }
] as const;

export const engagementProcess = [
  {
    step: '01',
    title: 'Start with the question',
    description:
      'Share the problem, question, or organizational concern as you currently understand it. You do not need a finished diagnosis before reaching out.'
  },
  {
    step: '02',
    title: 'Define a focused scope',
    description:
      'Convera clarifies the objective, available information, practical constraints, expected deliverable, and whether the engagement is a good fit.'
  },
  {
    step: '03',
    title: 'Work through the problem',
    description:
      'The engagement proceeds through focused conversation, review, analysis, and practical recommendations appropriate to the agreed scope.'
  },
  {
    step: '04',
    title: 'Leave with direction',
    description:
      'The goal is a clearer understanding of the question and useful next steps—not unnecessary complexity or an open-ended engagement.'
  }
] as const;
