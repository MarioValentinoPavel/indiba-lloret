// Idiomas: CA (el texto del HTML, el idioma en el que escribe Maria José) / ES / EN / FR (window.I18N_ES, I18N_EN, I18N_FR en js/lang.js).
// data-i18n="clave" cambia el contenido; data-i18n-attr="aria-label:clave;alt:clave2" cambia atributos.
// Guarda la elección (?lang=es, localStorage) y avisa con el evento "langchange". I18N.t(ca, es, en, fr) para textos de JS.
(() => {
  const site = document.currentScript?.dataset.site || 'web';
  const KEY = site + '-lang';
  const LANGS = ['ca', 'es', 'en', 'fr'];
  const D = { es: window.I18N_ES || {}, en: window.I18N_EN || {}, fr: window.I18N_FR || {} };
  const orig = new Map();
  let origTitle = null;
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* sin almacenamiento */ } };
  const load = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
  const pick = (lang, k, fallback) => (D[lang] && D[lang][k] != null ? D[lang][k] : fallback);

  function apply(lang) {
    if (!LANGS.includes(lang)) lang = 'ca';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!orig.has(el)) orig.set(el, el.innerHTML);
      el.innerHTML = pick(lang, el.dataset.i18n, orig.get(el));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, k] = pair.split(':').map((s) => s.trim());
        const ok = 'i18nOrig' + attr.replace(/(^|-)./g, (m) => m.slice(-1).toUpperCase());
        if (el.dataset[ok] == null) el.dataset[ok] = el.getAttribute(attr) || '';
        el.setAttribute(attr, pick(lang, k, el.dataset[ok]));
      });
    });
    document.documentElement.lang = lang;
    if (origTitle == null) origTitle = document.title;
    document.title = pick(lang, '_title', origTitle);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) { if (!desc.dataset.orig) desc.dataset.orig = desc.content; desc.content = pick(lang, '_desc', desc.dataset.orig); }
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    store(KEY, lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  const nav = (navigator.language || 'ca').slice(0, 2).toLowerCase();
  const fromNav = LANGS.includes(nav) ? nav : (['gl', 'eu'].includes(nav) ? 'es' : 'en');
  const start = new URLSearchParams(location.search).get('lang') || load(KEY) || fromNav;
  const cur = () => document.documentElement.lang;
  window.I18N = { set: apply, get: cur, t: (ca, es, en, fr) => ({ es, en, fr }[cur()] ?? ca) };
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-lang]'); if (b) { e.preventDefault(); apply(b.dataset.lang); } });
  const go = () => apply(start);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
