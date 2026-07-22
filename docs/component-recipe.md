# PipoToy · 元件配方（Component Recipe）

> 這是「製造元件的工廠」。做一個 pipo-xxx ＝ 照這份配方填模子。
> 目的：讓第 30 個元件跟第 1 個一樣便宜、一樣好玩。
> 憲法在 agent.md；這裡是把它落地的操作手冊。

---

## 0 · 一個元件的生命週期（單一迴圈）

```
意圖 → 極簡設計提案（確認） → 填模子 → 接線 → 自驗 → 看一眼 → 收工
```

人類只做兩件事：講要什麼、看結果。其餘是你的。

---

## 1 · 極簡設計提案（動手前唯一的確認關卡）

格式固定，一屏看完，禁止長篇：

```
用戶寫法：
  <pipo-xxx attr="..." attr2="...">內容</pipo-xxx>

屬性清單：
  attr   — 一句話用途 ｜ 型別/選項 ｜ 預設
  attr2  — 一句話用途 ｜ 型別/選項 ｜ 預設
```

規則：
- 命名先過 agent.md 第一節「命名測試」（後綴用標準名詞）。
- 「寫法即規格」——用戶怎麼寫就是契約，不另寫實作細節。
- 等 👍 或補一句，再動手。

---

## 2 · 填模子（程式碼）

複製 `src/components/_template.js` → `src/components/pipo-xxx.js`，然後：

1. 全檔搜尋 `Xxx` / `xxx` → 換成元件名。
2. `observedAttributes` 列出所有「會改變渲染」的屬性。
3. `STYLE`：只用 token（`var(--pipotoy-*)` / `var(--pipo-{color})`），變體用 `:host([attr=...])` 選擇器。
4. `_render()`：建 DOM、套屬性、`<slot>` 投影內容。

鐵律：
- ❌ 寫色碼（`#faf6ee`）、❌ 自訂新變數、❌ `.pipo-btn` 這種 class 寫法。
- ✅ 無效 token 一律 fallback（`var(--pipo-${color}, var(--pipotoy-surface))`），不報錯不空白。
- ✅ 鍵盤無障礙：可互動元件加 `:focus-visible` outline。

參考既有元件抓模式：`pipo-button.js`（最乾淨）、`pipo-navbar.js`（複雜：多屬性 + RWD + tooltip）。

---

## 3 · 教學頁（site/examples/pipo-xxx.html）

照 agent.md 第五節結構，共用 `../site.css` + `../../src/pipotoy-tokens.css`。骨架：

```
<head>
  三字體 <link>（Nunito + Noto Sans TC + JetBrains Mono，整段照抄）
  <link> pipotoy-tokens.css → site.css → 頁面層 <style>（只排版，不寫色碼）
</head>
<body>
  <nav>     統一導覽（抄任一 examples 頁，改 nav-tag 為 <pipo-xxx>）
  <hero>    breadcrumb · 元件名(code 風) · 英文主說明 · pipo-note 中文輔助 · 最小寫法 · live demo
  <section> 用初學者會問的問題帶路，例如「內容要站哪裡？」
  每個屬性一節：具體問題 + 全部視覺選項 + 各選項最短 HTML + RWD 結果(若有)
  完整範例：最常見、可直接複製的真實場景
  <footer>  版本號（讀 window.PIPO_VERSION）
</body>
```

教學順序：先看懂結果，再看最短寫法。程式碼與效果一律垂直排列，不可左右壓縮。

風格：玩具感、Pipo 色系、有陰影/hover 動畫。讀者只是假設為完全沒有經驗的初學者或小朋友，禁止 API docs、Quick Reference 速查表、型別清單與工程術語導向。

語言規則：英文是主要內容；中文翻譯一律使用 `<pipo-note color="wibble">`，不可另做翻譯 span 或自訂中文提示樣式。主視覺與段落說明用 `line="medium"`，卡片與選項用 `line="thin"`，並載入 `src/components/pipo-note.js`。

---

## 4 · 接線清單（收尾，一項都不漏）★

這份清單就是工廠的價值——把每次都會漏、都很煩的雜事固定下來：

- [ ] **註冊**：`src/pipotoy.js` 加 `import './components/pipo-xxx.js';`
- [ ] **總覽卡**：`site/examples/components.html` 把該元件卡片啟用為可點擊連結
- [ ] **撞版本**：`src/version.js` 改 `PIPO_VERSION` + `PIPO_DATE`
- [ ] **commit**：Conventional Commits，例 `feat(components): add pipo-xxx Web Component`
- [ ] **tag（發版時）**：`git tag -a v0.x.y-alpha -m "..."`，對應 release commit

---

## 5 · 自驗（給人類看之前先自己跑一輪）

- [ ] 不填任何屬性 → 有合理預設，不空白不報錯
- [ ] 每個屬性都實際生效，無效值有 fallback
- [ ] 不看程式碼也能從畫面分辨每個選項的差異
- [ ] 每個有意義的選項都有畫面與最短 HTML，沒有只寫文字帶過
- [ ] 程式碼空格、標籤與屬性名稱完整，不因排版被拆開或黏在一起
- [ ] 手機寬度（≤720px）不爆版
- [ ] 鍵盤可操作（可互動元件）
- [ ] console 無錯
- [ ] 全檔搜尋確認：無色碼、無自訂變數、無第四種字體

通過 → 請人類在瀏覽器看一眼。
