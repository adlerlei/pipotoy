# `<pipo-bar>` 開發規格文件

> 設計 AI 出品 · 交 Claude Code 實作  
> 參考樣式：`site/site.css` nav 區塊（§3）

---

## 一、元件概述

```html
<!-- 最簡 -->
<pipo-bar logo="我的網站"></pipo-bar>

<!-- 完整 -->
<pipo-bar
  logo="我的品牌"
  logo-icon="🌟"
  logo-image="./logo.png"
  color="mibble"
  bar-color="dunko"
  links="首頁:/,作品集:/portfolio,關於:/about"
  cta="聯繫我"
  cta-color="glorix"
  cta-shape="pill"
  cta-anim="tilt"
  cta-href="/contact"
  cta-target="_blank"
  socials="instagram:https://ig.com/xxx,github:https://github.com/xxx"
></pipo-bar>
```

- 標籤名：`pipo-bar`
- 分類：Nav / 導覽
- 無子元素 slot（所有內容由屬性驅動）

---

## 二、屬性規格（14 個）

### Logo 群組

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `logo` | string | `""` | 品牌名稱文字 |
| `logo-icon` | string | `""` | logo 旁 emoji，有 `logo-image` 時自動隱藏 |
| `logo-image` | string | `""` | 圖片 URL，強制限高符合 bar（32px），不撐大 bar |

**logo-image 規則：**
- 圖片高度固定 32px，寬度 auto（不超過 120px）
- 有 `logo-image` 時，`logo-icon` 不渲染
- `logo` 文字仍顯示於圖片右側（除非 `logo` 為空）
- 圖片載入失敗時靜默降級，顯示 `logo-icon` 或 `logo` 首字母圓圈

### Nav 群組

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `color` | string | `"mibble"` | 強調色 token，對應 `--pipo-{color}`，用於 active link / hover 背景 / logo icon 背景 |
| `bar-color` | string | `""` | Bar 背景色 token；空白 = 霧面白玻璃（`rgba(248,248,244,0.85)` + backdrop-filter） |
| `links` | string | `""` | 逗號分隔，格式 `"Label:URL"`；無 `:URL` 時 href 預設 `#` |

**links 解析規則：**
```
"首頁:/,關於:/about,聯繫:/contact"
→ [{ label: "首頁", href: "/" }, { label: "關於", href: "/about" }, ...]

"首頁,關於,聯繫"
→ [{ label: "首頁", href: "#" }, { label: "關於", href: "#" }, ...]
```

### CTA 群組

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `cta` | string | `""` | CTA 按鈕文字，空白時不渲染 CTA |
| `cta-color` | string | 繼承 `color` | 按鈕顏色 token，對應 `--pipo-{cta-color}` |
| `cta-shape` | string | `"pill"` | `pill` / `square` |
| `cta-anim` | string | `"float"` | `float` / `tilt`（與 pipo-tap 相同定義） |
| `cta-href` | string | `""` | 按鈕跳轉 URL |
| `cta-target` | string | `"_self"` | `_self` / `_blank`；`_blank` 時自動加 `rel="noopener noreferrer"` |

### Socials 群組

| 屬性 | 型別 | 預設值 | 說明 |
|------|------|--------|------|
| `socials` | string | `""` | 逗號分隔，格式 `"platform:URL"`，空白時不渲染 |

**支援平台（7 個，SVG 路徑內嵌於元件 JS）：**

| platform 名稱 | 對應品牌 |
|--------------|---------|
| `facebook` | Facebook |
| `instagram` | Instagram |
| `x` | X (Twitter) |
| `github` | GitHub |
| `youtube` | YouTube |
| `tiktok` | TikTok |
| `linkedin` | LinkedIn |

**不認識的 platform 名稱 → 靜默忽略，不報錯**

