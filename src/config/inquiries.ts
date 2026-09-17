export type InquiryOption = {
  id: string;
  label: string;
  subject: string;
  message: string;
};

export const inquiryOptions: InquiryOption[] = [
  {
    id: 'professional',
    label: 'Prospective professional engagement',
    subject: 'Prospective professional engagement',
    message: 'I would like to discuss the following project or question:\n\n'
  },
  {
    id: 'organizational-strategy',
    label: 'Organizational strategy',
    subject: 'Organizational strategy inquiry',
    message: 'I would like to discuss the following organizational question or priority:\n\n'
  },
  {
    id: 'workplace-culture',
    label: 'Workplace culture',
    subject: 'Workplace culture inquiry',
    message: 'I would like to discuss the following workplace culture concern:\n\n'
  },
  {
    id: 'social-perspectives',
    label: 'Social perspectives or contextual analysis',
    subject: 'Social perspectives inquiry',
    message: 'I would like to discuss the following question in broader context:\n\n'
  },
  {
    id: 'community-observation',
    label: 'Community observation, idea, or participation',
    subject: 'Community observation',
    message: 'I would like to share the following observation or lived experience:\n\n'
  },
  {
    id: 'recommend-literature',
    label: 'Source or record recommendation',
    subject: 'Source or record recommendation',
    message: 'I would like to recommend the following book, article, case, report, record, dataset, or other source:\n\n'
  },
  {
    id: 'suggest-topic',
    label: 'Question or topic suggestion',
    subject: 'Question or topic suggestion',
    message: 'I would like to suggest the following question or topic:\n\n'
  },
  {
    id: 'collaboration',
    label: 'Collaboration or partnership',
    subject: 'Collaboration inquiry',
    message: 'I would like to discuss the following collaboration:\n\n'
  },
  {
    id: 'speaking-media',
    label: 'Speaking or media invitation',
    subject: 'Speaking or media invitation',
    message: 'I would like to discuss the following speaking or media opportunity:\n\n'
  },
  {
    id: 'publication-media',
    label: 'Publication or media inquiry',
    subject: 'Publication or media inquiry',
    message: 'I would like to discuss the following publication or media inquiry:\n\n'
  },
  {
    id: 'support-help',
    label: 'Contribution or website support',
    subject: 'Contribution or website support',
    message: 'I need assistance with the following contribution or website matter:\n\n'
  },
  {
    id: 'other',
    label: 'Other professional inquiry',
    subject: 'Professional inquiry',
    message: ''
  }
];

export const inquiryById = Object.fromEntries(
  inquiryOptions.map((option) => [option.id, option])
) as Record<string, InquiryOption>;
