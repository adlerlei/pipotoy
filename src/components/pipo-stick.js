/* =========================================================
   PipoToy · pipo-stick
   - Content / 內容容器：歪歪的便利貼
   - HTML-First：色 / 傾斜 / 圖釘 全用 attribute 宣告
   - 不寫色碼、不寫自訂 design token
   ========================================================= */

const STYLE = `
  :host {
    display: inline-block;
    vertical-align: top;
  }

  .stick {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    font-family: var(--pipotoy-font-sans);
    color: var(--pipotoy-text);
    background: var(--pipotoy-surface);
    border: 1px solid var(--pipotoy-line);
    box-shadow: var(--pipotoy-shadow-2);
    border-radius: var(--pipotoy-round-sm);
    padding: var(--pipotoy-pad-4) var(--pipotoy-pad-5);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.55;
    min-width: 90px;
    max-width: 240px;
    text-align: left;
    cursor: default;
    transform-origin: center top;
    transition: transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring);
  }

  /* size 檔位：整張等比例縮放（font + padding + 寬度範圍）
     未填 size 時 .stick 本身即 regular，無需 :host([size="regular"]) 重複宣告 */
  :host([size="mini"]) .stick {
    font-size: 12px;
    padding: var(--pipotoy-pad-2) var(--pipotoy-pad-3);
    min-width: 60px;
    max-width: 150px;
  }
  :host([size="small"]) .stick {
    font-size: 13px;
    padding: var(--pipotoy-pad-3) var(--pipotoy-pad-4);
    min-width: 76px;
    max-width: 190px;
  }
  :host([size="big"]) .stick {
    font-size: 16px;
    padding: var(--pipotoy-pad-5) var(--pipotoy-pad-6);
    min-width: 120px;
    max-width: 300px;
  }

  /* 預設傾斜：由 JS 從 color 名稱雜湊出 ±1.5° 內角度，寫入元件內部變數（非 design token） */
  .stick {
    transform: rotate(var(--pipotoy-stick-tilt, 0deg));
  }

  /* hover：跳起來 + 反向旋轉（歪左的轉回右，歪右的轉回左）*/
  .stick:hover {
    box-shadow: var(--pipotoy-shadow-3);
    transform: translateY(-6px) rotate(calc(var(--pipotoy-stick-tilt, 0deg) * -1)) scale(1.05);
    z-index: 1;
  }

  /* tilt="off"：強制正立、不搖擺 */
  :host([tilt="off"]) .stick { transform: rotate(0deg); }
  :host([tilt="off"]) .stick:hover { transform: translateY(-6px) scale(1.05); }

  /* 圖釘：純 CSS 圓點，沒填 pin 屬性就不顯示；陰影沿用全站黏土 token */
  .pin {
    display: none;
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--pipotoy-dunkvon-blunkfo);
    box-shadow: var(--pipotoy-shadow-1);
    z-index: 1;
  }
  :host([pin]) .pin { display: block; }

  /* 鍵盤聚焦：雖然便利貼非互動元件，避免 hover-only 暗示不明確 */
  .stick:focus-visible {
    outline: 3px solid var(--pipotoy-text);
    outline-offset: 3px;
  }
`;

/* 從 color 名稱 hash 出穩定的 ±1.5° 角度（0.5° 精度）——
   同一 color 永遠傾斜同一方向，跨多張便利貼時不會整齊劃一 */
function tiltForColor(color) {
  let h = 0;
  for (let i = 0; i < color.length; i++) {
    h = (h * 31 + color.charCodeAt(i)) | 0;
  }
  const raw = ((h % 7) - 3) / 2; // -1.5 ~ 1.5
  return Math.round(raw * 2) / 2; // 四捨五入到 0.5deg
}

class PipoStick extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'tilt', 'pin'];
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
    /* 移除舊的內部節點，保留 <style> */
    const old = this.shadowRoot.querySelector('.stick');
    if (old) old.remove();

    const el = document.createElement('div');
    el.className = 'stick';
    el.setAttribute('part', 'stick');

    /* 背景色：無效 token fallback blonko */
    const color = this.getAttribute('color') || 'blonko';
    el.style.background = `var(--pipo-${color}, var(--pipo-blonko))`;

    /* 預設傾斜：tilt="off" 時跳過雜湊，強制正立 */
    if (this.getAttribute('tilt') !== 'off') {
      const deg = tiltForColor(color);
      el.style.setProperty('--pipotoy-stick-tilt', `${deg}deg`);
    } else {
      el.style.removeProperty('--pipotoy-stick-tilt');
    }

    /* 圖釘：boolean 屬性，有 pin 就顯示 */
    if (this.hasAttribute('pin')) {
      const pin = document.createElement('span');
      pin.className = 'pin';
      pin.setAttribute('part', 'pin');
      pin.setAttribute('aria-hidden', 'true');
      el.appendChild(pin);
    }

    /* 內容投影 */
    el.appendChild(document.createElement('slot'));

    this.shadowRoot.appendChild(el);
  }
}

if (!customElements.get('pipo-stick')) {
  customElements.define('pipo-stick', PipoStick);
}