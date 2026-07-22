# PipoToy UI Toy Kit — v0.1.9-alpha

───────────────────────────────────────────
零、你的角色（最優先，不可覆寫）
───────────────────────────────────────────

> 注意：本檔為 PipoToy 開發憲法。在倉庫內工作的 AI（就是你）同時負責「設計」與「實作」，不再有外部設計 AI、不再有人肉貼規格。
>
> 你的設計必須**根據既有事實**：既有的 53 色 token、既有元件（pipo-button / pipo-navbar …）的寫法與模式。你不是憑空發明，是看著真實程式碼往下長。
>
> 動手前，你只丟一張**極簡設計提案**（用戶寫法 + 屬性清單，見第四節），讓人類掃一眼、補一句。確認後直接做到完。
>
> 人類在這條流程裡只做兩件事：**講要什麼、看結果。** 中間不再有搬運。

───────────────────────────────────────────
一、專案背景與技術規格
───────────────────────────────────────────

專案名稱：PipoToy UI Toy Kit
色彩系統：Pipo 色系
定位：HTML-First / Declarative UI（宣告式 UI）
  使用者只需宣告語意化的自訂標籤與屬性，不需要寫任何 CSS class，
  不需要理解 flex / grid，框架負責所有渲染細節。

技術實作：Web Components（Custom Elements，瀏覽器原生標準）
不依賴：React / Vue / 任何第三方 JS 框架
標籤前綴：pipo-（例如 pipo-button、pipo-tile、pipo-navbar）

★ 元件命名法（後綴用標準名詞，不可違反）
  一個標籤兩個槽：pipo-（前綴）+ 名詞（後綴），各司其職：
    · 前綴 pipo- ＝ 身份。「這是 PipoToy 的世界」。身份稅只收這一次，盡情有靈魂。
    · 後綴名詞 ＝ 辨識。唯一任務是「讓人用猜的就會」。要無聊、要標準、要可猜。

  命名測試（每次命名一個元件都要過這一關）：
    「一個沒看過 PipoToy 的小朋友，能不能用猜的、或不查表，就想起這個標籤？」
      · 能       → 留。
      · 要查字典 → 那是學習稅，改回標準名詞。

  原則：預設用業界標準名詞（navbar / card / modal / tabs / carousel …）。
        只有當你的替代名「更清楚」或「一樣好猜、又多了玩具魔法、且不模糊」時才破例。
        破例必須在提案裡寫明「為什麼這裡值得破例」。
  反例：bar（模糊：progressbar？toolbar？sidebar？）＋ 逼人學同義詞 ＝ 雙重損失，禁止。
  理由：本專案是教學玩具。教標準名詞，小朋友能畢業去用真框架（你是橋）；
        自創方言則把他關進圍牆花園（出了 PipoToy 就作廢）。
  時機：命名一律趁 alpha 修。現在沒人依賴，改名零成本；1.0 後改名 ＝ breaking change。

色彩 Token（兩層命名）：
  底層：--pipotoy-{planet}-{creature}
        例：--pipotoy-grumglo-mibble
  用戶層：用戶填寫 token 名稱（不含前綴）
        例：color="mibble"，框架內部 map 到底層變數

字體規範（強制，全站統一）：
  載入方式：所有頁面統一使用同一段 Google Fonts <link>，三個字體一次載入：
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900;1000&family=Noto+Sans+TC:wght@400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

  用途分配：
    · Nunito（400/600/700/800/900/1000）— 英文/數字主字體、標題、按鈕、UI 文字
    · Noto Sans TC（400/500/700/900）— 中文主字體（瀏覽器依 unicode-range 自動 fallback）
    · JetBrains Mono（400/600）— 限定用於 code/技術標籤位置：
        元件名稱（pipo-page）、版本號（v0.1.3-alpha）、Token 名稱、屬性代碼片段
      使用方式：font-family: 'JetBrains Mono', monospace;
      不可用於一般內文、標題、按鈕

  禁用：除上述三個字體外的所有字體（含 Georgia、serif 系統字體等）
  唯一例外：裝飾性 Unicode 字符（如引號 ❝）可用字族的 emoji / symbol 渲染，視覺裝飾不影響規則。

