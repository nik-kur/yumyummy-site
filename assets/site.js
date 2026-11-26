/* YumYummy landing: small progressive enhancements.
   - Sticky nav gets a hairline once the page scrolls.
   - Sections fade in as they enter the viewport.
   - App Store buttons: inside in-app browsers on iPhone (Instagram,
     Facebook, TikTok...) a plain apps.apple.com link often opens the
     web listing instead of the App Store app. There we try the
     itms-apps:// scheme first and fall back to the https link.
   - Each App Store click is also reported to the Meta and TikTok pixels.
     PostHog gets cta_clicked from analytics.js via the data-cta-* attributes. */
(function () {
  'use strict';
  var STORE = 'https://apps.apple.com/app/id6785363037';

  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(ua);
  var inApp = /FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|BytedanceWebview|Snapchat|LinkedInApp|Twitter|Line\//i.test(ua);

  function report(location) {
    try { if (window.fbq) window.fbq('trackCustom', 'AppStoreClick', { location: location }); } catch (e) {}
    try { if (window.ttq) window.ttq.track('ClickButton', { content_name: 'app_store', content_id: location }); } catch (e) {}
  }

  document.querySelectorAll('a[data-store]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      report(a.getAttribute('data-cta-location') || 'unknown');
      if (isIOS && inApp) {
        ev.preventDefault();
        var fallback = setTimeout(function () { window.location.href = STORE; }, 1200);
        document.addEventListener('visibilitychange', function () {
          if (document.hidden) clearTimeout(fallback);
        }, { once: true });
        window.location.href = STORE.replace('https://', 'itms-apps://');
      }
    });
  });
})();
