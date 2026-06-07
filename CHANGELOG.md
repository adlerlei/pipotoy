# Changelog · PipoToy

所有重要更新都記錄在這裡。
*All notable changes to this project are documented here.*

格式參考 [Keep a Changelog](https://keepachangelog.com)。

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
