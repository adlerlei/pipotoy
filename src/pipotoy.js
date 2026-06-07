/* =========================================================
   PipoToy · 框架入口
   - 載入 Design Tokens
   - 註冊所有自訂元件
   - 用戶使用：<script src="src/pipotoy.js"></script>
   ========================================================= */

import './pipotoy-tokens.css';

// ── 元件註冊（待補）──
// 範例：import './components/pipo-tap.js';

// 對外暴露：方便除錯與擴充
window.PipoToy = window.PipoToy || {
  version: '0.1.0-alpha',
  ready: true,
};

console.log('%c🧸 PipoToy v0.1.0-alpha', 'font-weight:800; font-size:14px; color:#8aaba1;', '— UI Toy Kit ready');
