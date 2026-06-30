/* =========================================================
   PipoToy · pipo-stack
   - 垂直堆疊容器：每個直接子元素之間自動等距
   - HTML-First：gap 用 attribute 宣告
   - 不寫色碼、不寫自訂變數
   - 響應式由外面（pipo-page / pipo-grid）負責，
     stack 本身不處理斷點，只負責「垂直等距」
   ========================================================= */

const STYLE_PIPO_STACK = `
  :host {
    display: block;
    box-sizing: border-box;
  }

  .stack {
    display: block;
    box-sizing: border-box;
  }

  /* ── gap 變體（透過 host attribute 切換） ──
     slot 投影的元素不是 .stack 的真實 DOM 子系，
     所以 .stack > * + * 不會命中；改用 ::slotted()。
     給每個 slotted 加 margin-top，第一個用 :first-child 清掉。
     !important 必須加：light DOM 的 universal reset (* { margin: 0 })
     specificity 跟 ::slotted(*) 相同 (0,0,1)，被 cascade 後寫規則
     （即 universal reset，較晚載入）壓制。!important 直接拉開勝出。*/
  ::slotted(*) { margin-top: 16px !important; }
  ::slotted(*:first-child) { margin-top: 0 !important; }

  :host([gap="none"])   ::slotted(*) { margin-top: 0 !important; }
  :host([gap="small"])  ::slotted(*) { margin-top: 8px !important; }
  :host([gap="medium"]) ::slotted(*) { margin-top: 16px !important; }
  :host([gap="large"])  ::slotted(*) { margin-top: 64px !important; }
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
      this.shadowRoot.innerHTML = `<style>${STYLE_PIPO_STACK}</style><div class="stack" part="stack"><slot></slot></div>`;
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