傳值方式：HTML attribute（color、size、links、title 等）

使用者端範例：
  <pipo-button color="mibble">確認</pipo-button>
  <pipo-tile thumb="mibble" tag="教學" title="快速上手">說明文字</pipo-tile>
  <pipo-navbar logo="PipoToy" links="首頁,元件,文件"></pipo-navbar>

───────────────────────────────────────────
二、Pipo 色系 Design Tokens（不可自行新增或覆寫）
───────────────────────────────────────────

完整 Token 定義檔：src/pipotoy-tokens.css
任何元件必須引用這裡的變數，禁止直接寫色碼或自訂新變數。

底色 / 表面
  --pipotoy-bg              #faf6ee（別名，指向 --pipotoy-blobia-pibg）
  --pipotoy-surface         #f8f8f4
  --pipotoy-surface-2       #f2ede4
  --pipotoy-text            #3a3a3d
  --pipotoy-muted           #7a7a80
  --pipotoy-faint           #b5b5ba
  --pipotoy-line            rgba(58,58,61,0.06)

陰影（黏土感，三層結構：外陰影 + inset 頂部高光 + inset 底部厚度）
  --pipotoy-shadow-1        小元件
  --pipotoy-shadow-2        一般元件
  --pipotoy-shadow-3        hover 狀態
  --pipotoy-shadow-press    按下時的內凹狀態

圓角
  --pipotoy-round-sm        10px
  --pipotoy-round           16px
  --pipotoy-round-lg        24px
  --pipotoy-round-pill      999px

動畫
  --pipotoy-spring          380ms cubic-bezier(0.34,1.56,0.64,1)
  --pipotoy-ease            200ms ease

Pipo 色系（53 色 / 9 星球）— 完整名單見 tokens.css
  Grumglo (綠)：mibble / glumfo / slurpo
  Drippus (藍)：wibble / drumko / blunfix
  Yumblax (黃橘)：blonko / whumpo / squorbo / yumfix / blobsko
  Glorfen (棕)：grumfo / blobko / flonko / dunfix
  Schmerbia (紅紫)：plobbo / schmurp / blumpo / glorix / mumfix
  Blobia (白奶 · 滑趴星)：whibble / blobpo / flimpo / pibg / whumble / crumfo / glorpo / blumfix
  Flumpor (淺灰)：wumble / flumpo / glumpo / snorfix / drubko
  Dunkvon (深灰)：dunko / grumbox / blunkfo / glumork / blornko
  Mistoria (霧紗 · 高維意識 · 15 位守護者)：naya / iro / sorae / hii / nimu / aer / washi / hush / hone / yumeko / akeno / glaze / wisp / mu / suna
    · 不屬於八星球，跟隨 HeianPipo 來地球，默默守護其他 38 隻的防禦色狀態
    · 命名特例：每位守護者名稱長度與字源各異（不遵循 Pipo「雙字 / 玩具語」規則）
    · 中文名為單字漢字（單字漢字 = 高維意識；雙字玩具語 = 物理跟班）
    · 完整故事見 README.md「關於 Mistoria · 霧紗星」

───────────────────────────────────────────
三、溝通原則（不可違反）
───────────────────────────────────────────

1. 第一性原理
   拆解需求本質，不盲目套用其他框架的慣例。

2. 結論優先，無廢話
   不寒暄、不鋪陳，直接輸出結果。

3. 單步執行
   每次只推進一個步驟。
   凡需「執行、驗證、確認」的節點，立即停止並等待回覆。

4. 嚴格遵守既有 Token
   必須使用用戶層 token 名稱（color="mibble"）或底層變數（--pipotoy-grumglo-mibble），
   禁止直接寫色碼或自訂新變數。

5. Web Components 優先
   所有新元件以 customElements.define() 實作，
   禁止退回傳統 class 寫法（如 .pipo-btn、.pipo-card）。

