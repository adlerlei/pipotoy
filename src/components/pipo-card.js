/* =========================================================
   PipoToy · pipo-card
   - Content / 內容容器：黏土感卡片
   - HTML-First：縮圖 / 標題 / 標籤 / 內文全用 attribute + slot 宣告
   - 有 href → 整張卡渲染 <a>；無 → <div>
   - 不寫色碼、不寫自訂變數
   ========================================================= */

const STYLE = `
  :host { display: block; }

  .pcard {
    position: relative;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    font-family: var(--pipotoy-font-sans);
    color: var(--pipotoy-text);
    background: var(--pipotoy-surface);
    box-shadow: var(--pipotoy-shadow-2);
    border-radius: var(--pipotoy-round-lg);
    text-decoration: none;
    transition: transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring);
  }
  .pcard:hover {
    box-shadow: var(--pipotoy-shadow-3);
    transform: translateY(-4px);
  }
  :host([href]) .pcard { cursor: pointer; }

  /* 鍵盤無障礙：可點卡片的聚焦框 */
  a.pcard:focus-visible {
    outline: 3px solid var(--pipotoy-text);
    outline-offset: 3px;
  }

  /* ── 頂部縮圖（色塊 / 圖片） ── */
  .thumb {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
  .thumb img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── 右上角小標籤 chip ── */
  .tag {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 1;
    padding: 5px 13px;
    border-radius: var(--pipotoy-round-pill);
    font-size: 12px;
    font-weight: 800;
    line-height: 1.2;
    color: var(--pipotoy-text);
    box-shadow: var(--pipotoy-shadow-1);
  }

  /* ── 內文區 ── */
  .body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: var(--pipotoy-pad-5, 24px);
  }
  .title {
    font-size: 19px;
    font-weight: 800;
    line-height: 1.3;
  }
  .text {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.65;
    color: var(--pipotoy-muted);
  }
`;

class PipoCard extends HTMLElement {
  static get observedAttributes() {
    return ['thumb', 'thumb-image', 'title', 'tag', 'color', 'href', 'target'];
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

    /* 移除舊的內部節點，保留 <style> */
    const old = this.shadowRoot.querySelector('.pcard');
    if (old) old.remove();

    /* 有 href → <a>（整卡可點）；無 → <div> */
    const root = document.createElement(hasHref ? 'a' : 'div');
    root.className = 'pcard';
    root.setAttribute('part', 'card');
    if (hasHref) {
      root.setAttribute('href', href);
      /* target="blank" → 開新分頁，並補 rel 防 reverse tabnabbing */
      if (this.getAttribute('target') === 'blank') {
        root.setAttribute('target', '_blank');
        root.setAttribute('rel', 'noopener noreferrer');
      }
    }

    /* ── 縮圖：色塊（thumb）或圖片（thumb-image 覆蓋） ── */
    const thumb = this.getAttribute('thumb');
    const thumbImage = this.getAttribute('thumb-image');
    if (thumb || thumbImage) {
      const th = document.createElement('div');
      th.className = 'thumb';
      th.setAttribute('part', 'thumb');
      /* 無效 token / 無 thumb 時 fallback 淺色面，不報錯不空白 */
      th.style.background = `var(--pipo-${thumb || ''}, var(--pipotoy-surface-2))`;
      if (thumbImage) {
        const img = document.createElement('img');
        img.src = thumbImage;
        img.alt = '';
        /* 圖片載入失敗 → 移除，露出底下的色塊 fallback */
        img.addEventListener('error', () => { img.remove(); });
        th.appendChild(img);
      }
      root.appendChild(th);
    }

    /* ── 右上角標籤 chip ── */
    const tag = this.getAttribute('tag');
    if (tag) {
      const chip = document.createElement('span');
      chip.className = 'tag';
      chip.setAttribute('part', 'tag');
      const color = this.getAttribute('color') || 'blonko';
      chip.style.background = `var(--pipo-${color}, var(--pipo-blonko))`;
      chip.textContent = tag;
      root.appendChild(chip);
    }

    /* ── 內文區（標題 + slot） ── */
    const title = this.getAttribute('title');
    const hasContent = this.innerHTML.trim() !== '';
    if (title || hasContent) {
      const body = document.createElement('div');
      body.className = 'body';

      if (title) {
        const h = document.createElement('div');
        h.className = 'title';
        h.setAttribute('part', 'title');
        h.textContent = title;
        body.appendChild(h);
      }

      if (hasContent) {
        const text = document.createElement('div');
        text.className = 'text';
        text.appendChild(document.createElement('slot'));
        body.appendChild(text);
      }

      root.appendChild(body);
    }

    this.shadowRoot.appendChild(root);
  }
}

if (!customElements.get('pipo-card')) {
  customElements.define('pipo-card', PipoCard);
}
