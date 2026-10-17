// ===== Contact settings =====
const WHATSAPP_NUMBER = "2347067081911"; // country code + number, no + or spaces 
// CV file: already included at assets/Enoch-Micah-CV.pdf
// ================================
const wa = (t) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t)}`;
document.querySelectorAll('[data-wa]').forEach(a => a.href = wa(a.dataset.wa));
document.getElementById('wa-form').addEventListener('submit', e => {
  e.preventDefault(); const f = new FormData(e.target);
  window.open(wa(`Hi Enoch, I'm ${f.get('n')}. ${f.get('m')}`), '_blank', 'noopener');
});
document.getElementById('year').textContent = new Date().getFullYear();

// theme
const root = document.documentElement, saved = localStorage.getItem('theme');
if (saved) root.dataset.theme = saved;
document.getElementById('theme').onclick = () => {
  const dark = (root.dataset.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light')) === 'dark';
  root.dataset.theme = dark ? 'light' : 'dark'; localStorage.setItem('theme', root.dataset.theme);
};
// mobile menu + header shadow
const burger = document.getElementById('burger'), bar = document.getElementById('bar');
burger.onclick = () => burger.setAttribute('aria-expanded', bar.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.onclick = () => { bar.classList.remove('open'); burger.setAttribute('aria-expanded', false); });
addEventListener('scroll', () => bar.classList.toggle('stuck', scrollY > 8), { passive: true });

// project filter
document.querySelectorAll('.chips button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.chips button').forEach(x => x.classList.toggle('on', x === b));
  let n = 0; document.querySelectorAll('.card').forEach(c => { c.hidden = b.dataset.f !== 'all' && c.dataset.t !== b.dataset.f; if (!c.hidden) n++; });
  const e = document.getElementById('empty'); e.hidden = n > 0; e.textContent = b.textContent + ' projects are on the way. Check back soon.';
});
// lightbox
const lb = document.getElementById('lb'), lbi = document.getElementById('lbi');
document.querySelectorAll('[data-zoom]').forEach(b => b.onclick = () => { const i = b.querySelector('img'); lbi.src = i.src; lbi.alt = i.alt; lb.showModal(); });
lb.onclick = e => { if (e.target !== lbi) lb.close(); };

// count-up stats
const run = el => { const n = +el.dataset.count, t0 = performance.now();
  const step = t => { const p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString() + (p === 1 && n >= 1000 ? '+' : ''); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step); };
if (matchMedia('(prefers-reduced-motion:reduce)').matches) document.querySelectorAll('[data-count]').forEach(e => e.textContent = (+e.dataset.count).toLocaleString());
else document.querySelectorAll('[data-count]').forEach(run);
