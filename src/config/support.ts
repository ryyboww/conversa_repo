const cleanUrl = (value: string | undefined) => value?.trim() ?? '';

export const supportCheckout = {
  providerLabel:
    import.meta.env.PUBLIC_SUPPORT_PROVIDER_LABEL?.trim() || 'secure payment provider',
  oneTimeUrl: cleanUrl(import.meta.env.PUBLIC_SUPPORT_ONE_TIME_URL),
  monthlyUrl: cleanUrl(import.meta.env.PUBLIC_SUPPORT_MONTHLY_URL),
  contactEmail: 'hello@converastrategies.com'
} as const;

export const supportPaymentOptions = [
  {
    id: 'one-time',
    eyebrow: 'One-time contribution',
    title: 'Support the work now.',
    description:
      'Make a one-time contribution toward research, publications, speaking, travel, source access, platform costs, and the time required to carry thoughtful ideas into more institutional and public settings.',
    suggestedAmounts: ['$25', '$50', '$100', 'Custom'],
    url: supportCheckout.oneTimeUrl
  },
  {
    id: 'monthly',
    eyebrow: 'Monthly support',
    title: 'Help sustain the work over time.',
    description:
      'Recurring support creates dependable room for Ryan Brown to write, speak, travel, and extend the reach of Convera’s public-facing mission over time.',
    suggestedAmounts: ['$10/mo', '$25/mo', '$50/mo'],
    url: supportCheckout.monthlyUrl
  }
] as const;
