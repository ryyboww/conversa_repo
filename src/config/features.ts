/**
 * Central switches preserve the broader platform without forcing every module
 * into the launch navigation. Turn a feature on only when its page/content is ready.
 */
export const features = {
  mission: true,
  services: true,
  publications: true,
  community: true,
  support: true,
  newsletter: false,
  studentResources: false,
  supporterLounge: false,
  podcast: false,
  institute: false,
  events: false,
  speaking: false
} as const;