SVG 路徑來源：Simple Icons（[simpleicons.org](https://simpleicons.org)），MIT License，可直接複製 path data 內嵌。

---

## 三、視覺規格

### Bar 本體

```
position: fixed
top: 16px
left: 50%
transform: translateX(-50%)
z-index: 100
width: calc(100% - 40px)
max-width: 900px
height: 52px
padding: 0 20px
display: flex
align-items: center
border: 1px solid var(--pipotoy-line)
border-radius: var(--pipotoy-round-pill)
box-shadow: var(--pipotoy-shadow-2)
```

**`bar-color` 為空（預設）：**
```
background: rgba(248, 248, 244, 0.85)
backdrop-filter: blur(16px)
-webkit-backdrop-filter: blur(16px)
```

**`bar-color` 有值（如 `bar-color="dunko"`）：**
```
background: var(--pipo-{bar-color})
backdrop-filter: none        ← 有實色不需要毛玻璃
```

**深色 bar 自動文字切換規則：**
元件 JS 讀取 `--pipo-{bar-color}` 的亮度（luminance）：
- luminance < 0.35 → 文字色、icon 色、link 色改為 `rgba(255,255,255,0.9)`
- luminance ≥ 0.35 → 維持 `var(--pipotoy-text)` / `var(--pipotoy-muted)`

### Logo 區（左側）

```
display: flex
align-items: center
gap: 8px
margin-right: auto
text-decoration: none
color: var(--pipotoy-text)
font-size: 18px
font-weight: 900
letter-spacing: -0.02em
```

**Logo icon 小圓塊（無 logo-image 時）：**
```
width: 28px
height: 28px
border-radius: 9px
background: var(--pipo-{color})
box-shadow: var(--pipotoy-shadow-1)
display: flex / align-items: center / justify-content: center
font-size: 15px
```

**Logo image（有 logo-image 時）：**
```
height: 32px
width: auto
max-width: 120px
object-fit: contain
border-radius: 6px
```

### 導覽連結

```
font-size: 13px
font-weight: 600
color: var(--pipotoy-muted)
padding: 6px 12px
border-radius: var(--pipotoy-round-pill)
text-decoration: none
transition: background var(--pipotoy-ease), color var(--pipotoy-ease)
```

**Hover：**
```
background: var(--pipotoy-surface-2)
color: var(--pipotoy-text)
```

**Active（當前頁）：**
```
background: var(--pipo-{color})
color: var(--pipotoy-text)
box-shadow: var(--pipotoy-shadow-1)
```

Active 判斷：link href 與 `window.location.pathname` 完全匹配時標記。

### CTA 按鈕

視覺與行為完全對齊 `pipo-tap` 規格：
- 背景色：`--pipo-{cta-color}`
- 陰影三狀態：`shadow-2` → `shadow-3` → `shadow-press`
- `float`：hover `translateY(-3px)`；`tilt`：hover `rotate(-5deg)`
- Pressed：縮放 + 陰影內凹
- 字級：13px，font-weight: 700
- margin-left: 8px

### Social icons

```
width: 16px
height: 16px
opacity: 0.55
position: relative
transition: opacity var(--pipotoy-ease), transform var(--pipotoy-ease)
```

**Hover：**
```
opacity: 1
transform: scale(1.15)
```

icons 之間 gap: 8px，整體 margin-left: 8px（與 links / CTA 區隔）。

**Tooltip（CSS only，非瀏覽器原生）：**

每個 social icon 連結加 `data-tip="{平台顯示名稱}"` attr，由元件自動寫入：

| platform | data-tip 值 |
|----------|------------|
| facebook | Facebook |
| instagram | Instagram |
| x | X |
| github | GitHub |
| youtube | YouTube |
| tiktok | TikTok |
| linkedin | LinkedIn |

Tooltip 樣式（CSS `::after`）：
```
content: attr(data-tip)
position: absolute
top: calc(100% + 8px)
left: 50%
transform: translateX(-50%) translateY(-4px)
background: var(--pipotoy-text)
color: #fff
font-size: 11px
font-weight: 600
font-family: var(--pipotoy-font-sans)
padding: 4px 10px
border-radius: var(--pipotoy-round-pill)
white-space: nowrap
pointer-events: none
opacity: 0
transition: opacity 150ms ease, transform 150ms ease
z-index: 200
```

**Hover 時：**
```
opacity: 1
transform: translateX(-50%) translateY(0)
```

---

## 四、手機響應式（≤ 720px）

- Hamburger 按鈕顯示，logo 正常顯示
- `links` / `socials` / `cta` 收進下拉選單
- 下拉選單：純 CSS `<input type="checkbox">` + `<label>` 控制，無需 JS
- 下拉選單樣式：
  ```
  position: absolute
  top: calc(100% + 10px)
  left: 0 / right: 0
  background: rgba(248, 248, 244, 0.97)
  backdrop-filter: blur(16px)
  border: 1px solid var(--pipotoy-line)
  border-radius: var(--pipotoy-round-lg)
  box-shadow: var(--pipotoy-shadow-3)
  padding: 10px
  ```
- 展開動畫：`opacity 0→1` + `translateY(-8px)→0` + `scale(0.98)→1`，使用 `var(--pipotoy-spring)`
- 手機 links 每項：全寬，padding 11px 16px，border-radius: `var(--pipotoy-round)`
- 手機 social icons：顯示於清單底部，橫排，置中

---

## 五、Fallback 規則

| 情況 | 處理 |
|------|------|
| `color` 無效 token | fallback `mibble` |
| `bar-color` 無效 token | fallback 霧面白玻璃效果 |
| `bar-color` 為空 | 霧面白玻璃（預設） |
| `cta-color` 無效 token | 繼承 `color` |
| `logo-image` 載入失敗 | 顯示 `logo-icon`；無 `logo-icon` 時顯示 `logo` 首字母圓圈（背景 `--pipo-{color}`） |
| `socials` 不認識的 platform | 靜默忽略 |
| `links` 缺少 `:URL` | href 設為 `#` |
| `cta` 為空 | 不渲染 CTA 區域 |
| `socials` 為空 | 不渲染 socials 區域 |

---

## 六、CSS Token 引用清單

```
--pipo-{color}           logo icon 背景 / active link 背景 / cta 預設色
--pipo-{bar-color}       bar 背景色（有值時覆蓋霧面白）
--pipotoy-text           主文字色（亮色 bar）
--pipotoy-muted          nav link 預設色（亮色 bar）
--pipotoy-surface-2      nav link hover 背景
--pipotoy-line           border 色
--pipotoy-bg             下拉選單背景（不透明版）
--pipotoy-font-sans      字族
--pipotoy-round-pill     bar / link / CTA / tooltip 圓角
--pipotoy-round-lg       下拉選單圓角
--pipotoy-round          手機 link item 圓角
--pipotoy-shadow-1       logo icon 陰影 / active link 陰影
--pipotoy-shadow-2       bar 陰影 / CTA default
--pipotoy-shadow-3       CTA hover / 下拉選單陰影
--pipotoy-shadow-press   CTA pressed
--pipotoy-ease           顏色 / opacity 過渡
--pipotoy-spring         CTA hover / 下拉展開動畫
```

---

## 七、驗收條件

- [ ] 所有 14 個屬性可動態更新（setAttribute 後即時反映）
- [ ] `logo-image` 有值時：圖片高度固定 32px，不撐大 bar；`logo-icon` 隱藏
- [ ] `logo-image` 載入失敗時：正確 fallback 至 logo-icon 或首字母圓圈
- [ ] `links` 格式 `Label:URL` 與 `Label` 均正確解析
- [ ] Active link 判斷：與 pathname 匹配時套用強調色
- [ ] CTA 為空時不渲染 CTA 區域
- [ ] CTA float / tilt 動畫與 pipo-tap 一致
- [ ] `cta-target="_blank"` 自動加 `rel="noopener noreferrer"`
- [ ] `socials` 7 個支援平台均正確顯示 SVG icon
- [ ] Social icon hover tooltip：CSS only，非瀏覽器原生，正確顯示平台名稱
- [ ] 不認識的 platform 靜默忽略，不報錯
- [ ] `bar-color` 有值時：背景換色，backdrop-filter 移除
- [ ] `bar-color` 深色時（luminance < 0.35）：文字 / icon 自動切換為白色
- [ ] `bar-color` 無效 token → fallback 霧面白，不報錯
- [ ] 手機（≤720px）：hamburger 顯示，pure CSS 展開選單正常運作
- [ ] 無效 color token → fallback，不報錯、不空白