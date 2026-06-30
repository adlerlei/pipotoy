/* =========================================================
   PipoToy · pipo-stack
   - 垂直堆疊容器：每個直接子元素之間自動等距
   - HTML-First：gap 用 attribute 宣告
   - 不寫色碼、不寫自訂變數
   - 響應式由外面（pipo-page / pipo-grid）負責，
     stack 本身不處理斷點，只負責「垂直等距」
   ========================================================= */

const STYLE = `
  :host {
    display: block;
    box-sizing: border-box;
  }

  .stack {
    display: block;
    box-sizing: border-box;
  }

  /* ── gap 變體（透過 host attribute 切換） ── */
  :host([gap="none"])   .stack > * + * { margin-top: 0; }
  :host([gap="small"])  .stack > * + * { margin-top: var(--pipotoy-pad-2, 8px); }
  :host([gap="medium"]) .stack > * + * { margin-top: var(--pipotoy-pad-4, 16px); }
  :host([gap="large"])  .stack > * + * { margin-top: var(--pipotoy-pad-5, 24px); }

  /* 無效 gap 一律 fallback 到 medium（不報錯不空白） */
  .stack > * + * { margin-top: var(--pipotoy-pad-4, 16px); }
`;

class PipoStack extends HTMLElement {
  static get observedAttributes() {
    return ['gap'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE}</style><div class="stack" part="stack"><slot></slot></div>`;
      this._mounted = true;
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    /* 純 CSS 切換，無需重渲染 */
  }
}

if (!customElements.get('pipo-stack')) {
  customElements.define('pipo-stack', PipoStack);
}