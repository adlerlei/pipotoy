# Changelog · PipoToy

所有重要更新都記錄在這裡。
*All notable changes to this project are documented here.*

格式參考 [Keep a Changelog](https://keepachangelog.com)。

---

## [0.1.7-alpha] · 2026-06-15

### 新增 · Added
- **`pipo-tap` Web Component**
  *`pipo-tap` Web Component*
  - 黏土感互動按鈕，9 個屬性：`color` / `size` / `shape` / `anim` / `full` / `href` / `target` / `disabled` / `type`
  - *Clay-feel action button with 9 attributes*
  - 有 `href` → 渲染真正的 `<a>`；無 → 渲染 `<button>`（含 `type` 支援）
  - *With `href` renders a real `<a>`; otherwise a `<button>` (with `type` support)*
  - `target="blank"` → 連結開新分頁，自動補 `rel="noopener noreferrer"`
  - *`target="blank"` opens the link in a new tab, auto-adding `rel="noopener noreferrer"`*
  - 兩種 hover 動畫 `float` / `tilt`，pressed 帶彈簧壓扁（tilt 按住保持傾斜）
  - *Two hover animations `float` / `tilt`, springy squish on press (tilt stays tilted while held)*
  - `full` 滿版時強制 `square`；無效 color token 安靜 fallback `blonko`；`disabled` 加 `aria-disabled`
  - *`full` forces `square`; invalid color falls back to `blonko`; `disabled` adds `aria-disabled`*
- **`site/examples/pipo-tap.html` 元件教學頁**
  *`site/examples/pipo-tap.html` teaching page*
  - 雙語 hero + 屬性速查表 + 每屬性章節含程式碼與真實 live demo + 完整範例 + 備註
  - *Bilingual hero, quick-reference table, per-attribute sections with code & live demos, full example, notes*

### 變更 · Changed
- **`site/examples/components.html`**：`pipo-tap` 卡片由 Coming Soon 啟用為可點擊連結
  *`pipo-tap` card activated from Coming Soon to a live link*
- **`src/pipotoy.js`**：框架入口註冊 `pipo-tap`
  *register `pipo-tap` in the framework entry*

### 移除 · Removed
- **`src/pipotoy-tokens.css`**：移除遺留的 `[data-theme="light"]` 選擇器（無對應 dark 區塊，全站固定淺色）
  *Removed leftover `[data-theme="light"]` selector (no dark block existed; site is light-only)*

---

## [0.1.6-alpha] · 2026-06-15

### 新增 · Added
- **第九顆星球 Mistoria · 霧紗星 進入色系**
  *Ninth planet Mistoria joins the color system*
  - 15 位來自高維意識星球的安靜守護者，默默看顧著八星球的跟班們安睡在保護色裡
  - *Fifteen quiet guardians from a higher-dimension planet, silently watching over the eight-planet creatures as they sleep in their camouflage*
- **他們的故事第一次被記下**
  *Their story is recorded for the first time*
  - 當 HeianPipo 帶著八星球的小跟班來到地球時，這 15 位安靜的訪客也跟著一起來了。他們不參與防禦色的偽裝——他們本來就是這樣的存在。他們默默地幫助人類，等待著 pipo 遇見大哥
  - *When HeianPipo arrived on Earth with his eight-planet crew, fifteen quiet visitors came too. They take no part in the camouflage — they have always been this way. They help humans in silence, waiting for the day pipo meets the Elder*
- **15 位守護者第一次被點名**
  *The fifteen guardians are named for the first time*
  - Naya · 翠　/　Iro · 蘚　/　Sorae · 涯　/　Hii · 曦　/　Nimu · 霽　/　Aer · 弦　/　Washi · 紙　/　Hush · 寂　/　Hone · 蜜　/　Yumeko · 桃　/　Akeno · 朝　/　Glaze · 緋　/　Wisp · 紫　/　Mu · 默　/　Suna · 沙

---

## [0.1.5-alpha] · 2026-06-15

### 重構 · Refactored
- **`site/docs/pipotoy-compendium.html` 整頁視覺重整**
  *`site/docs/pipotoy-compendium.html` overall visual refresh*
  - Hero 升級為 `cmp-hero` 雙語節奏：膠囊 eyebrow `Color System · 色系圖鑑` + 漸層大標 + 中文副標（38 隻 / 8 顆星球）+ EN/ZH 雙段副標
  - 星球分類頭新增 `toy-category-head`：色點指示器 + 星球 EN 名（粗體大字）+ 星球 ZH 名 + 色系分類副標（如 `Greens · 綠色系`）+ JetBrains Mono 色票數量徽章
  - 色票卡片重整：`toy-crayon-name`（EN 粗體）+ `toy-crayon-zh`（中文）兩行清楚顯示，hex 值保留在 DOM 但視覺隱藏（讓使用者專注於色彩與命名）
  - 類別之間 56px 呼吸間距，整體層級更分明

### 變更 · Changed
- **`site/examples/pipo-world.html` meta-chip 文案統一**
  *`site/examples/pipo-world.html` meta-chip labels unified*
  - `不填的話 Default` → `Default 預設`（對齊 `Components · 元件` 雙語模式）
  - `可以填 Options` → `Options 選項`
  - `.attr` 區塊間距 72px → 88px、`.attr-title` 字級 17 → 18px，整體節奏更舒展

---

## [0.1.4-alpha] · 2026-06-14

### 新增 · Added
- **`site/examples/components.html` 元件總覽頁完成（玩具櫃風格）**
  *`site/examples/components.html` completed — toy-cabinet overview page*
  - Hero：雙語標題 + 玩具櫃 eyebrow + 中英副標
  - Filter Bar：膠囊按鈕（All / Structure / Background / Nav / Content / Action），中英並列、純 JS 切換
  - Cards Grid：桌機 3 欄、平板 2 欄、手機 1 欄
  - 6 張卡片：`pipo-world`（已完成，連向教學頁）+ `pipo-bar` / `pipo-tap` / `pipo-tile` / `pipo-stick` / `pipo-shout`（Coming Soon）
  - 每張卡片預覽區用不同 Pipo 色系背景（mibble / wibble / blonko / plobbo / squorbo / glorix），純 HTML/CSS 模擬元件外觀
  - Hover 上浮（`translateY(-6px)` + `shadow-3` + 預覽圖微縮放）
  - Coming Soon 卡：半透明白色遮罩 + 右上角中英雙語膠囊標籤 + 透明度 0.7 + `cursor: default`
- **`site/site.css` 新增 section 11**：`cmp-hero` / `cmp-filters` / `cmp-grid` / `cmp-card` / `cmp-preview` 色變體 / `shape-*` 元件雛形 / `is-soon` 狀態

---

## [0.1.3-alpha] · 2026-06-14

### 重構 · Refactored
- **HTML 全面重構：所有用戶面向頁面收進 `site/` 目錄**
  *Major refactor: all user-facing pages moved into `site/`*
  - `changelog.html` → `site/changelog.html`
  - `docs/pipotoy-compendium.html` → `site/docs/pipotoy-compendium.html`
  - `examples/pipo-world.html` → `site/examples/pipo-world.html`
  - `examples/components.html`（空殼）→ `site/examples/components.html`
  - `index.html` 保留在根目錄（靜態託管慣例）
  - `CHANGELOG.md` 保留在根目錄（GitHub / npm 慣例）
  - `docs/pipotoy-spec.html` 保留原位不動（設計師藍圖，自有設計系統）
- **新建立 `site/site.css`（51 KB）+ `site/site.js`（2 KB）**：所有 HTML 共用
  *New shared `site/site.css` (51 KB) + `site/site.js` (2 KB) for all HTML pages*
  - 抽出原本散落在 4 個 HTML 的 ~71 KB inline CSS
  - 抽出重複的版本注入 + 手機選單 JS 邏輯
- **Nav 與 Footer 全站統一**
  *Nav and Footer unified across all pages*
  - 4 個 site-level 連結：Components / Colors / Changelog / GitHub
  - 當前頁 nav 連結有薄荷綠 `is-active` 指示器
  - 桌面：hover 顯示中文 tooltip（`data-label` + `::after`，純 CSS）
  - 手機：漢英並列（`@media (max-width: 720px)` 改為 inline）
- **GitHub URL 統一為 `adlerlei/pipotoy`**
  *GitHub URL unified to `adlerlei/pipotoy`*（原 changelog 用 `yourname/pipotoy` 假連結）

### 新增 · Added
- **`site/examples/components.html` 空殼**
  *Empty shell for `site/examples/components.html`* — 統一 Nav/Footer 引用已就緒，等待 `components-page-spec.md` 規格任務填實

### 修正 · Fixed
- **`pipotoy-compendium.html` 標題被 fixed nav 遮擋** — 在 `.toy-hero` 加 `padding-top: 120px`
  *`pipotoy-compendium.html` title was hidden by the fixed nav — added `padding-top: 120px` to `.toy-hero`*
- **`pipo-world.html` hero-crumb 麵包屑路徑錯誤** — `../index.html` → `../../index.html`
  *`pipo-world.html` hero-crumb breadcrumb had wrong path — `../index.html` → `../../index.html`*
- **`site.css` `.hero-sub` 衝突** — index 與 pipo-world 兩處定義不同；給 pipo-world hero 加 `.hero-pipo-world` 修飾類，將覆寫 scoped 起來
  *`site.css` `.hero-sub` definition conflict — index and pipo-world had different values; scoped the override with `.hero-pipo-world` modifier class*
- **`pipo-world` `image-fit` 切換未重置 `background-repeat`** — 從 `tile` 切回 `cover` / `contain` 時圖片殘留重複平鋪；切換時同步重設 `background-repeat`（`tile` → `repeat`，其他 → `no-repeat`）
  *`pipo-world` `image-fit` switch did not reset `background-repeat` — image remained tiled when switching from `tile` back to `cover` / `contain`; `background-repeat` is now reset on every switch (`tile` → `repeat`, otherwise → `no-repeat`)*

### 文件 · Docs
- **`agent.md` 字體規則更新**
  *`agent.md` font rules updated*
  - 統一全站 Google Fonts `<link>` 一次載入三個字體（Nunito 400-1000 / Noto Sans TC 400-900 / JetBrains Mono 400-600）
  - 明確用途分配：Nunito 主體、Noto Sans TC 中文、JetBrains Mono 限定用於 code / Token 名稱 / 版本號等技術標籤

---

## [0.1.2-alpha] · 2026-06-10

### 變更 · Changed
- **Blobia 星球中文名統一為「滑趴星」**（全站 tokens.css / spec / compendium / index / agent.md）
  *Blobia Chinese name unified to 「滑趴星」 across all docs and tokens*
- **`--pipotoy-bg` 改為別名**指向 `--pipotoy-blobia-pibg`，單一真實來源
  *`--pipotoy-bg` is now an alias of `--pipotoy-blobia-pibg` (single source of truth)*
  - `src/pipotoy-tokens.css`：`--pipotoy-bg: var(--pipotoy-blobia-pibg)`
  - 其他檔案 `var(--pipotoy-bg)` 呼叫端零修改
- **`docs/pipotoy-compendium.html` token 命名 38 處**從下劃線改為連字符，與 tokens.css 對齊
  *All 38 token names in compendium switched from underscore to hyphen, aligned with `tokens.css`*

### 修正 · Fixed
- `docs/pipotoy-compendium.html` 第 46 行 CSS 註解「滑趴星」已對齊 HTML 標題
  *Compendium Blobia CSS comment now matches the HTML heading*

---

## [0.1.1-alpha] · 2026-06-09

### 新增 · Added
- **新角色「背卜 pibg」進色票**（Blobia · 滑趴星，第 4 色，預設背景色）
  *New creature "pibg" (背卜) added to the color system as the default background*
  - 底層：`--pipotoy-blobia-pibg: #faf6ee`
  - 用戶層：`--pipo-pibg: var(--pipotoy-blobia-pibg)`
  - 整個色系：37 色 → **38 色**
- **工具 token 擴充** `src/pipotoy-tokens.css`
  *Utility tokens expanded in `src/pipotoy-tokens.css`*
  - 品牌色：`--pipotoy-primary` / `--pipotoy-primary-soft`
  - 陰影第四層：`--pipotoy-shadow-4`（最大立體，hover 容器用）
  - 圓角：`--pipotoy-round-3: 20px`（介於 round 跟 round-lg 之間）
  - 間距尺度：`--pipotoy-pad-2/3/4/5/6`（8 / 12 / 16 / 24 / 32）
  - 字級尺度：`--pipotoy-font-1/3/5/7`（11 / 13 / 15 / 32）
  - 動畫別名：`--pipotoy-spring-1: var(--pipotoy-spring)`

### 修正 · Fixed
- `docs/pipotoy-compendium.html` token 命名統一為連字符，與 tokens.css 對齊
  *Compendium token names standardized to hyphens to match `tokens.css`*
- `docs/pipotoy-compendium.html` 字體改用 `var(--pipotoy-font-sans)`，不再用外部的 Plus Jakarta Sans
  *Compendium body font switched to `var(--pipotoy-font-sans)` (Nunito + Noto Sans TC)*
- `docs/pipotoy-compendium.html` Blobia 中文名統一為「滑趴星」（先前曾為「軟趴星」），與 tokens.css 對齊
  *Compendium Blobia Chinese name unified to 「滑趴星」 to match `tokens.css`*
- `pipo-world-spec.md` 備註更新：pibg 對應的 token 名從下劃線版改為連字符版
  *`pipo-world-spec.md` note updated to use hyphen-form token name for pibg*

### 文件 · Docs
- `agent.md` 規格書同步：色票數 37→38、Blobia 列表補 pibg、section 七版本號更新
  *`agent.md` spec updated: 37→38 colors, Blobia list updated, section 7 state refreshed*

---

## [0.1.0-alpha] · 2026-06-08

### 新增 · Added
- `index.html` 官方首頁，品牌故事與宣傳頁面
  *Official landing page with brand story and introduction*
- `docs/spec.html` 元件視覺規範，含完整 Token 與 11 個元件預覽
  *UI Visual Spec with full Design Tokens and 11 component previews*
- `docs/palette.html` Pipo 色系圖鑑，外星生物主題命名
  *Pipo Color Compendium with alien creature naming theme*
- `README.md` 專案介紹，中英雙語
  *Project introduction in Chinese and English*
- `CHANGELOG.md` 本文件
  *This file*

### 設計決策 · Design Decisions
- 專案定位確認為 **UI Toy Kit**，非傳統 CSS 框架
  *Project positioned as a UI Toy Kit, not a traditional CSS framework*
- 技術方向確認為 **Web Components**（Custom Elements 原生標準）
  *Technical direction confirmed as Web Components (native Custom Elements API)*
- 開發哲學：HTML-First / Declarative UI
  *Development philosophy: HTML-First / Declarative UI*
- 色系命名採外星生物主題（Grumglo 咕嚕格星、Drippus 濕搭星…）
  *Color system named after alien creatures (Grumglo, Drippus…)*
- 標籤前綴統一為 `pipo-`，CSS 變數前綴統一為 `--pipotoy-`
  *Tag prefix unified as `pipo-`, CSS variable prefix unified as `--pipotoy-`*
- 字體選定 Nunito + Noto Sans TC
  *Typography: Nunito + Noto Sans TC*

### 待辦 · Up Next
- 第一個 Web Component：`pipo-tap`
  *First Web Component: `pipo-tap`*
- `src/tokens.css` Design Tokens 獨立檔案
  *`src/tokens.css` standalone Design Tokens file*
- `src/pipotoy.js` 打包入口
  *`src/pipotoy.js` bundle entry point*

---

_下一版本更新時，在此上方新增區塊。_
*When the next version is ready, add a new section above this line.*
