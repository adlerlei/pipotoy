/* =========================================================
   PipoToy · pipo-note
   - Content / 內容：安靜的補充說明與翻譯區塊
   - color 只控制左側線條，文字沿用所在頁面的顏色
   - line：thin / medium / thick；無效值回到 medium
   ========================================================= */

const PIPO_NOTE_STYLE = `
  :host {
    display: block;
    color: inherit;
  }

  .note {
    box-sizing: border-box;
    border-inline-start-style: solid;
    border-inline-start-width: 4px;
    padding-inline-start: var(--pipotoy-pad-4);
    color: inherit;
    font: inherit;
  }

  :host([line="thin"]) .note { border-inline-start-width: 2px; }
  :host([line="medium"]) .note { border-inline-start-width: 4px; }
  :host([line="thick"]) .note { border-inline-start-width: 7px; }

  ::slotted(*) {
    margin-block-start: 0;
  }

  ::slotted(*:last-child) {
    margin-block-end: 0;
  }
`;

class PipoNote extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'line'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._mounted) {
      this.shadowRoot.innerHTML = `<style>${PIPO_NOTE_STYLE}</style>`;
      this._mounted = true;
    }
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (this.isConnected) this._render();
  }

  _render() {
    const old = this.shadowRoot.querySelector('.note');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = 'note';
    el.setAttribute('part', 'note');

    const requestedColor = this.getAttribute('color') || 'wibble';
    const color = /^[a-z][a-z0-9-]*$/.test(requestedColor) ? requestedColor : 'wibble';
    el.style.borderInlineStartColor = `var(--pipo-${color}, var(--pipo-wibble))`;

    el.appendChild(document.createElement('slot'));
    this.shadowRoot.appendChild(el);
  }
}

if (!customElements.get('pipo-note')) {
  customElements.define('pipo-note', PipoNote);
}