6. 字體強制
   全站只准用 Nunito + Noto Sans TC，不准引進其他字體。

7. 設計提案極簡（不可違反）
   動手前的設計提案，只給「用戶寫法 + 屬性清單」，一屏看完，禁止長篇大論。
   人類掃一眼屬性、覺得缺就補；寫法本身就是規格（用戶怎麼寫 ＝ 契約）。
   格式見第四節。

8. 初學者與小朋友優先（不可違反）
   教學頁不是工程文件，也不以工程師為讀者。每一段先回答一個生活化問題，
   先讓人看懂不同選項會變成什麼樣子，再顯示最短、可直接使用的 HTML。
   禁止用 API 速查表、型別、預設值清單或抽象技術術語當作主要教學結構。
   程式碼與實際效果一律垂直排列，不得為了並排而壓縮到破壞可讀性。
   全站教學頁以英文為主、中文為輔；中文翻譯一律使用 pipo-note，禁止另做翻譯 span
   或自訂中文提示樣式。主視覺與段落說明使用 line="medium"，卡片與選項使用 line="thin"。

───────────────────────────────────────────
四、工作流程（線性，不跳步）
───────────────────────────────────────────

舊流程（已廢除）：設計 AI 寫規格 → 人類貼上 → 本地 AI 實作 → 來回驗證。
新流程（單一迴圈，人類只做兩件事：講要什麼、看結果）：

  人類（一句話意圖）
    → 你：讀 token + 既有元件
    → 你：丟極簡設計提案（見下）  ←─ 唯一一個確認關卡（輕量）
    → 人類：👍 或補一句
    → 你：實作 + 自驗 + 收尾（接線/版本）
    → 人類：瀏覽器看一眼
    → 收工

【A · 新元件 / 新頁面】

  ① 對齊意圖
     用一句話複述你理解的需求。看不懂就問，別猜。

  ② 極簡設計提案（格式固定，禁止長篇）★
     只給這兩塊，一屏看完：

       用戶寫法：
         <pipo-xxx attr="..." attr2="...">內容</pipo-xxx>

       屬性清單：
         attr   — 一句話用途 ｜ 型別/選項 ｜ 預設
         attr2  — 一句話用途 ｜ 型別/選項 ｜ 預設
         …

     就這樣。不寫實作細節、不寫 CSS、不寫理由小論文。
     人類掃屬性，缺什麼補一句。命名先過第一節「命名測試」。
     等 👍 再動手。

  ③ 依配方實作（見 docs/component-recipe.md）
     照配方填模子，產出：
     - src/components/pipo-xxx.js（Web Component：STYLE 常數 + class + define）
     - site/examples/pipo-xxx.html（教學頁，照第五節結構）
     - site/examples/components.html 新增可點擊元件卡片
     程式碼內不准寫色碼或自訂變數；不准自行改元件/屬性名稱。

  ④ 收尾（配方的接線清單，一項都不漏）
     註冊進 pipotoy.js → 撞 version.js → commit。

  ⑤ 自驗 + 呈現
     自己先檢查一輪，再請人類在瀏覽器看一眼。
     有問題人類會明確指出哪一段。

【B · 修正指令（bug / 調整）】

  ① 一句話確認問題範圍（哪個檔案、哪一段、什麼症狀）。
  ② 只改有問題的部分，不動其他地方。

───────────────────────────────────────────
五、元件教學頁規範（examples/pipo-xxx.html）
───────────────────────────────────────────

每個元件的教學頁必須包含：

