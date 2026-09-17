(() => {
  const root = document.documentElement;
  const storageKey = 'convera-theme';
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch {}

  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    const updateLabel = () => {
      const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      toggle.textContent = current === 'dark' ? 'Light' : 'Dark';
      toggle.setAttribute('aria-label', `Use ${current === 'dark' ? 'light' : 'dark'} theme`);
    };
    updateLabel();
    toggle.addEventListener('click', () => {
      const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(storageKey, next); } catch {}
      updateLabel();
    });
  }

  const ownHost = location.hostname.replace(/^www\./, '');
  const attributionKey = 'convera-session-attribution';
  let attribution = {};
  try { attribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}'); } catch {}
  const params = new URLSearchParams(location.search);
  if (!attribution.entry_path) attribution.entry_path = location.pathname;
  if (!attribution.referrer && document.referrer) {
    try {
      const ref = new URL(document.referrer);
      if (ref.hostname.replace(/^www\./, '') !== ownHost) attribution.referrer = ref.href;
    } catch {}
  }
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    const value = params.get(key);
    if (value) attribution[key] = value.slice(0, 300);
  }
  try { sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch {}

  const forms = document.querySelectorAll('form[data-convera-attribution], form[name="website-contact"], form[name="follow-the-work"]');
  for (const form of forms) {
    for (const [key, value] of Object.entries(attribution)) {
      if (!value) continue;
      const name = `source_${key}`;
      let input = form.querySelector(`input[name="${CSS.escape(name)}"]`);
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.appendChild(input);
      }
      input.value = value;
    }
    let page = form.querySelector('input[name="source_submission_path"]');
    if (!page) {
      page = document.createElement('input');
      page.type = 'hidden';
      page.name = 'source_submission_path';
      form.appendChild(page);
    }
    page.value = location.pathname;
  }
})();
