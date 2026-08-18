(function () {
  'use strict';

  var locale = (document.documentElement.lang || 'en').split('-')[0];
  var demoCopy = {
    en: { load: 'Load interactive preview', loading: 'Loading preview…', close: 'Close preview' },
    es: { load: 'Cargar vista interactiva', loading: 'Cargando vista…', close: 'Cerrar vista' },
    ru: { load: 'Загрузить интерактивное демо', loading: 'Загрузка демо…', close: 'Закрыть демо' }
  }[locale] || { load: 'Load interactive preview', loading: 'Loading preview…', close: 'Close preview' };

  function seededRandom(seed) {
    return function () {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  function buildStarfield() {
    var svg = document.getElementById('starfield-stars');
    if (!svg) return;
    var seed = Number(document.body.dataset.starfieldSeed || 7);
    var count = Number(document.body.dataset.starfieldCount || 140);
    var rng = seededRandom(Number.isFinite(seed) ? seed : 7);
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var output = '';

    for (var index = 0; index < count; index += 1) {
      var x = (rng() * 1440) | 0;
      var y = (rng() * 2400) | 0;
      var radius = rng() < 0.08 ? (1.4 + rng()).toFixed(1) : (0.4 + rng() * 0.8).toFixed(2);
      var opacity = (0.25 + rng() * 0.55).toFixed(2);
      output += '<circle cx="' + x + '" cy="' + y + '" r="' + radius + '" fill="url(#starGrad)" opacity="' + opacity + '">';
      if (!reducedMotion) {
        var duration = (3 + rng() * 5).toFixed(1);
        var delay = (rng() * 6).toFixed(1);
        output += '<animate attributeName="opacity" values="' + (opacity * 0.4).toFixed(2) + ';' + opacity + ';' + (opacity * 0.4).toFixed(2) + '" dur="' + duration + 's" begin="-' + delay + 's" repeatCount="indefinite"/>';
      }
      output += '</circle>';
    }
    svg.innerHTML = output;
  }

  function installReveal() {
    var items = document.querySelectorAll('.feature, .creed__card, .step, .disclaimer-block, .hero__copy, .hero__visual');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (item) { item.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (item) {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }

  function installLegalToc() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.legal__toc a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) { link.classList.remove('active'); });
        var active = links.find(function (link) {
          return link.getAttribute('href') === '#' + entry.target.id;
        });
        if (active) active.classList.add('active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  function unloadOtherDemos(currentFrame) {
    document.querySelectorAll('iframe[data-demo-active="true"]').forEach(function (frame) {
      if (frame === currentFrame) return;
      frame.removeAttribute('src');
      frame.hidden = true;
      frame.dataset.demoActive = 'false';
      var shell = frame.closest('[data-demo-shell]');
      if (shell) {
        shell.classList.remove('is-active', 'is-loading');
        var gate = shell.querySelector('.demo-gate');
        if (gate) gate.hidden = false;
      }
    });
  }

  function installDemoGates() {
    var posterObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var poster = entry.target.dataset.demoPoster;
        if (poster) entry.target.style.backgroundImage = 'url("' + poster + '")';
        posterObserver.unobserve(entry.target);
      });
    }, { rootMargin: '500px 0px' }) : null;

    document.querySelectorAll('iframe[data-demo-src]').forEach(function (frame) {
      var shell = frame.parentElement;
      if (!shell) return;
      shell.setAttribute('data-demo-shell', '');
      frame.hidden = true;
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.setAttribute('referrerpolicy', 'no-referrer');
      frame.setAttribute('title', frame.title || demoCopy.load);

      var gate = document.createElement('button');
      gate.type = 'button';
      gate.className = 'demo-gate';
      gate.setAttribute('aria-label', demoCopy.load + ': ' + frame.title);
      if (frame.dataset.poster) {
        gate.dataset.demoPoster = frame.dataset.poster;
        if (posterObserver) posterObserver.observe(gate);
        else gate.style.backgroundImage = 'url("' + frame.dataset.poster + '")';
      }
      gate.innerHTML = '<span class="demo-gate__label"><span aria-hidden="true">▷</span> ' + demoCopy.load + '</span>';
      shell.appendChild(gate);

      gate.addEventListener('click', function () {
        unloadOtherDemos(frame);
        gate.disabled = true;
        gate.querySelector('.demo-gate__label').textContent = demoCopy.loading;
        shell.classList.add('is-active', 'is-loading');
        frame.hidden = false;
        frame.dataset.demoActive = 'true';
        frame.src = frame.dataset.demoSrc;
      });

      frame.addEventListener('load', function () {
        if (frame.dataset.demoActive !== 'true') return;
        shell.classList.remove('is-loading');
        gate.hidden = true;
        gate.disabled = false;
        gate.innerHTML = '<span class="demo-gate__label"><span aria-hidden="true">▷</span> ' + demoCopy.load + '</span>';
      });
    });
  }

  buildStarfield();
  installReveal();
  installLegalToc();
  installDemoGates();
}());