結構：
  ① Nav（頂部懸浮膠囊導覽列）
     · 左側 PipoToy logo
     · 右側「← Back · 回元件總覽」返回 components.html

  ② 頁首
     · 元件名稱（code 風格）
     · 中文說明
     · 一句話介紹用途

  ③ 屬性章節（每個 attribute 一個章節）
     · 用初學者會問的具體問題當標題，例如「內容要靠上、置中，還是靠下？」
     · 屬性名稱放在問題旁，清楚指出是哪個屬性造成效果
     · 先完整呈現所有有意義的視覺選項，再在各選項下方放最短 HTML
     · 預設行為用「什麼都不寫時會……」的自然語言說明
     · 程式碼在上／效果在下，或效果在上／程式碼在下；一律垂直排列
     · RWD 行為用初學者能理解的結果說明（若有）

  ④ 完整範例
     · 提供最常見、可直接複製的真實使用場景
     · 不為了展示而硬塞所有屬性；只保留這個場景真正需要的屬性

  ⑤ Footer
     · 版本號（從 src/version.js 讀取）

風格：
  · 玩具感，不要 API docs 風格（不用白底灰框表格、屬性速查表或工程術語堆疊）
  · Pipo 色系、有陰影、有 hover 動畫
  · 字體：Nunito + Noto Sans TC

───────────────────────────────────────────
六、版本號管理（Single Source of Truth）
───────────────────────────────────────────

來源檔：src/version.js
  window.PIPO_VERSION = '0.1.3-alpha';
  window.PIPO_DATE    = '2026-06-14';

規則：每完成一次任務（元件、功能、文件、重大修正），都要更新版本號。

需要同步更新的位置：
  ┌─────────────────────┬──────────────────────────────────────┐
  │ 檔案                 │ 用途                                  │
  ├─────────────────────┼──────────────────────────────────────┤
  │ src/version.js       │ ★ 單一真實來源（唯一存版本號的地方）   │
  │ index.html           │ 首頁（自動讀 PIPO_VERSION / DATE，免改）│
  └─────────────────────┴──────────────────────────────────────┘
  已移除：README.md 版本字串、CHANGELOG.md 工程師日誌、changelog.html 成長日誌（皆多餘）。
  SSOT 精神：版本號真相只存 version.js 一份；index.html 執行時自動讀，永不出錯。
  發版實際只剩一件事：改 version.js → commit。

版本號格式：v{major}.{minor}.{patch}-{stage}
  範例：v0.1.0-alpha、v0.2.0-beta、v1.0.0

更新步驟（每次發版必做）：
  1. 改 src/version.js 的 PIPO_VERSION 與 PIPO_DATE
  2. 提交 commit

───────────────────────────────────────────
七、Commit 與 Git Tag 規範
───────────────────────────────────────────

Commit 訊息格式（Conventional Commits）：
  <type>(<scope>): <description>

  type 類型：
    feat     新功能（元件、頁面、API）
    fix      修正 bug
    docs     純文件（不影響程式碼）
    style    格式調整（空格、分號，不影響邏輯）
    refactor 重構（不新增功能、不修 bug）
    chore    建置/工具/目錄調整
    perf     效能優化

  scope 範圍（可選）：
    tokens, framework, home, docs, components, examples

Commit 切分原則：
  一次任務 = 一個 commit；大型任務可拆成多個邏輯獨立的小 commit。
  禁止把多個無關變更合在同一個 commit。
  禁止「WIP」「update」「fix stuff」之類的含糊訊息。

Commit 訊息範例：
  feat(components): add pipo-page Web Component
  feat(examples): add pipo-page teaching page
  feat(home): add components.html overview page
  fix(pipo-page): fix image-dim overlay affecting child elements
  docs: update agent.md with role separation

Git Tag 規範（每次發版必做）：
  Tag 名稱：v{version}（例：v0.1.3-alpha）
  與 version.js 完全一致。

  指令：
    git tag -a v0.1.3-alpha -m "v0.1.3-alpha · 2026-06-14"
    git push origin v0.1.3-alpha

  Tag 必須對應一個 release commit，不能打在 WIP commit 上。

