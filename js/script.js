document.getElementById('year').textContent = new Date().getFullYear();
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Fotos da infraestrutura (abre ao clicar no card)
(function () {
  var lb = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var list = [], i = 0, title = '', lastCard = null;

  function show() {
    img.src = list[i];
    img.alt = title + ' - foto ' + (i + 1) + ' de ' + list.length;
    cap.textContent = title + (list.length > 1 ? ' (' + (i + 1) + '/' + list.length + ')' : '');
  }
  function openCard(card) {
    list = card.dataset.photos.split('|');
    title = card.dataset.title;
    i = 0; lastCard = card;
    lb.classList.toggle('single', list.length < 2);
    show();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }
  function closeBox() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastCard) lastCard.focus();
  }
  function step(d) { i = (i + list.length + d) % list.length; show(); }

  document.querySelectorAll('.has-photo').forEach(function (c) {
    c.addEventListener('click', function () { openCard(c); });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCard(c); }
    });
  });
  document.getElementById('lbClose').addEventListener('click', closeBox);
  document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
  document.getElementById('lbNext').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeBox(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeBox();
    if (e.key === 'ArrowLeft' && list.length > 1) step(-1);
    if (e.key === 'ArrowRight' && list.length > 1) step(1);
  });
})();

// Botão da equipe gestora completa
(function () {
  var btn = document.getElementById('teamBtn');
  var list = document.getElementById('teamList');
  var txt = document.getElementById('teamBtnText');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    list.hidden = open;
    txt.textContent = open ? 'Ver toda a equipe gestora' : 'Ocultar equipe gestora';
  });
})();
