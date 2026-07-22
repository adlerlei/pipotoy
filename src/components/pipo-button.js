/* =========================================================
   PipoToy · pipo-button
   規格：pipo-button-spec.md
   - Action / 互動：黏土感按鈕
   - HTML-First：所有效果用 attribute 宣告
   - 有 href → 渲染 <a>；無 → <button>
   - 不寫色碼、不寫自訂變數
   ========================================================= */

const STYLE = `
  :host {
    display: inline-flex;
    vertical-align: middle;
  }
  :host([full]) {
    display: flex;
    width: 100%;
  }

  /* ── 基礎樣式（預設 = size md / shape pill / anim float） ── */
  .tap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: none;
    font-family: var(--pipotoy-font-sans);
    font-weight: 800;
    line-height: 1.2;
    color: var(--pipotoy-text);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    box-shadow: var(--pipotoy-shadow-2);
    border-radius: var(--pipotoy-round-pill);
    padding: 11px 26px;
    font-size: 15px;
    transition: transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring);
  }

  /* ── size ── */
  :host([size="xs"]) .tap { padding: 11px;      font-size: 15px; }
  :host([size="sm"]) .tap { padding: 7px 16px;  font-size: 13px; }
  :host([size="md"]) .tap { padding: 11px 26px; font-size: 15px; }
  :host([size="lg"]) .tap { padding: 15px 36px; font-size: 17px; }

  /* ── shape ── */
  :host([shape="pill"])    .tap { border-radius: var(--pipotoy-round-pill); }
  :host([shape="rounded"]) .tap { border-radius: var(--pipotoy-round-sm); }

  /* ── full：滿版 + 強制 rounded（蓋過 shape）+ 縱向 padding 依 size ── */
  :host([full]) .tap {
    width: 100%;
    border-radius: var(--pipotoy-round-sm);
    padding: 13px 26px; /* full 預設 = md */
  }
  :host([full][size="sm"]) .tap { padding: 9px 26px; }
  :host([full][size="md"]) .tap { padding: 13px 26px; }
  :host([full][size="lg"]) .tap { padding: 17px 26px; }

  /* ── hover / release（float 為基準，tilt 覆寫） ── */
  .tap:hover { box-shadow: var(--pipotoy-shadow-3); }
  .tap:hover { transform: translateY(-3px); }

  :host([anim="tilt"]) .tap { transform-origin: center bottom; }
  :host([anim="tilt"]) .tap:hover { transform: rotate(-5deg) translateY(-2px); }

  /* ── pressed ── */
  .tap:active {
    box-shadow: var(--pipotoy-shadow-press);
    transition: transform 80ms ease, box-shadow 80ms ease;
  }
  .tap:active { transform: translateY(2px) scale(0.97); }
  :host([anim="tilt"]) .tap:active { transform: rotate(-5deg) translateY(2px) scale(0.97); }

  /* ── focus（鍵盤無障礙） ── */
  .tap:focus-visible {
    outline: 3px solid var(--pipotoy-text);
    outline-offset: 3px;
  }

  /* ── disabled：維持 default 狀態，不動 transform / shadow ── */
  :host([disabled]) .tap {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: var(--pipotoy-shadow-2);
    transform: none;
  }
`;

const TYPES = ['button', 'submit', 'reset'];

class PipoButton extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'size', 'shape', 'anim', 'full', 'href', 'target', 'disabled', 'type'];
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

  _render() {
    const href = this.getAttribute('href');
    const hasHref = href !== null && href !== '';
    const disabled = this.hasAttribute('disabled');

    /* 移除舊的內部元件，保留 <style> */
    const old = this.shadowRoot.querySelector('.tap');
    if (old) old.remove();

    let el;
    if (hasHref) {
      /* 有 href → <a> */
      el = document.createElement('a');
      if (disabled) {
        /* disabled + href 共存：移除 href、aria-disabled、pointer-events 已由 CSS 處理 */
        el.setAttribute('aria-disabled', 'true');
      } else {
        el.setAttribute('href', href);
        /* target="blank" → 開新分頁，並補 rel 防 reverse tabnabbing */
        if (this.getAttribute('target') === 'blank') {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      }
    } else {
      /* 無 href → <button>，type 僅對 button 有效 */
      el = document.createElement('button');
      const type = this.getAttribute('type');
      el.type = TYPES.includes(type) ? type : 'button';
      if (disabled) {
        el.disabled = true;
        el.setAttribute('aria-disabled', 'true');
      }
    }

    el.className = 'tap';
    el.setAttribute('part', 'button');

    /* 背景色：無效 token fallback blonko，不報錯不空白 */
    const color = this.getAttribute('color') || 'blonko';
    el.style.background = `var(--pipo-${color}, var(--pipo-blonko))`;

    /* 內容投影 */
    el.appendChild(document.createElement('slot'));

    this.shadowRoot.appendChild(el);
  }
}

if (!customElements.get('pipo-button')) {
  customElements.define('pipo-button', PipoButton);
}
