/* =========================================================
   PipoToy · pipo-row
   - 12 欄 Grid 容器：把 pipo-col 子元素精確分配到指定欄數
   - HTML-First：gap / cols 用 attribute 宣告
   - 不寫色碼、不寫自訂變數
   - 給「需要精確排版」的進階場景用；簡單排版走 pipo-cluster / pipo-stack
   - 響應式不內建（v1）：複雜斷點請另外搭配其他元件
   ========================================================= */

const STYLE_PIPO_ROW = `
  :host {
    display: block;
    box-sizing: border-box;
  }

  .row {
    display: grid;
    box-sizing: border-box;
    /* 預設 12 欄；JS 會根據 cols attribute 覆寫成 --pipotoy-grid-cols */
    grid-template-columns: repeat(var(--pipotoy-grid-cols, 12), 1fr);
  }

  /* ── gap 變體（與 cluster / stack 對齊同一組四級） ── */
  .row { gap: 16px; }
  :host([gap="none"])   .row { gap: 0; }
  :host([gap="small"])  .row { gap: 8px; }
  :host([gap="medium"]) .row { gap: 16px; }
  :host([gap="large"])  .row { gap: 32px; }
`;

class PipoRow extends HTMLElement {
  /* 列出所有「會改變渲染」的屬性，變動時自動重畫 */
  static get observedAttributes() {
    return ['gap', 'cols'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    /* STYLE 只注入一次，之後只重畫內容 */
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE_PIPO_ROW}</style><div class="row" part="row"><slot></slot></div>`;
      this._mounted = true;
    }
    this._syncCols();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected && name === 'cols') this._syncCols();
  }

  _syncCols() {
    /* cols 解析：數字 2-12 接受；無效（含 0/負數/非數字/超出 12）一律安靜 fallback 12 */
    const raw = parseInt(this.getAttribute('cols'), 10);
    const cols = (Number.isFinite(raw) && raw >= 2 && raw <= 12) ? raw : 12;
    this.style.setProperty('--pipotoy-grid-cols', String(cols));
  }
}

if (!customElements.get('pipo-row')) {
  customElements.define('pipo-row', PipoRow);
}