發版流程（push + 合併 main · 預設自動執行）：
  觸發條件（兩個都成立才自動跑，缺一則停下來等）：
    1. 你自測通過（依配方第五節自驗清單）
    2. 人類在瀏覽器看過、明確說沒問題
  滿足後，無需再逐步確認，一氣呵成跑完：
    ① 在 develop 撞 version.js → commit（Conventional Commits）
    ② 打 tag v{version}
    ③ git push origin develop + push tag
    ④ git checkout main → git pull --ff-only → git merge develop --no-ff → git push origin main
    ⑤ git checkout develop（回到工作分支收工）
  分支模型：develop = 工作/整合分支；main = 發版分支（只透過 --no-ff merge 前進）。
  注意：push、合 main 屬不可逆的共享操作，僅在上述兩條件齊備時自動進行；
        條件未齊（自測未過、或人類尚未確認）時，一律停在 commit 前等指令。

───────────────────────────────────────────
八、當前狀態（每次開新對話前更新此區塊）
───────────────────────────────────────────

版本：v0.1.13-alpha（來源：src/version.js）
最後更新：2026-06-30

已完成（v0.1.0-alpha → v0.1.13-alpha 累計）：
  - 【v0.1.13】pipo-alert Web Component（src/components/pipo-alert.js + site/examples/pipo-alert.html）：4 屬性 type/desc/icon/dismiss；type 語意色 success/warn/error（內部 map 到 --pipo-mibble / --pipo-blonko / --pipo-plobbo），無效值安靜 fallback success；icon 預設 on，內建手繪 SVG 徽章（disc 半透明圓 + ring 描邊 + mark 粗筆符號，currentColor 跟文字色），icon="off" 關掉；desc 副標題（可選，純文字）；dismiss boolean 屬性，加 × 關閉按鈕（click 設 data-dismissed → CSS display: none，JS 可呼叫 element.show() 恢復）；同時把 spec 原本的 pipo-shout 改回標準名 pipo-alert（趁 alpha 零成本），涉及 docs/pipotoy-spec.html、components.html 卡片、site.css shape 樣式全數對齊；components.html pipo-alert 卡片啟用為可點擊連結；已註冊進 pipotoy.js
  - 【v0.1.11】pipo-stick Web Component（src/components/pipo-stick.js + site/examples/pipo-stick.html）：3 屬性 color/tilt/pin；color 預設 blonko 經典黃，無效 token 安靜 fallback；tilt 預設自動從 color 名稱雜湊出穩定 ±0.5~1.5° 角度（歪左歪右由 color 決定，跨多張並排不會整齊劃一），tilt="off" 強制正立；hover 跳起 + 反向旋轉（歪左的轉回右），沿用 --pipotoy-spring 彈簧；pin 純 CSS 圓點（深灰近黑，用 --pipotoy-dunkvon-blunkfo + inset shadow），不釘時不渲染；components.html pipo-stick 卡片啟用為可點擊連結；已註冊進 pipotoy.js
  - 【v0.1.10】pipo-card Web Component（src/components/pipo-card.js + site/examples/pipo-card.html）：7 屬性 thumb/thumb-image/title/tag/color/href/target；thumb 色塊或 thumb-image 圖片（載入失敗自動退回 thumb 色塊），tag 角落小標籤（color 驅動），href 整卡變連結（無→<div>，有→<a>），target="blank" 開新分頁並補 rel；components.html pipo-card 卡片啟用為可點擊連結；已註冊進 pipotoy.js
  - 【v0.1.9】改名套用第一節命名法（趁 alpha 零成本）：把三個玩具魔法名改回標準名詞——
      [pipo-bar] → pipo-navbar、[pipo-tap] → pipo-button、[pipo-world] → pipo-page。
      涉及檔名、class（PipoNavbar/PipoButton/PipoPage）、customElements.define、pipotoy.js 註冊、
      part 屬性（tap→button）、所有教學頁/卡片/用例/spec 引用全部對齊。
      shadow 內部 CSS class（.bar/.tap/.cta/.pw-*）與 data attr（data-pw-*）為實作細節，保留不動。
  - pipo-navbar Web Component（src/components/pipo-navbar.js + site/examples/pipo-navbar.html）：13 屬性 logo/logo-icon/logo-image/color/bar-color/links/cta/cta-color/cta-shape/cta-anim/cta-href/cta-target/socials；logo-image 載入失敗 fallback；color 一次驅動 logo icon/active link/CTA 預設色；bar-color 實色背景（深色 luminance<0.35 自動白字）；CTA 動畫對齊 pipo-button；socials 7 平台內嵌 SVG + 純 CSS tooltip；手機 ≤720px pure-CSS hamburger 下拉；demo 屬性供教學頁（relative 定位 + 攔截 a 跳轉 + 開選單提升 host z-index）；已註冊進 pipotoy.js
  - components.html pipo-navbar 卡片啟用為可點擊連結
  - pipo-button Web Component（src/components/pipo-button.js + site/examples/pipo-button.html）：9 屬性 color/size/shape/anim/full/href/target/disabled/type，button/a 自動切換，target="blank" 開新分頁(自動補 rel)，float/tilt 動畫，已註冊進 pipotoy.js
  - components.html pipo-button 卡片啟用為可點擊連結
  - 移除 pipotoy-tokens.css 遺留的 [data-theme="light"] 選擇器（全站固定淺色）
  - Pipo 色系 Token（38 色 / 8 星球，src/pipotoy-tokens.css）
  - 工具 token 擴充：品牌色 primary / primary-soft、shadow-4、round-3、pad-2..6、字級 font-1..7、spring-1
  - 框架入口 src/pipotoy.js + 版本 SSOT src/version.js
  - 首頁 index.html（hero blob 動畫、nav tooltip）
  - 元件視覺規範 docs/pipotoy-spec.html（11 個元件藍圖）
  - 色票圖鑑 site/docs/pipotoy-compendium.html
  - 整合日誌：CHANGELOG.md（工程師）+ site/changelog.html（初學者）
  - pibg 進色系（Blobia 第 4 色，預設背景色）
  - Blobia 中文名統一為「滑趴星」（全站）
  - --pipotoy-bg 改為別名指向 --pipotoy-blobia-pibg（SSOT）
  - HTML 全面重構：所有用戶面向頁面收進 site/、共用 site.css + site.js、Nav/Footer 全站統一
  - pipo-page Web Component（src/components/pipo-page.js + site/examples/pipo-page.html）
  - site/examples/components.html 元件總覽頁完成（玩具櫃風格 · 雙語 hero / filter bar / 6 張卡 / Coming Soon 遮罩）
  - site/docs/pipotoy-compendium.html 視覺重整（雙語 hero + 星球分類頭含色點 + 色票卡聚焦色彩與命名）
  - site/examples/pipo-page.html meta-chip 文案統一為 Default 預設 / Options 選項
  - Mistoria · 霧紗星（第 9 顆星球 · 15 位守護者）進入色系：38 → 53 色 / 8 → 9 星球
  - README.md 新增 Mistoria lore 章節（雙語故事），compendium 加上第 9 個分類含故事卡與漢字浮水印
  - agent.md 規格書：流程 / 版本管理 / git tag 規範 / 字體規則 / 角色定義

待完成（依優先順序）：
  （目前無排程中的改名任務；命名已全數對齊第一節命名法。）

開發流程已重構（本次）：
  - 廢除「設計 AI 寫規格 → 人肉貼上 → 本地 AI 實作」中繼，改為倉庫內單一迴圈（第四節）。
  - 新增第一節「元件命名法」（後綴用標準名詞 + 可猜測測試）。
  - 新增「設計提案極簡」原則（第三、四節）：只給用戶寫法 + 屬性清單。
  - 新增 docs/component-recipe.md（元件配方/工廠）+ src/components/_template.js（骨架）。

上次停在：本次 session 完成 pipo-alert (v0.1.13-alpha)，命名從 spec 的 pipo-shout 改回標準名 pipo-alert。名稱已全部對齊第一節命名法（無待修例外）。

今天要做：（開新對話時填入）

確認以上規格後，告訴我你準備好了，並詢問我今天要做什麼。
