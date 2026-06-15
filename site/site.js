/* =========================================================
   PipoToy · 網站專用腳本（所有 HTML 頁面共用）
   ---------------------------------------------------------
   載入順序（HTML body 結尾）：
     1. <script src="./src/version.js" defer></script>  ← 提供 PIPO_VERSION / PIPO_DATE
     2. <script src="./site/site.js" defer></script>     ← 本檔
   ---------------------------------------------------------
   行為：
     · 版本號注入：#footer-version / #footer-date / #hero-version
     · 行動選單：點選 nav-links 任一連結後自動收合
   ========================================================= */

(function () {
  'use strict';

  /* ── 版本號注入 ──────────────────────────────── */
  function injectVersion() {
    if (typeof PIPO_VERSION === 'undefined' || typeof PIPO_DATE === 'undefined') {
      return;  // version.js 沒載入：保留 HTML 預設文字，不報錯
    }

    var pairs = [
      ['#footer-version', 'v' + PIPO_VERSION],
      ['#hero-version',   'v' + PIPO_VERSION],
      ['#footer-date',     PIPO_DATE.slice(0, 4)]
    ];

    pairs.forEach(function (p) {
      var el = document.querySelector(p[0]);
      if (el) el.textContent = p[1];
    });
  }

  /* ── 行動選單：點連結後自動收合 ─────────────────── */
  function setupMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    if (!toggle) return;

    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.checked = false;
      });
    });
  }

  /* ── 啟動 ──────────────────────────────────────── */
  function init() {
    injectVersion();
    setupMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
