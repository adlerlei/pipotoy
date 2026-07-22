/* =========================================================
   PipoToy · pipo-navbar
   規格：pipo-navbar-spec.md
   - Nav / 導覽：膠囊懸浮頂端導覽列
   - HTML-First：所有內容由屬性驅動，無 slot
   - 手機 ≤720px：pure CSS hamburger（checkbox + label）
   ========================================================= */

const _BAR_SOCIAL = {
  facebook:  'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  x:         'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  github:    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  youtube:   'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  tiktok:    'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  linkedin:  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};

/* social platform → 顯示名稱（tooltip data-tip 用） */
const _BAR_SOCIAL_NAME = {
  facebook: 'Facebook', instagram: 'Instagram', x: 'X', github: 'GitHub',
  youtube: 'YouTube', tiktok: 'TikTok', linkedin: 'LinkedIn'
};

function _bH(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function _bA(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;'); }
/* color token 消毒：只留合法字元，避免注入進 CSS var 名稱 / inline style */
function _bTok(s) { return String(s || '').replace(/[^a-z0-9-]/gi, ''); }

/* 將 rgb(...) 字串換算為相對亮度（WCAG, 0–1） */
function _bLuminance(rgbStr) {
  const m = String(rgbStr).match(/[\d.]+/g);
  if (!m || m.length < 3) return 1;
  const [r, g, b] = m.slice(0, 3).map(Number).map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function _bParseLinks(str) {
  if (!str) return [];
  return str.split(',').filter(s => s.trim()).map(item => {
    const t = item.trim(), i = t.indexOf(':');
    if (i === -1) return { label: t, href: '#' };
    return { label: t.slice(0, i).trim(), href: t.slice(i + 1).trim() || '#' };
  }).filter(l => l.label);
}

function _bParseSocials(str) {
  if (!str) return [];
  return str.split(',').filter(s => s.trim()).map(item => {
    const t = item.trim(), i = t.indexOf(':');
    if (i === -1) return null;
    const platform = t.slice(0, i).trim().toLowerCase();
    const url = t.slice(i + 1).trim();
    return (_BAR_SOCIAL[platform] && url) ? { platform, url } : null;
  }).filter(Boolean);
}

const BAR_STYLE = `
  :host { display: block; }

  /* ── Bar 本體 ── */
  .bar {
    position: fixed;
    top: 16px; left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    width: calc(100% - 40px);
    max-width: 900px;
    height: 52px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background: rgba(248,248,244,0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--pipotoy-line);
    border-radius: var(--pipotoy-round-pill);
    box-shadow: var(--pipotoy-shadow-2);
    font-family: var(--pipotoy-font-sans);
    box-sizing: border-box;
  }

  /* ── Logo ── */
  .logo {
    display: flex; align-items: center; gap: 8px;
    margin-right: auto;
    text-decoration: none; color: var(--bar-text, var(--pipotoy-text));
    font-size: 18px; font-weight: 900; letter-spacing: -0.02em;
    flex-shrink: 0;
  }
  .logo-icon {
    width: 28px; height: 28px; border-radius: 9px;
    box-shadow: var(--pipotoy-shadow-1);
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; flex-shrink: 0;
  }
  .logo-img {
    height: 32px; width: auto; max-width: 120px;
    object-fit: contain; border-radius: 6px;
  }

  /* ── Desktop 行 ── */
  .bar-desktop { display: flex; align-items: center; }

  /* ── Nav links ── */
  .nav-link {
    font-size: 13px; font-weight: 600;
    color: var(--bar-link, var(--pipotoy-muted));
    padding: 6px 12px;
    border-radius: var(--pipotoy-round-pill);
    text-decoration: none;
    transition: background var(--pipotoy-ease), color var(--pipotoy-ease);
    white-space: nowrap;
  }
  .nav-link:hover { background: var(--pipotoy-surface-2); color: var(--pipotoy-text); }
  .nav-link.is-active { color: var(--pipotoy-text); box-shadow: var(--pipotoy-shadow-1); }

  /* ── Socials ── */
  .socials { display: flex; align-items: center; gap: 8px; margin-left: 8px; }
  .social-link {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    color: var(--bar-text, var(--pipotoy-text)); text-decoration: none; opacity: 0.55;
    transition: opacity var(--pipotoy-ease);
  }
  .social-link:hover { opacity: 1; }
  .social-svg {
    width: 16px; height: 16px; fill: currentColor; display: block;
    transition: transform var(--pipotoy-ease);
  }
  .social-link:hover .social-svg { transform: scale(1.15); }

  /* social tooltip（純 CSS ::after，非瀏覽器原生 title） */
  .social-link::after {
    content: attr(data-tip);
    position: absolute;
    top: calc(100% + 8px); left: 50%;
    transform: translateX(-50%) translateY(-4px);
    background: var(--pipotoy-text); color: #fff;
    font-size: 11px; font-weight: 600; font-family: var(--pipotoy-font-sans);
    padding: 4px 10px;
    border-radius: var(--pipotoy-round-pill);
    white-space: nowrap; pointer-events: none;
    opacity: 0;
    transition: opacity 150ms ease, transform 150ms ease;
    z-index: 200;
  }
  .social-link:hover::after { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* ── CTA ── */
  .cta {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: var(--pipotoy-font-sans);
    font-size: 13px; font-weight: 700;
    color: var(--pipotoy-text);
    text-decoration: none; border: none; cursor: pointer;
    user-select: none; -webkit-user-select: none;
    padding: 7px 16px;
    border-radius: var(--pipotoy-round-pill);
    box-shadow: var(--pipotoy-shadow-2);
    margin-left: 8px;
    transition: transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring);
    white-space: nowrap; box-sizing: border-box;
  }
  .cta.shape-rounded { border-radius: var(--pipotoy-round-sm); }
  .cta:hover { box-shadow: var(--pipotoy-shadow-3); transform: translateY(-3px); }
  .cta.anim-tilt { transform-origin: center bottom; }
  .cta.anim-tilt:hover { transform: rotate(-5deg) translateY(-2px); }
  .cta:active {
    box-shadow: var(--pipotoy-shadow-press);
    transform: translateY(2px) scale(0.97);
    transition: transform 80ms ease, box-shadow 80ms ease;
  }
  .cta.anim-tilt:active { transform: rotate(-5deg) translateY(2px) scale(0.97); }
  .cta:focus-visible { outline: 3px solid var(--pipotoy-text); outline-offset: 3px; }

  /* ── Hamburger ── */
  .bar-toggle { display: none; }
  .bar-burger {
    display: none;
    flex-direction: column; justify-content: center; gap: 5px;
    width: 32px; height: 32px;
    cursor: pointer; margin-left: 8px; flex-shrink: 0;
  }
  .bar-burger span {
    display: block; width: 20px; height: 2px;
    background: var(--bar-text, var(--pipotoy-text)); border-radius: 2px;
    transition: transform var(--pipotoy-ease), opacity var(--pipotoy-ease);
    margin: 0 auto;
  }
  .bar-toggle:checked ~ .bar-burger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .bar-toggle:checked ~ .bar-burger span:nth-child(2) { opacity: 0; }
  .bar-toggle:checked ~ .bar-burger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── 手機下拉選單 ── */
  .bar-dropdown {
    position: absolute;
    top: calc(100% + 10px); left: 0; right: 0;
    background: rgba(248,248,244,0.97);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--pipotoy-line);
    border-radius: var(--pipotoy-round-lg);
    box-shadow: var(--pipotoy-shadow-3);
    padding: 10px;
    display: none; flex-direction: column; gap: 2px;
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
    transition: opacity var(--pipotoy-spring), transform var(--pipotoy-spring);
    pointer-events: none;
  }
  .bar-toggle:checked ~ .bar-dropdown {
    opacity: 1; transform: none; pointer-events: auto;
  }

  /* ── 手機連結項目 ── */
  .mob-link {
    display: block; width: 100%;
    font-size: 14px; font-weight: 600;
    color: var(--pipotoy-muted);
    padding: 11px 16px;
    border-radius: var(--pipotoy-round);
    text-decoration: none;
    transition: background var(--pipotoy-ease), color var(--pipotoy-ease);
    box-sizing: border-box;
  }
  .mob-link:hover { background: var(--pipotoy-surface-2); color: var(--pipotoy-text); }
  .mob-link.is-active { color: var(--pipotoy-text); box-shadow: var(--pipotoy-shadow-1); }

  /* 下拉選單恆為淺色面板：social icon 重置回深色（不吃 bar 的 --bar-text） */
  .mob-socials { display: flex; justify-content: center; gap: 16px; padding: 10px 16px 4px; }
  .mob-socials .social-link { color: var(--pipotoy-text); }
  .mob-cta { margin: 4px 0 0; margin-left: 0; width: 100%; justify-content: center; }

  /* ── RWD ── */
  @media (max-width: 720px) {
    .bar-desktop { display: none; }
    .bar-burger { display: flex; }
    .bar-dropdown { display: flex; }
  }

  /* ── Demo 模式（教學頁用，改為 relative 定位） ── */
  /* host 自成 stacking context（z-index:0），開選單時由 JS 提升到 50，
     避免堆疊的多個 demo bar 互相遮住下拉選單 */
  :host([demo]) { position: relative; z-index: 0; }
  :host([demo]) .bar {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

class PipoNavbar extends HTMLElement {
  static get observedAttributes() {
    return ['logo', 'logo-icon', 'logo-image', 'color', 'bar-color', 'links',
            'cta', 'cta-color', 'cta-shape', 'cta-anim', 'cta-href', 'cta-target', 'socials'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this._styled) {
      this.shadowRoot.innerHTML = `<style>${BAR_STYLE}</style>`;
      /* demo 模式：攔截所有 <a> 點擊，避免教學頁示範時真的跳頁 / 開新分頁。
         漢堡選單是 label→checkbox（非 <a>），不受影響，仍可開合。 */
      this.shadowRoot.addEventListener('click', (e) => {
        if (this.hasAttribute('demo') && e.target.closest('a')) e.preventDefault();
      });
      this._styled = true;
    }
    this._render();
  }

  attributeChangedCallback(name, old, val) {
    if (old === val) return;
    if (this.isConnected) this._render();
  }

  _socialSvg(platform) {
    return `<svg class="social-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${_BAR_SOCIAL[platform]}"/></svg>`;
  }

  _socialLink(s) {
    const name = _BAR_SOCIAL_NAME[s.platform] || s.platform;
    return `<a class="social-link" href="${_bA(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${_bA(name)}" data-tip="${_bA(name)}">${this._socialSvg(s.platform)}</a>`;
  }

  /* 解析 --pipo-{token} 為實際 rgb(...)；無效 token → 'rgba(0, 0, 0, 0)' */
  _resolveColor(token) {
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:-9999px;visibility:hidden';
    probe.style.color = `var(--pipo-${token}, rgba(0,0,0,0))`;
    this.shadowRoot.appendChild(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  }

  _ctaHtml(cta, ctaColorVar, ctaShape, ctaAnim, ctaHref, ctaTarget, extraClass) {
    const shapeC = ctaShape === 'rounded' ? ' shape-rounded' : '';
    const animC  = ctaAnim  === 'tilt'   ? ' anim-tilt'   : '';
    const cls    = `cta${shapeC}${animC}${extraClass ? ' ' + extraClass : ''}`;
    const style  = `background:${ctaColorVar}`;
    if (ctaHref) {
      const rel = ctaTarget === '_blank' ? ' rel="noopener noreferrer"' : '';
      const tgt = ctaTarget !== '_self'  ? ` target="${_bA(ctaTarget)}"` : '';
      return `<a class="${cls}" href="${_bA(ctaHref)}"${tgt}${rel} style="${style}">${_bH(cta)}</a>`;
    }
    return `<button class="${cls}" type="button" style="${style}">${_bH(cta)}</button>`;
  }

  _render() {
    const color     = _bTok(this.getAttribute('color')) || 'mibble';
    const barColor  = _bTok(this.getAttribute('bar-color'));
    const logo      = this.getAttribute('logo')       || '';
    const logoIcon  = this.getAttribute('logo-icon')  || '';
    const logoImage = this.getAttribute('logo-image') || '';
    const links     = _bParseLinks(this.getAttribute('links'));
    const cta       = this.getAttribute('cta')        || '';
    const ctaColor  = _bTok(this.getAttribute('cta-color')) || color;
    const ctaShape  = this.getAttribute('cta-shape')  || 'pill';
    const ctaAnim   = this.getAttribute('cta-anim')   || 'float';
    const ctaHref   = this.getAttribute('cta-href')   || '';
    const ctaTarget = this.getAttribute('cta-target') || '_self';
    const socials   = _bParseSocials(this.getAttribute('socials'));

    const pathname    = window.location.pathname;
    const colorVar    = `var(--pipo-${color}, var(--pipo-mibble))`;
    const ctaColorVar = `var(--pipo-${ctaColor}, ${colorVar})`;

    /* ── Logo left block ── */
    let logoIconHtml = '';
    if (logoImage) {
      const fbIcon = logoIcon || (logo ? logo.charAt(0).toUpperCase() : '?');
      logoIconHtml = `<img class="logo-img" src="${_bA(logoImage)}" alt="" data-fb-icon="${_bA(fbIcon)}" data-fb-color="${_bA(color)}">`;
    } else if (logoIcon) {
      logoIconHtml = `<span class="logo-icon" style="background:${colorVar}">${logoIcon}</span>`;
    } else if (logo) {
      logoIconHtml = `<span class="logo-icon" style="background:${colorVar}">${_bH(logo.charAt(0).toUpperCase())}</span>`;
    }
    const logoTextHtml = logo ? `<span>${_bH(logo)}</span>` : '';

    /* ── Desktop nav links ── */
    const linksHtml = links.map(l => {
      const act = l.href === pathname;
      const actStyle = act ? ` style="background:${colorVar}"` : '';
      return `<a class="nav-link${act ? ' is-active' : ''}" href="${_bA(l.href)}"${actStyle}>${_bH(l.label)}</a>`;
    }).join('');

    /* ── Desktop socials ── */
    const socialsHtml = socials.length
      ? `<div class="socials">${socials.map(s => this._socialLink(s)).join('')}</div>`
      : '';

    /* ── Desktop CTA ── */
    const ctaDesktop = cta ? this._ctaHtml(cta, ctaColorVar, ctaShape, ctaAnim, ctaHref, ctaTarget, '') : '';

    /* ── Mobile dropdown links ── */
    const mobLinksHtml = links.map(l => {
      const act = l.href === pathname;
      const actStyle = act ? ` style="background:${colorVar}"` : '';
      return `<a class="mob-link${act ? ' is-active' : ''}" href="${_bA(l.href)}"${actStyle}>${_bH(l.label)}</a>`;
    }).join('');

    /* ── Mobile dropdown CTA ── */
    const mobCtaHtml = cta ? this._ctaHtml(cta, ctaColorVar, ctaShape, ctaAnim, ctaHref, ctaTarget, 'mob-cta') : '';

    /* ── Mobile dropdown socials ── */
    const mobSocialsHtml = socials.length
      ? `<div class="mob-socials">${socials.map(s => this._socialLink(s)).join('')}</div>`
      : '';

    /* ── Rebuild bar ── */
    const old = this.shadowRoot.querySelector('.bar');
    if (old) old.remove();

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.innerHTML = `
      <a class="logo" href="/">${logoIconHtml}${logoTextHtml}</a>
      <div class="bar-desktop">${linksHtml}${socialsHtml}${ctaDesktop}</div>
      <input type="checkbox" id="bar-toggle" class="bar-toggle">
      <label for="bar-toggle" class="bar-burger" aria-label="開關選單 Toggle menu">
        <span></span><span></span><span></span>
      </label>
      <div class="bar-dropdown">${mobLinksHtml}${mobCtaHtml}${mobSocialsHtml}</div>
    `;
    this.shadowRoot.appendChild(bar);

    /* ── bar-color：實色背景 + 深色自動白字 ── */
    if (barColor) {
      const resolved = this._resolveColor(barColor);
      const valid = resolved && resolved !== 'rgba(0, 0, 0, 0)';
      if (valid) {
        bar.style.background = `var(--pipo-${barColor})`;
        bar.style.backdropFilter = 'none';
        bar.style.webkitBackdropFilter = 'none';
        if (_bLuminance(resolved) < 0.35) {
          bar.style.setProperty('--bar-text', 'rgba(255,255,255,0.9)');
          bar.style.setProperty('--bar-link', 'rgba(255,255,255,0.9)');
        }
      }
      /* 無效 token → 不動，維持霧面白玻璃（CSS 預設） */
    }

    /* demo 模式：選單開啟時提升 host 層級，蓋過下方堆疊的 demo bar */
    if (this.hasAttribute('demo')) {
      const toggle = bar.querySelector('.bar-toggle');
      if (toggle) {
        toggle.addEventListener('change', () => {
          this.style.zIndex = toggle.checked ? '50' : '';
        });
      }
    }

    /* logo-image 載入失敗 fallback */
    const img = bar.querySelector('.logo-img');
    if (img) {
      img.onerror = () => {
        const fbColor = img.dataset.fbColor || 'mibble';
        const span = document.createElement('span');
        span.className = 'logo-icon';
        span.style.background = `var(--pipo-${fbColor}, var(--pipo-mibble))`;
        span.textContent = img.dataset.fbIcon || '?';
        img.replaceWith(span);
      };
    }
  }
}

if (!customElements.get('pipo-navbar')) {
  customElements.define('pipo-navbar', PipoNavbar);
}
