/* =========================================================
   PipoToy · _template（元件骨架 · 複製我，改名 pipo-xxx）
   --------------------------------------------------------
   用法：
   1. 複製本檔 → src/components/pipo-xxx.js
   2. 全檔搜尋 "Xxx" / "xxx" → 換成你的元件名（命名先過 agent.md 第一節命名測試）
   3. 改 observedAttributes、STYLE、_render，刪掉用不到的範例屬性
   4. 收尾照 docs/component-recipe.md 的「接線清單」
   鐵律（agent.md 第二、三節）：
   - 只能用 token：var(--pipotoy-xxx) 或 var(--pipo-{color})，禁止寫色碼、禁止自訂新變數
   - 一律 customElements.define，禁止 .pipo-btn 這種 class 寫法
   ========================================================= */

const STYLE = `
  :host {
    display: inline-block;        /* 視元件調整：block / inline-flex … */
  }

  .root {
    box-sizing: border-box;
    font-family: var(--pipotoy-font-sans);
    color: var(--pipotoy-text);
    background: var(--pipotoy-surface);
    box-shadow: var(--pipotoy-shadow-2);
    border-radius: var(--pipotoy-round);
    padding: var(--pipotoy-pad-3, 16px);
    transition: transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring);
  }

  /* ── 範例：以 attribute 驅動變體（host 選擇器，不用 class） ── */
  :host([size="sm"]) .root { padding: 10px; }
  :host([size="lg"]) .root { padding: 24px; }

  .root:hover { box-shadow: var(--pipotoy-shadow-3); transform: translateY(-3px); }
`;

class PipoXxx extends HTMLElement {
  /* 列出所有「會改變渲染」的屬性，變動時自動重畫 */
  static get observedAttributes() {
    return ['color', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* STYLE 只注入一次，之後只重畫內容 */
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE}</style>`;
      this._mounted = true;
    }
    this._render();
  }

  attributeChangedCallback(oldName, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected) this._render();
  }

  _render() {
    /* 移除舊的內部節點，保留 <style> */
    const old = this.shadowRoot.querySelector('.root');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = 'root';
    el.setAttribute('part', 'root');

    /* 色彩：無效 token 自動 fallback，不報錯不空白 */
    const color = this.getAttribute('color');
    if (color) {
      el.style.background = `var(--pipo-${color}, var(--pipotoy-surface))`;
    }

    /* 內容投影 */
    el.appendChild(document.createElement('slot'));

    this.shadowRoot.appendChild(el);
  }
}

if (!customElements.get('pipo-xxx')) {
  customElements.define('pipo-xxx', PipoXxx);
}
