(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;

  const selectors = [
    '.page-hero__inner',
    '.page-hero__aside',
    '.home-hero__copy',
    '.home-hero__portrait',
    '.home-hero__quote',
    '.home-feature-grid > *',
    '.home-connection-card > *',
    '.home-inquiry-item',
    '.publication-card',
    '.blog-card',
    '.about-pillar-grid > article',
    '.profile-experience article',
    'main > section:not(.home-hero):not(.page-hero):not(.home-feature-band):not(.home-connection-band):not(.home-inquiry-band):not(.publication-archive):not(.blog-index):not(.about-pillars):not(.profile-experience)'
  ];

  const elements = [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))]
    .filter((element) => !element.closest('[data-no-reveal]'));

  if (!elements.length) return;

  elements.forEach((element, index) => {
    element.dataset.reveal = 'true';
    element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 45}ms`);
  });

  document.documentElement.classList.add('motion-armed');

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, {
    rootMargin: '0px 0px -7% 0px',
    threshold: 0.07
  });

  elements.forEach((element) => observer.observe(element));
})();
