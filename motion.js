
(() => {
  'use strict';
  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const $ = s => document.querySelector(s);
  let observer = null, frame = 0;
  let hero = null, feature = null;
  const progress = () => $('#scroll-progress-fill');

  function onScroll() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const y = Math.max(0, window.scrollY || 0);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const bar = progress();
      if (bar) bar.style.transform = `scaleX(${Math.min(1, y / max)})`;
      $('#site-header')?.classList.toggle('is-scrolled', y > 24);
      const top = $('#scroll-to-top');
      if (top) top.classList.toggle('is-visible', y > 500);
      if (!reduceMotion() && window.innerWidth > 720) {
        if (hero?.isConnected) {
          const r = hero.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight) {
            hero.style.setProperty('--hero-shift', `${Math.max(-16, Math.min(29, y * .11))}px`);
          }
        }
        if (feature?.isConnected) {
          const r = feature.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            const c = (window.innerHeight * .5) - (r.top + r.height * .5);
            feature.style.setProperty('--feature-shift', `${Math.round(Math.max(-23, Math.min(23, c * .06)))}px`);
          }
        }
      }
    });
  }

  function makeTopButton() {
    if ($('#scroll-to-top')) return;
    const b = document.createElement('button');
    b.id = 'scroll-to-top'; b.className = 'scroll-to-top'; b.type = 'button';
    b.innerHTML = '<span aria-hidden="true">↑</span>';
    b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'instant' : 'smooth' }));
    document.body.appendChild(b);
  }
  function attachEffects(root) {
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    root.querySelectorAll('.destination-card,.stay-card,.season-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
        card.style.setProperty('--spot-y', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
      }, { passive: true });
    });
  }
  function mount(root) {
    if (observer) { observer.disconnect(); observer = null; }
    document.body.classList.remove('motion-ready');
    makeTopButton();
    const top = $('#scroll-to-top');
    if (top) top.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Back to top' : 'Vrati se na vrh');
    hero = root.querySelector('.hero-photo');
    feature = root.querySelector('.feature-photo');
    attachEffects(root);

    if (!reduceMotion() && 'IntersectionObserver' in window) {
      const selectors = [
        '.hero-tag', '.hero h1', '.hero-lead', '.hero-buttons', '.hero-note',
        '.trust-pill', '.section-heading', '.season-card', '.destination-card',
        '.feature-photo', '.feature-copy', '.benefit', '.how-step', '.how-card',
        '.cta-panel', '.page-header', '.stay-card', '.event-card', '.events-headline',
        '.guide-card', '.guide-tile', '.planner-controls', '.weather-box',
        '.advisor', '.day-card', '.plan-summary', '.map-layout'
      ].join(',');
      const nodes = Array.from(root.querySelectorAll(selectors));
      nodes.forEach((el, i) => {
        // Repeated siblings sweep in sequentially, rather than all at once.
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter(x => x.tagName === el.tagName && (el.classList.length === 0 || x.classList.contains(el.classList[0]))) : [];
        const step = Math.max(0, siblings.indexOf(el));
        el.style.setProperty('--motion-delay', `${Math.min(step, 5) * 68}ms`);
        el.classList.add('motion-reveal');
      });
      document.body.classList.add('motion-ready');
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('motion-visible'); observer?.unobserve(entry.target); }
        });
      }, { threshold: .07, rootMargin: '0px 0px 35px 0px' });
      nodes.forEach(el => observer.observe(el));
    }
    onScroll();
  }

  document.addEventListener('click', e => {
    if (reduceMotion()) return;
    const btn = e.target.closest('.btn,.header-plan,.search-submit');
    if (!btn || btn.disabled) return;
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple'; ripple.setAttribute('aria-hidden', 'true');
    ripple.style.left = `${e.clientX ? e.clientX - r.left : r.width / 2}px`;
    ripple.style.top = `${e.clientY ? e.clientY - r.top : r.height / 2}px`;
    btn.append(ripple);
    setTimeout(() => ripple.remove(), 680);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.AllSeasonMotion = { mount };
})();
