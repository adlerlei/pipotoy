/* =========================================================
   PipoToy · pipo-page
   規格：pipo-page-spec.md（v0.1.1-alpha）
   - 網頁世界容器 / 整個網頁的最外層包覆殼
   - HTML-First：所有效果用 attribute 宣告
   - 不寫色碼、不寫自訂變數
   ========================================================= */

const TPL = `
  <style>
    :host {
      display: block;
      position: relative;
      min-height: var(--pw-min-height, 100vh);
      font-family: var(--pipotoy-font-sans);
      color: var(--pipotoy-text);
      isolation: isolate;
      box-sizing: border-box;
    }

    /* ── fill ── */
    :host([data-pw-fill="screen"]) { --pw-min-height: 100vh; }
    :host([data-pw-fill="none"])   { --pw-min-height: 0; }

    /* ── size（內容容器寬度） ── */
    :host([data-pw-size="full"])   .pw-content { max-width: 100%; }
    :host([data-pw-size="wide"])   .pw-content { max-width: 1200px; }
    :host([data-pw-size="medium"]) .pw-content { max-width: 960px; }
    :host([data-pw-size="narrow"]) .pw-content { max-width: 720px; }
    @media (max-width: 1024px) {
      :host([data-pw-size="wide"])   .pw-content,
      :host([data-pw-size="medium"]) .pw-content,
      :host([data-pw-size="narrow"]) .pw-content { max-width: 100%; }
    }

    /* ── align（內容水平位置） ── */
    :host([data-pw-align="left"])   .pw-content { margin-left: 0;   margin-right: auto; }
    :host([data-pw-align="center"]) .pw-content { margin-left: auto; margin-right: auto; }
    :host([data-pw-align="right"])  .pw-content { margin-left: auto; margin-right: 0; }

    /* ── space（容器四周留白） ── */
    :host([data-pw-space="0"])     .pw-content { padding: 0; }
    :host([data-pw-space="small"]) .pw-content { padding: 16px; }
    :host([data-pw-space="medium"]) .pw-content { padding: 32px; }
    :host([data-pw-space="large"])  .pw-content { padding: 64px; }
    @media (max-width: 1024px) {
      :host([data-pw-space="medium"]) .pw-content { padding: 24px; }
      :host([data-pw-space="large"])  .pw-content { padding: 48px; }
    }
    @media (max-width: 768px) {
      :host([data-pw-space="small"])  .pw-content { padding: 12px; }
      :host([data-pw-space="medium"]) .pw-content { padding: 16px; }
      :host([data-pw-space="large"])  .pw-content { padding: 24px; }
    }

    /* ── middle（垂直置中） ── */
    :host([data-pw-middle="true"]) {
      display: flex; align-items: center; justify-content: center;
    }
    :host([data-pw-middle="true"]) .pw-content { width: 100%; }

    /* ── 背景層（color → image → video，底到頂） ── */
    .pw-color,
    .pw-image,
    .pw-video-wrap {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .pw-color      { z-index: 0; }
    .pw-image      { z-index: 1; background-repeat: no-repeat; }
    .pw-video-wrap { z-index: 2; }

    .pw-video-wrap video {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 圖片 dimming（用 ::after 不影響子元件透明度） */
    .pw-image::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--pipotoy-text);
      opacity: calc(1 - var(--pw-image-light, 100) / 100);
    }

    /* 影片 dimming */
    .pw-video-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--pipotoy-text);
      opacity: calc(1 - var(--pw-video-light, 100) / 100);
    }

    /* 行動裝置 fixed 失效時降級到 scroll */
    @media (max-width: 768px) {
      .pw-image { background-attachment: scroll !important; }
    }

    /* ── 內容層（永遠在最上） ── */
    .pw-content {
      position: relative;
      z-index: 10;
      box-sizing: border-box;
    }
  </style>

  <div class="pw-color"></div>
  <div class="pw-image" hidden></div>
  <div class="pw-video-wrap" hidden>
    <video muted loop playsinline></video>
  </div>
  <div class="pw-content">
    <slot></slot>
  </div>
`;

