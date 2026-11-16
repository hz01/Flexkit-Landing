// Small working demos for the product sections. No dependencies, no network.
(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Swipr: swipe to keep or delete ── */
  (function () {
    var deck = document.getElementById('sw-deck');
    if (!deck) return;
    var photos = [
      { c: 'ph5', name: 'IMG_2037.jpg', mb: 2.4 },
      { c: 'ph2', name: 'IMG_2038.jpg', mb: 3.8 },
      { c: 'ph4', name: 'IMG_2039.jpg', mb: 2.9 },
      { c: 'ph3', name: 'IMG_2040.jpg', mb: 3.1 },
      { c: 'ph1', name: 'IMG_2041.jpg', mb: 4.2 }
    ];
    var done = document.getElementById('sw-done');
    var count = document.getElementById('sw-count');
    var trash = document.getElementById('sw-trash');
    var summary = document.getElementById('sw-summary');
    var reviewed = 0, trashed = 0, freed = 0, busy = false;

    function build() {
      reviewed = 0; trashed = 0; freed = 0;
      done.hidden = true;
      deck.querySelectorAll('.card').forEach(function (c) { c.remove(); });
      photos.forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'card';
        card.dataset.mb = p.mb;
        card.innerHTML = '<div class="ph ' + p.c + '"></div><span class="stamp k">Keep</span><span class="stamp d">Delete</span>' +
          '<div class="meta"><span>' + p.name + '</span><span>' + p.mb.toFixed(1) + ' MB</span></div>';
        deck.appendChild(card);
        bind(card);
      });
      render();
    }
    function render() {
      count.textContent = reviewed + ' of ' + photos.length + ' reviewed';
      trash.textContent = 'Trash · ' + trashed;
      if (reviewed === photos.length) {
        summary.textContent = trashed
          ? trashed + (trashed === 1 ? ' photo' : ' photos') + ' in the trash, ' + freed.toFixed(1) + ' MB to free up.'
          : 'You kept everything.';
        done.hidden = false;
      }
    }
    function top() { var c = deck.querySelectorAll('.card'); return c[c.length - 1]; }
    function decide(card, keep) {
      if (!card || busy) return;
      busy = true;
      card.classList.remove('drag');
      card.querySelector(keep ? '.k' : '.d').style.opacity = 1;
      card.style.transform = 'translateX(' + (keep ? 140 : -140) + '%) rotate(' + (keep ? 18 : -18) + 'deg)';
      card.style.opacity = 0;
      reviewed++;
      if (!keep) { trashed++; freed += parseFloat(card.dataset.mb); }
      setTimeout(function () { card.remove(); busy = false; render(); }, reduced ? 0 : 260);
    }
    function bind(card) {
      var sx = 0, dx = 0, active = false;
      card.addEventListener('pointerdown', function (e) {
        if (card !== top() || busy) return;
        active = true; sx = e.clientX; dx = 0;
        card.classList.add('drag');
        card.setPointerCapture(e.pointerId);
      });
      card.addEventListener('pointermove', function (e) {
        if (!active) return;
        dx = e.clientX - sx;
        card.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 18 + 'deg)';
        card.querySelector('.k').style.opacity = Math.max(0, Math.min(1, dx / 70));
        card.querySelector('.d').style.opacity = Math.max(0, Math.min(1, -dx / 70));
      });
      function end() {
        if (!active) return;
        active = false;
        if (Math.abs(dx) > 80) { decide(card, dx > 0); return; }
        card.classList.remove('drag');
        card.style.transform = '';
        card.querySelector('.k').style.opacity = 0;
        card.querySelector('.d').style.opacity = 0;
      }
      card.addEventListener('pointerup', end);
      card.addEventListener('pointercancel', end);
    }
    document.getElementById('sw-keep').addEventListener('click', function () { decide(top(), true); });
    document.getElementById('sw-del').addEventListener('click', function () { decide(top(), false); });
    document.getElementById('sw-reset').addEventListener('click', build);
    build();
  })();

  /* ── Scribr: waveform and playback-synced transcript ── */
  (function () {
    var wave = document.getElementById('sc-wave');
    var script = document.getElementById('sc-script');
    if (!wave || !script) return;
    var html = '';
    for (var i = 0; i < 44; i++) {
      var h = 22 + Math.round(70 * Math.abs(Math.sin(i * 0.62) * Math.cos(i * 0.21 + 1)));
      html += '<i style="--h:' + h + ';--i:' + (i % 11) + '"></i>';
    }
    wave.innerHTML = html;
    if (reduced) return;
    var lines = script.children, at = 0, timer = null;
    function tick() {
      lines[at].classList.remove('on');
      at = (at + 1) % lines.length;
      lines[at].classList.add('on');
    }
    // Only run while the demo is on screen.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { if (!timer) timer = setInterval(tick, 2600); }
        else { clearInterval(timer); timer = null; }
      }).observe(script);
    } else {
      timer = setInterval(tick, 2600);
    }
  })();

  /* ── SubTrakr: pause a subscription, watch the total ── */
  (function () {
    var list = document.getElementById('st-list');
    if (!list) return;
    var budget = 60;
    var total = document.getElementById('st-total');
    var bar = document.getElementById('st-bar');
    var state = document.getElementById('st-state');
    function render() {
      var sum = 0;
      list.querySelectorAll('button').forEach(function (b) {
        if (b.getAttribute('aria-pressed') !== 'true') sum += parseFloat(b.dataset.price);
      });
      var pct = Math.round(sum / budget * 100);
      total.textContent = '€' + sum.toFixed(2);
      bar.style.width = Math.min(100, pct) + '%';
      state.textContent = pct + '% used';
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      render();
    });
    render();
  })();
})();
