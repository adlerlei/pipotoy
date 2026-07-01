/* =========================================================
   PipoToy · pipo-col
   - Grid 欄位：放在 pipo-row 裡，橫向佔據指定欄數
   - HTML-First：span 用 attribute 宣告（預設 1 欄）
   - 不寫色碼、不寫自訂變數
   - 必須放在 pipo-row 內才有意義（脫離 grid 父層時只是 block）
   ========================================================= */

const STYLE_PIPO_COL = `
  :host {
    display: block;
    box-sizing: border-box;
    /* 預設 1 欄；JS 會根據 span attribute 覆寫成 --pipotoy-col-span */
    grid-column: span var(--pipotoy-col-span, 1);
    /* Grid item 預設 min-width: auto 會被內容撐住不能縮，強制 0 才能正確 shrink */
    min-width: 0;
  }
`;

class PipoCol extends HTMLElement {
  /* 列出所有「會改變渲染」的屬性，變動時自動重畫 */
  static get observedAttributes() {
    return ['span'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* STYLE 只注入一次 */
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE_PIPO_COL}</style><slot></slot>`;
      this._mounted = true;
    }
    this._syncSpan();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected && name === 'span') this._syncSpan();
  }

  _syncSpan() {
    /* span 解析：數字 1-12 接受；無效一律安靜 fallback 1（佔 1 欄） */
    const raw = parseInt(this.getAttribute('span'), 10);
    const span = (Number.isFinite(raw) && raw >= 1 && raw <= 12) ? raw : 1;
    this.style.setProperty('--pipotoy-col-span', String(span));
  }
}

if (!customElements.get('pipo-col')) {
  customElements.define('pipo-col', PipoCol);
}