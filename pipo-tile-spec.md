# pipo-tile · 開發規格文件

> 元件定位：**資訊卡片**（Content）—— 圖配字的方塊卡，部落格、商品、什麼都能放。
> 版本：v0.1.0（spec）
> 目標讀者：Claude Code（負責 Web Component JS 實作）
> 設計側交付：HTML 結構草案 + CSS token 規範 + 屬性行為表。**JS 實作由 Claude Code 完成。**

---

## 1. 一句話

一張可點的內容方塊：上圖、下標題、下內文，底部可選放一顆按鈕。
什麼屬性都不填，也是一張乾淨的近白卡片。

```html
<pipo-tile
  image="cat.jpg"
  title="一隻貓"
  text="牠很可愛。"
  href="/cat"
></pipo-tile>
```

---

## 2. 屬性表（共 6 個，全部可選）

| 屬性 | 做什麼 | 型別 / 可填值 | 不填的話（預設） |
|------|--------|--------------|------------------|
| `color` | 卡片底色（Pipo token 名） | 任何 Pipo 顏色名（`mibble` / `wibble` …） | `"whibble"`（近白） |
| `image` | 頂部圖片 URL | URL 字串 | `""` → 不顯示圖片區 |
| `title` | 卡片標題 | 純文字 | `""` → 不顯示標題列 |
| `text` | 卡片內文 | 純文字 | `""` → 不顯示內文列 |
| `href` | 整張卡變連結、hover 浮起 | URL 字串 | `""` → 靜態 `<article>` |
| `target` | 連結是否開新分頁 | `"blank"` | `""` → 同頁開啟 |

`observedAttributes`：`['color', 'image', 'title', 'text', 'href', 'target']`

---

## 3. 預設插槽（CTA）

title / text 用屬性；**標籤內部保留一個 default `<slot>`**，給進階用戶放 CTA（通常是 `<pipo-button>`）。
不放任何東西 → slot 區完全不佔空間、不顯示。

```html
<pipo-tile title="方案 A" text="說明文字">
  <pipo-button color="mibble">選這個</pipo-button>
</pipo-tile>
```

---

## 4. HTML 結構草案（Shadow DOM template）

> 這是視覺結構草案，請 Claude Code 據此建立 shadow template。
> **不要**把 `customElements.define()`、class 實作寫進這份草案。

```html
<article class="tile">
  <!-- 連結模式：有 href 時，外層改用 <a> 包整張卡；無 href 則維持 <article> 不含 <a> -->

  <!-- 圖片區（image 為空時，這整塊不渲染） -->
  <div class="tile-media">
    <img class="tile-img" part="img" alt="">
  </div>

  <!-- 內容區 -->
  <div class="tile-body">
    <h3 class="tile-title" part="title"></h3>   <!-- title 為空時不渲染 -->
    <p  class="tile-text"  part="text"></p>      <!-- text 為空時不渲染 -->
    <div class="tile-extra">
      <slot></slot>                               <!-- 空 slot 時 tile-extra 自動收合 -->
    </div>
  </div>
</article>
```

**結構規則**

- 有 `href` → 用 `<a class="tile" href="...">` 取代 `<article class="tile">`，整張卡可點。
  - `target="blank"` → 在 `<a>` 上加 `target="_blank"` 並自動補 `rel="noopener noreferrer"`。
  - 與 `pipo-button` 行為一致。
- `image` 為空 → **不要**渲染 `.tile-media`（不要留空白方塊）。
- `title` / `text` 為空 → 各自不渲染對應節點。
- slot 沒有 assigned nodes → `.tile-extra` 不佔空間（`:has` 或 JS 判斷皆可，見第 6 節）。
- `<img>` 的 `alt`：若有 `title` 用 `title` 當 alt，否則空字串 `alt=""`。

---

## 5. CSS Token 規範

> **嚴格規則：禁止寫色碼。** 顏色、圓角、陰影、動畫一律引用 `pipotoy-tokens.css` 變數。

### 卡片外殼 `.tile`

| 屬性 | 值（引用 token） |
|------|------------------|
| `background` | `var(--pipo-{color}, var(--pipotoy-blobia-whibble))` ← 見下方 fallback 說明 |
| `border-radius` | `var(--pipotoy-round-lg)`（24px） |
| `box-shadow` | `var(--pipotoy-shadow-2)` |
| `overflow` | `hidden`（讓圖片上緣跟著圓角裁切） |
| `color` | `var(--pipotoy-text)` |
| `font-family` | `var(--pipotoy-font-sans)`（繼承自 pipo-page 也可） |
| `transition` | `transform var(--pipotoy-spring), box-shadow var(--pipotoy-spring)` |
| `display` | `flex; flex-direction: column;` |

### 顏色 fallback（錯了不壞）

底色用 **CSS 變數鏈** 自帶安全網，不存在的 token 自動退回 whibble：

```css
.tile {
  background: var(--pipo-_resolved, var(--pipotoy-blobia-whibble));
}
```

