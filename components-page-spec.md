✅ 製作規格 · components.html
══════════════════════════════════════════

【頁面定位】
  PipoToy 元件總覽頁。
  從 index.html 的「View Components」按鈕進入。
  每張元件卡片點擊後跳到該元件的獨立教學頁（例如 pipo-world.html）。

【頁面結構】

  ① Nav（頂部導覽列）
     · 與 index.html 相同風格的懸浮膠囊導覽列
     · 左側：PipoToy logo + 品牌名稱
     · 右側：「← Back · 回首頁」返回按鈕

  ② Hero（頁首）
     · 標題：Components · 元件
     · 副標題：一句話說明（例如：「拿起來就能用的玩具，一個標籤一個效果」）
     · 風格輕鬆，不要像 API 文件

  ③ Filter Bar（分類篩選列）
     · 按鈕列，橫排，可單選
     · 預設選「全部」，點分類只顯示該類卡片
     · 分類（目前先設這幾類，之後可擴充）：
       全部 / 結構 / 背景 / 導覽 / 內容 / 互動
     · 按鈕風格：膠囊形、Pipo 色系、選中狀態有填色

  ④ Cards Grid（元件卡片區）
     · 格狀排列，桌機 3 欄、平板 2 欄、手機 1 欄
     · 每張卡片包含：
       - 預覽縮圖區（上半部，有背景色，用 Pipo 色系，每張卡顏色不同）
         縮圖區內用簡單的 HTML/CSS 模擬元件外觀（不需要真實 Web Component）
       - 卡片下半部：
           元件名稱（code 標籤風格，例如 pipo-world）
           中文說明（一句話）
           分類標籤（小膠囊，例如「結構」）
     · Hover 效果：卡片上浮（translateY -6px）+ 陰影加深
     · 點擊整張卡片跳到對應教學頁

  ⑤ Footer
     · 與 index.html 相同風格
     · 顯示版本號（從 src/version.js 讀取）

【目前元件清單（第一版只有這一個，其餘卡片用「即將推出」狀態顯示）】

  已完成：
  ┌─────────────┬────────┬──────────────────────────┬──────────────────────┐
  │ 元件名稱     │ 分類   │ 中文說明                   │ 連結                  │
  ├─────────────┼────────┼──────────────────────────┼──────────────────────┤
  │ pipo-world  │ 結構   │ 網頁世界容器，最外層的殼     │ examples/pipo-world.html │
  └─────────────┴────────┴──────────────────────────┴──────────────────────┘

  即將推出（卡片顯示但不可點擊，有「Coming Soon」標籤）：
  · pipo-bar    導覽    頂端導覽列
  · pipo-tap    互動    點下去的按鈕
  · pipo-tile   內容    資訊卡片
  · pipo-stick  內容    便利貼
  · pipo-shout  內容    通知提示
  （之後陸續補充）

【設計風格】

  整體：玩具架風格。卡片像擺在架子上的玩具盒。
  
  色彩：
  · 頁面底色：--pipotoy-bg（#faf6ee）
  · 每張卡片預覽區用不同的 Pipo 色系背景，建議順序：
    pipo-world  → mibble（薄荷綠）
    pipo-bar    → wibble（天空藍）
    pipo-tap    → blonko（奶黃）
    pipo-tile   → plobbo（粉紅）
    pipo-stick  → squorbo（金黃）
    pipo-shout  → glorix（霧紫）

  陰影：使用 --pipotoy-shadow-2（一般）/ --pipotoy-shadow-3（hover）
  圓角：--pipotoy-round-lg（24px）
  動畫：--pipotoy-spring（380ms cubic-bezier(0.34,1.56,0.64,1)）

  字體：Nunito + Noto Sans TC，禁止使用其他字體
  （JetBrains Mono 只用於元件名稱的 code 標籤）

【Coming Soon 卡片樣式】
  · 預覽區加半透明遮罩（rgba 白色 0.5）
  · 右上角顯示「Coming Soon」小標籤
  · cursor: default，不可點擊
  · 整體透明度 0.7

【Filter 互動邏輯】
  · 純 JS 實作，不依賴任何框架
  · 點擊分類按鈕時，隱藏不符合分類的卡片
  · 切換時有淡入淡出效果（opacity transition）
  · 「全部」永遠顯示所有卡片

【RWD 斷點】
  · 桌機（> 1024px）：3 欄
  · 平板（768px ~ 1024px）：2 欄
  · 手機（< 768px）：1 欄

【檔案位置】
  · 輸出：docs/components.html 或根目錄 components.html（依現有專案結構決定）
  · 引用：src/version.js、src/pipotoy-tokens.css

【備註】
  · 卡片預覽區的元件縮圖用靜態 HTML/CSS 模擬即可，不需要真實 Web Component
  · 之後每完成一個新元件，只需要在卡片清單加一筆，改成可點擊狀態
  · 頁面本身不引用 pipotoy.js，避免還沒完成的元件造成錯誤

══════════════════════════════════════════
狀態：✅ 定案，可交付開發 AI
