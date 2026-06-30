/* =========================================================
   PipoToy · pipo-alert
   - Content / 狀態提示：通知訊息（成功 / 注意 / 警告）
   - HTML-First：type / desc / icon / dismiss 全用 attribute
   - icon 內建手繪 SVG（disc + ring + mark），不走 slot
   - 不寫色碼、不寫自訂變數
   ========================================================= */

const VALID_TYPES = ['success', 'warn', 'error'];
const TYPE_COLOR  = { success: 'mibble', warn: 'blonko', error: 'plobbo' };

/* 三種 icon 對應的 SVG 內部（disc + ring ＋ 不同 mark）
   disc  ＝ 半透明圓盤
   ring  ＝ 描邊圓
   mark  = 符號線（成功/警告/錯誤）
   dot   ＝ 驚嘆號下方圓點（warn） */
const ICON_SVG = {
  success:
    '<circle cx="12" cy="12" r="11" class="disc"/>' +
    '<circle cx="12" cy="12" r="10.25" class="ring"/>' +
    '<path d="M 7 12 L 10.5 15.5 L 17 8.5" class="mark"/>',
  warn:
    '<circle cx="12" cy="12" r="11" class="disc"/>' +
    '<circle cx="12" cy="12" r="10.25" class="ring"/>' +
    '<line x1="12" y1="6.5" x2="12" y2="14" class="mark"/>' +
    '<circle cx="12" cy="17.5" r="1.3" class="dot"/>',
  error:
    '<circle cx="12" cy="12" r="11" class="disc"/>' +
    '<circle cx="12" cy="12" r="10.25" class="ring"/>' +
    '<path d="M 8.5 8.5 L 15.5 15.5 M 15.5 8.5 L 8.5 15.5" class="mark"/>',
};

const STYLE = `
  :host { display: block; }

  .alert {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: var(--pipotoy-round);
    box-shadow:
      var(--pipotoy-shadow-1),
      inset 0 0 0 1px var(--pipotoy-line);
    font-family: var(--pipotoy-font-sans);
    color: var(--pipotoy-text);
  }

  /* SVG icon：currentColor 跟著 .alert 文字色走（var(--pipotoy-text)）*/
  .icon-svg {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    color: var(--pipotoy-text);
  }
  .icon-svg .disc { fill: currentColor; opacity: 0.22; }
  .icon-svg .ring { fill: none; stroke: currentColor; stroke-width: 1.5; opacity: 0.55; }
  .icon-svg .mark { fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
  .icon-svg .dot  { fill: currentColor; }
  :host([icon="off"]) .icon-svg { display: none; }

  /* 標題 + 副標題 */
  .body { flex: 1; min-width: 0; }
  .title {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
  }
  .desc {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.55;
    color: var(--pipotoy-muted);
    margin-top: 2px;
  }

  /* dismiss × 按鈕 */
  .dismiss {
    background: none;
    border: none;
    font-family: inherit;
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
    color: var(--pipotoy-text);
    opacity: 0.5;
    cursor: pointer;
    padding: 4px 8px;
    margin: -4px -8px -4px 0;
    border-radius: var(--pipotoy-round-sm);
    transition: opacity var(--pipotoy-ease);
    align-self: flex-start;
    flex-shrink: 0;
  }
  .dismiss:hover { opacity: 1; }
  .dismiss:focus-visible {
    outline: 2px solid var(--pipotoy-text);
    outline-offset: 1px;
    opacity: 1;
  }

  /* dismissed 狀態：整個 alert 隱藏 */
  :host([data-dismissed]) { display: none; }
`;

class PipoAlert extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'desc', 'icon', 'dismiss'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${STYLE}</style>`;
      this._mounted = true;
    }
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected) this._render();
  }

  /* 對外 API：被 dismiss 後可以重新叫出來 */
  show() {
    this.removeAttribute('data-dismissed');
  }

  _render() {
    /* 移除舊的內部節點，保留 <style> */
    const old = this.shadowRoot.querySelector('.alert');
    if (old) old.remove();

    /* type 安靜 fallback：無效值 → success（不報錯不空白） */
    const rawType = this.getAttribute('type');
    const type = VALID_TYPES.includes(rawType) ? rawType : 'success';
    const showIcon = this.getAttribute('icon') !== 'off';
    const desc = this.getAttribute('desc');
    const hasDismiss = this.hasAttribute('dismiss');

    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.setAttribute('part', 'alert');

    /* 背景色：依 type map 到 Pipo token，無效值也照樣套色 */
    alert.style.background = `var(--pipo-${TYPE_COLOR[type]})`;

    /* SVG icon */
    if (showIcon) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('class', 'icon-svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('part', 'icon');
      svg.innerHTML = ICON_SVG[type];
      alert.appendChild(svg);
    }

    /* 標題（slot）+ 副標題（desc attribute） */
    const body = document.createElement('div');
    body.className = 'body';
    body.setAttribute('part', 'body');

    const title = document.createElement('div');
    title.className = 'title';
    title.setAttribute('part', 'title');
    title.appendChild(document.createElement('slot'));
    body.appendChild(title);

    if (desc) {
      const d = document.createElement('div');
      d.className = 'desc';
      d.setAttribute('part', 'desc');
      d.textContent = desc;
      body.appendChild(d);
    }
    alert.appendChild(body);

    /* dismiss 按鈕 */
    if (hasDismiss) {
      const btn = document.createElement('button');
      btn.className = 'dismiss';
      btn.setAttribute('part', 'dismiss');
      btn.type = 'button';
      btn.setAttribute('aria-label', '關閉 Close');
      btn.textContent = '×';
      btn.addEventListener('click', () => this.setAttribute('data-dismissed', ''));
      alert.appendChild(btn);
    }

    this.shadowRoot.appendChild(alert);
  }
}

if (!customElements.get('pipo-alert')) {
  customElements.define('pipo-alert', PipoAlert);
}