實作建議：JS 把 `color` 值組成 `--pipo-${color}`，用 `getComputedStyle` 驗證是否存在；
存在 → set `--pipo-_resolved: var(--pipo-${color})`；不存在 → 不 set（自動落到 whibble fallback）。
（與 `pipo-button` 的 fallback 思路一致，差別只是 button 退回 `blonko`、tile 退回 `whibble`。）

### 圖片區 `.tile-media` / `.tile-img`

| 屬性 | 值 |
|------|----|
| `.tile-img` `aspect-ratio` | `16 / 9` |
| `.tile-img` `width` | `100%` |
| `.tile-img` `object-fit` | `cover` |
| `.tile-img` `object-position` | `center` |
| `.tile-img` `display` | `block` |

### 內容區 `.tile-body`

| 屬性 | 值（引用 token） |
|------|------------------|
| `padding` | `var(--pipotoy-pad-5)`（24px） |
| `display` | `flex; flex-direction: column;` |
| `gap` | `var(--pipotoy-pad-2)`（8px） |

### 標題 `.tile-title`

| 屬性 | 值 |
|------|----|
| `font-size` | `var(--pipotoy-font-5)`（15px）※見備註 |
| `font-weight` | `800` |
| `color` | `var(--pipotoy-text)` |
| `margin` | `0` |

### 內文 `.tile-text`

| 屬性 | 值 |
|------|----|
| `font-size` | `var(--pipotoy-font-3)`（13px） |
| `font-weight` | `500` |
| `color` | `var(--pipotoy-muted)` |
| `line-height` | `1.6` |
| `margin` | `0` |

### CTA 區 `.tile-extra`

| 屬性 | 值 |
|------|----|
| `margin-top` | `var(--pipotoy-pad-4)`（16px）—— 僅在 slot 有內容時生效 |

---

## 6. 互動行為

### Hover（僅 `href` 存在時）

| 屬性 | 值 |
|------|----|
| `transform` | `translateY(-6px)` |
| `box-shadow` | `var(--pipotoy-shadow-3)` |

> 與 `components.html` 卡片 hover 慣例一致。無 `href` 的靜態卡片**不浮起**。

### 連結重置

```css
a.tile { color: inherit; text-decoration: none; }
```

### 空 slot 收合（CTA 不放東西時）

優先用 CSS（若支援）：

```css
.tile-extra { display: none; }
.tile-extra:has(::slotted(*)) { display: block; margin-top: var(--pipotoy-pad-4); }
```

`:has` + `::slotted` 在部分舊瀏覽器不穩 → Claude Code 可改用 `slotchange` 事件 JS 判斷 assigned nodes 來 toggle，擇一即可。

---

## 7. Fallback 總表（錯了不會壞掉）

| 情境 | 結果 |
|------|------|
| `color` 填不存在的 token | 安靜退回 `whibble`，不空白、不報錯 |
| `image` 為空 | 不渲染圖片區，純文字卡照樣好看 |
| `image` URL 失效 | 瀏覽器顯示破圖 alt；建議 Claude Code 監聽 `img.onerror` → 隱藏 `.tile-media`（加分項，非必須） |
| `title` / `text` 皆空且 slot 空 | 仍是合法卡片（可能只剩圖片或一塊留白卡），不破版 |
| `target` 填了但無 `href` | `target` 無效，靜默忽略 |
| 什麼都不填 `<pipo-tile></pipo-tile>` | 一張 `whibble` 近白、圓角、帶陰影的空卡片 |

---

## 8. 不做（v1 範圍外）

- ❌ `flip` 橫式卡（圖在左）—— v1 只做圖在上，之後版本再加。
- ❌ `image-fit` / `image-align` —— 一律 `cover` + `center`，不開屬性。
- ❌ 圓角 / 陰影 / 內距 的自訂屬性 —— 全由 token 固定，用戶不碰。

---

## 9. 備註：字級 token 缺口（待你決定，不阻塞 v1）

現有 type scale 為 `--pipotoy-font-1/3/5/7` = 11 / 13 / 15 / 32px。
缺一個「卡片標題級」的中間字級（約 18–20px）。
v1 先用 `font-5`（15px）粗體當標題，可運作。
若日後想讓標題更醒目，建議在 `tokens.css` 新增 `--pipotoy-font-6: 18px`（屬於 token 變更，需另開決策）。

---

## 10. 交付清單（給 Claude Code）

1. `src/components/pipo-tile.js` —— 依本規格實作 Web Component（含 shadow template、observedAttributes、attributeChangedCallback、href/target 邏輯、color fallback、空 slot 收合）。
2. `src/pipotoy.js` —— 註冊 `pipo-tile`。
3. `site/examples/components.html` —— 將 `pipo-tile` 卡片由 Coming Soon 啟用為可點連結（連向教學頁）。
4. `CHANGELOG.md` —— 新增版本區塊。

> 教學頁 `site/examples/pipo-tile.html` 由設計側（我）另出視覺稿與規格，不在本文件範圍。
