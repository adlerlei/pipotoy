/* =========================================================
   PipoToy · 框架入口
   - 載入 Design Tokens
   - 註冊所有自訂元件
   - 用戶使用：<script src="src/pipotoy.js"></script>
   ========================================================= */

import './pipotoy-tokens.css';
import './components/pipo-page.js';
import './components/pipo-button.js';
import './components/pipo-navbar.js';
import './components/pipo-card.js';
import './components/pipo-stick.js';
import './components/pipo-alert.js';
import './components/pipo-note.js';
import './components/pipo-stack.js';
import './components/pipo-cluster.js';
import './components/pipo-row.js';
import './components/pipo-col.js';

// 對外暴露：方便除錯與擴充
window.PipoToy = window.PipoToy || {
  version: (typeof PIPO_VERSION !== 'undefined') ? PIPO_VERSION : 'dev',
  ready: true,
};

console.log(
  '%c🧸 PipoToy v' + (typeof PIPO_VERSION !== 'undefined' ? PIPO_VERSION : 'dev'),
  'font-weight:800; font-size:14px; color:#8aaba1;',
  '— UI Toy Kit ready'
);