class PipoPage extends HTMLElement {
  static get observedAttributes() {
    return [
      'size', 'fill', 'space', 'align', 'middle', 'scroll',
      'color', 'image', 'image-fit', 'image-align', 'image-light', 'image-sticky',
      'video', 'video-light'
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._scrollPrev = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = TPL;
    this._video = this.shadowRoot.querySelector('video');
    PipoPage.observedAttributes.forEach(name => this._apply(name));
    this._applyScroll();
  }

  disconnectedCallback() {
    this._unapplyScroll();
    if (this._video) {
      this._video.pause();
      this._video.removeAttribute('src');
      this._video.load();
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (!this.isConnected) return;
    if (name === 'scroll') {
      this._unapplyScroll();
      this._applyScroll();
    } else {
      this._apply(name);
    }
  }

  _apply(name) {
    const val = this.getAttribute(name);
    const $ = (sel) => this.shadowRoot.querySelector(sel);

    switch (name) {
      /* ── 背景顏色 ── */
      case 'color': {
        const el = $('.pw-color');
        el.style.backgroundColor = val
          ? `var(--pipo-${val}, var(--pipotoy-bg))`
          : 'var(--pipotoy-bg)';
        break;
      }

      /* ── 背景圖片 ── */
      case 'image': {
        const el = $('.pw-image');
        if (val) {
          el.style.backgroundImage = `url("${val}")`;
          el.hidden = false;
        } else {
          el.style.backgroundImage = '';
          el.hidden = true;
        }
        break;
      }
      case 'image-fit': {
        const el = $('.pw-image');
        if (val === 'tile') {
          el.style.backgroundSize = 'auto';
          el.style.backgroundRepeat = 'repeat';
        } else {
          el.style.backgroundSize = val || 'cover';
          el.style.backgroundRepeat = 'no-repeat'; // 從 tile 切換回來時重置
        }
        break;
      }
      case 'image-align': {
        $('.pw-image').style.backgroundPosition = val || 'center';
        break;
      }
      case 'image-light': {
        const v = this._clamp(this._toNum(val, 100), 0, 100);
        $('.pw-image').style.setProperty('--pw-image-light', v);
        break;
      }
      case 'image-sticky': {
        const on = this._isTrue(val);
        $('.pw-image').style.backgroundAttachment = on ? 'fixed' : 'scroll';
        break;
      }

      /* ── 背景影片 ── */
      case 'video': {
        const wrap = $('.pw-video-wrap');
        if (val) {
          this._video.src = val;
          this._video.load();
          const p = this._video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
          wrap.hidden = false;
        } else {
          this._video.pause();
          this._video.removeAttribute('src');
          this._video.load();
          wrap.hidden = true;
        }
        break;
      }
      case 'video-light': {
        const v = this._clamp(this._toNum(val, 100), 0, 100);
        $('.pw-video-wrap').style.setProperty('--pw-video-light', v);
        break;
      }

      /* ── 結構屬性：copy 到 data attr 給 CSS 選 ── */
      case 'size':   this.setAttribute('data-pw-size',   val || 'full');   break;
      case 'fill':   this.setAttribute('data-pw-fill',   val || 'screen'); break;
      case 'space':  this.setAttribute('data-pw-space',  val || '0');      break;
      case 'align':  this.setAttribute('data-pw-align',  val || 'center'); break;
      case 'middle': this.setAttribute('data-pw-middle', this._isTrue(val) ? 'true' : 'false'); break;
    }
  }

  _applyScroll() {
    const val = this.getAttribute('scroll') || 'auto';
    if (val === 'no') {
      this._scrollPrev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
  }

  _unapplyScroll() {
    if (this._scrollPrev !== null) {
      document.documentElement.style.overflow = this._scrollPrev;
      this._scrollPrev = null;
    }
  }

  _isTrue(v) {
    return v === '' || v === 'true' || v === '1';
  }

  _toNum(v, fallback) {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? fallback : n;
  }

  _clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }
}

if (!customElements.get('pipo-page')) {
  customElements.define('pipo-page', PipoPage);
}
