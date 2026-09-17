(() => {
  const EVENT_NAME = 'convera:event';
  const MAX_TEXT = 180;
  const trim = (value) => String(value ?? '').slice(0, MAX_TEXT);

  function emit(name, detail = {}) {
    if (!name) return;
    const payload = {
      event: trim(name),
      path: location.pathname,
      source: trim(detail.source || ''),
      label: trim(detail.label || ''),
      timestamp: new Date().toISOString()
    };

    // First-party browser event for any analytics provider added later.
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));

    // If a conventional dataLayer already exists, use it. This script never
    // creates a third-party analytics connection on its own.
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'convera_public_journey',
        convera_event: payload.event,
        convera_path: payload.path,
        convera_source: payload.source,
        convera_label: payload.label
      });
    }
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-convera-event]');
    if (!target) return;
    emit(target.dataset.converaEvent, {
      source: target.dataset.converaSource,
      label: target.textContent?.trim()
    });
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const name = form.getAttribute('name') || '';
    const eventName = form.dataset.converaEvent || (
      name === 'website-contact' ? 'contact_submit' :
      name === 'follow-the-work' ? 'follow_submit' : ''
    );
    if (eventName) emit(eventName, { source: name, label: form.getAttribute('action') || '' });
  });

  const pageEvent = document.body?.dataset?.converaPageEvent;
  if (pageEvent) emit(pageEvent, { source: document.title });
})();
