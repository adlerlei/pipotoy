/* =========================================================
   PipoToy · pipo-cluster
   - 水平群聚容器：元素水平排成一線，塞不下自動換行
   - HTML-First：gap / align 用 attribute 宣告
   - 不寫色碼、不寫自訂變數
   - 響應式由外面（pipo-page / pipo-grid）負責，
     cluster 本身只負責「水平排列 + 自動換行 + 等距」
   ========================================================= */

const STYLE_PIPO_CLUSTER = `
  :host {
    display: block;
    box-sizing: border-box;
  }

  .cluster {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  /* ── gap 變體（透過 host attribute 切換） ── */
  .cluster { gap: 16px; }
  :host([gap="none"])   .cluster { gap: 0; }
  :host([gap="small"])  .cluster { gap: 8px; }
  :host([gap="medium"]) .cluster { gap: 16px; }
  :host([gap="large"])  .cluster { gap: 64px; }

  /* ── align 變體（垂直對齊） ── */
  .cluster { align-items: center; }
  :host([align="start"])    .cluster { align-items: flex-start; }
  :host([align="center"])   .cluster { align-items: center; }
  :host([align="end"])      .cluster { align-items: flex-end; }
  :host([align="stretch"])  .cluster { align-items: stretch; }
`;

class PipoCluster extends HTMLElement {
  static get observedAttributes() {
    return ['gap', 'align'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE_PIPO_CLUSTER}</style><div class="cluster" part="cluster"><slot></slot></div>`;
      this._mounted = true;
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    /* 純 CSS 切換，無需重渲染 */
  }
}

if (!customElements.get('pipo-cluster')) {
  customElements.define('pipo-cluster', PipoCluster);
}