// Centre Homologat INDIBA Activ Medical · comportamiento de la página (sin dependencias)
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = () => root.lang || 'ca';
  const pickL = (o) => o[lang()] ?? o.ca;
  const T = (ca, es, en, fr) => ({ es, en, fr }[lang()] ?? ca);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- entrada de la portada: cuando hay fuentes y retrato (máx. 1,5 s) ----------
  const portrait = $('.portrait img');
  const imgReady = portrait && !portrait.complete
    ? new Promise((r) => { portrait.addEventListener('load', r, { once: true }); portrait.addEventListener('error', r, { once: true }); })
    : Promise.resolve();
  Promise.race([
    Promise.all([document.fonts ? document.fonts.ready : Promise.resolve(), imgReady]),
    new Promise((r) => setTimeout(r, 1500))
  ]).then(() => setTimeout(() => root.classList.add('ready'), 30));

  // ---------- cabecera ----------
  const head = $('#head');
  const onScroll = () => { head.classList.toggle('scrolled', scrollY > 8); hl(); };
  addEventListener('scroll', onScroll, { passive: true });

  // ---------- menú del móvil ----------
  const mBtn = $('.menu-btn'), menu = $('#menu');
  const behind = [$('main'), $('.foot'), $('.topbar'), $('.phonebar')].filter(Boolean);
  function menuLabel(open) {
    $('.sr', mBtn).textContent = open ? T('Tanca el menú', 'Cerrar el menú', 'Close menu', 'Fermer le menu') : T('Obre el menú', 'Abrir el menú', 'Open menu', 'Ouvrir le menu');
  }
  function setMenu(open) {
    mBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    root.classList.toggle('menu-open', open);
    behind.forEach((el) => { el.inert = open; });
    $('use', mBtn).setAttribute('href', open ? '#i-close' : '#i-menu');
    menuLabel(open);
    if (open) { const a = $('a', menu); if (a) a.focus(); }
  }
  mBtn.addEventListener('click', () => setMenu(mBtn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); mBtn.focus(); } });
  matchMedia('(min-width: 1181px)').addEventListener('change', (e) => { if (e.matches && !menu.hidden) setMenu(false); });

  // ---------- abierto / cerrado con la hora de Lloret ----------
  function lloretNow() {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => p.find((x) => x.type === t).value;
    return { d: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')], min: +get('hour') * 60 + +get('minute') };
  }
  function status() {
    const { d, min } = lloretNow();
    const h = SITE.hours[d];
    let open = false, txt;
    if (h && min >= h[0] && min < h[1]) { open = true; txt = T('Obert ara · fins a les 19:00', 'Abierto ahora · hasta las 19:00', 'Open now · until 19:00', 'Ouvert · jusqu’à 19 h'); }
    else if (h && min < h[0]) txt = T('Tancat · obre avui a les 11:00', 'Cerrado · abre hoy a las 11:00', 'Closed · opens today at 11:00', 'Fermé · ouvre aujourd’hui à 11 h');
    else if (d >= 1 && d <= 4) txt = T('Tancat · obre demà a les 11:00', 'Cerrado · abre mañana a las 11:00', 'Closed · opens tomorrow at 11:00', 'Fermé · ouvre demain à 11 h');
    else txt = T('Tancat · obre dilluns a les 11:00', 'Cerrado · abre el lunes a las 11:00', 'Closed · opens Monday at 11:00', 'Fermé · ouvre lundi à 11 h');
    $$('.js-status').forEach((s) => { s.classList.toggle('open', open); $('.js-status-t', s).textContent = txt; });
    $$('.hours tr').forEach((tr) => tr.classList.toggle('today', +tr.dataset.d === d));
  }
  setInterval(status, 60000);

  // ---------- WhatsApp con el mensaje en el idioma de la página ----------
  const wa = (text) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;
  const waLinks = () => $$('.js-wa').forEach((a) => { a.href = wa(pickL(SITE.msg)); });

  // ---------- «El cos parla»: las palabras se encienden al bajar ----------
  const hlEl = $('.js-hl');
  let words = [];
  function split() {
    if (!hlEl) return;
    const text = hlEl.textContent;
    hlEl.innerHTML = text.split(/(\s+)/).map((w) => (/^\s+$/.test(w) || !w ? w : `<span class="w">${esc(w)}</span>`)).join('');
    words = $$('.w', hlEl);
    if (!reduce) root.classList.add('hl-ready');
    hl();
  }
  function hl() {
    if (!words.length || reduce) return;
    const r = hlEl.getBoundingClientRect(), vh = innerHeight || 800;
    const start = vh * .86, end = vh * .42;
    const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
    const n = Math.round(p * words.length);
    for (let i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
  }

  // ---------- «Què tracto»: a l'eix, el que et passa; a cada costat, amb què es treballa ----------
  const ex = $('[data-ex]');
  const opts = $$('.ex-opts [role="radio"]');
  const items = $$('.ex-list li[data-k]');
  const svg = $('.ex-lines');
  let cur = 'esquena';
  function select(c, focus) {
    if (!TREAT[c]) return;
    cur = c;
    opts.forEach((b) => { const on = b.dataset.c === c; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    const use = TREAT[c].use;
    items.forEach((li) => li.classList.toggle('on', use.includes(li.dataset.k)));
    $('.js-ex-txt').textContent = pickL(TREAT[c]);
    const name = (opts.find((b) => b.dataset.c === c)?.textContent || '').replace(/\s+/g, ' ').trim();
    $('.js-ex-wa').href = wa(pickL(SITE.msgC).replace('{c}', name));
    lines(true);
  }
  opts.forEach((b) => b.addEventListener('click', () => select(b.dataset.c)));
  $('.ex-opts')?.addEventListener('keydown', (e) => {
    const i = opts.findIndex((b) => b.dataset.c === cur);
    let j = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % opts.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + opts.length) % opts.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = opts.length - 1;
    if (j != null) { e.preventDefault(); select(opts[j].dataset.c, true); }
  });
  // hilos desde los puntos de la opción elegida hasta lo que se usa a cada lado
  function lines(animate) {
    if (!svg || !ex) return;
    if (getComputedStyle(svg).display === 'none') { svg.innerHTML = ''; return; }
    const box = ex.getBoundingClientRect();
    const btn = opts.find((b) => b.dataset.c === cur);
    if (!btn || !box.width) return;
    const br = btn.getBoundingClientRect();
    const y0 = br.top + br.height / 2 - box.top;
    const xl = br.left - box.left + 6, xr = br.right - box.left - 6;
    const out = [];
    $$('.ex-l li.on .dot, .ex-r li.on .dot', ex).forEach((dot) => {
      const r = dot.getBoundingClientRect();
      const x = r.left + r.width / 2 - box.left, y = r.top + r.height / 2 - box.top;
      const x0 = x < xl ? xl : xr;
      const x1 = x < xl ? x + 7 : x - 7;
      const mx = (x0 + x1) / 2;
      out.push(`<path pathLength="1" d="M${x0.toFixed(1)},${y0.toFixed(1)} C${mx.toFixed(1)},${y0.toFixed(1)} ${mx.toFixed(1)},${y.toFixed(1)} ${x1.toFixed(1)},${y.toFixed(1)}"/>`);
    });
    svg.setAttribute('viewBox', `0 0 ${box.width.toFixed(1)} ${box.height.toFixed(1)}`);
    svg.innerHTML = out.join('');
    if (animate && !reduce) {
      $$('path', svg).forEach((p, i) => {
        p.style.strokeDasharray = '1';
        p.style.strokeDashoffset = '1';
        p.getBoundingClientRect();
        p.style.transition = `stroke-dashoffset .7s cubic-bezier(.23,1,.32,1) ${i * 40}ms`;
        p.style.strokeDashoffset = '0';
      });
    }
  }
  let rT;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { lines(false); hl(); }, 120); });
  if (ex && 'ResizeObserver' in window) new ResizeObserver(() => lines(false)).observe(ex);

  // ---------- barra de llamada del móvil: solo cuando los botones de la portada no se ven ----------
  const bar = $('.phonebar');
  const heroCta = $('.hero .cta');
  if (bar && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      bar.classList.toggle('show', show);
      bar.setAttribute('aria-hidden', String(!show));
      $$('a', bar).forEach((a) => { a.tabIndex = show ? 0 : -1; });
    }).observe(heroCta);
  }

  // ---------- enlace de la sección visible en la cabecera ----------
  const navLinks = $$('.nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach((s) => io.observe(s));
  }

  // ---------- al cambiar de idioma (y al cargar) ----------
  function refresh() {
    status();
    waLinks();
    split();
    select(cur);
    menuLabel(mBtn.getAttribute('aria-expanded') === 'true');
  }
  document.addEventListener('langchange', refresh);
  document.addEventListener('DOMContentLoaded', () => { if (!window.I18N) refresh(); });
  if (document.fonts) document.fonts.ready.then(() => { lines(false); hl(); });
})();
