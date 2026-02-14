---
layout: post
title: "打造個人技術品牌網站：從設計到開發的完整歷程"
date: 2024-02-12
categories: posts
tags: [Jekyll, 網站開發, 前端, 設計, Dark Mode]
---

在這個 AI 狂飆的時代，工程師要怎麼讓自己被看見？除了 GitHub 上的 contribution graph，我覺得一個精心打造的個人網站，是展現自我最好的舞台。這篇文章記錄了我從零開始建立這個網站的完整歷程，包含技術選型、設計理念，以及一些踩過的坑。

## 為什麼要做個人網站？

這個動機得從頭說起。一開始只是單純想要持續學習前端技術，畢竟身為 iOS 開發者，能夠掌握一些網頁技術總是多一項技能。但隨著做下去，我發現個人網站的價值遠不止於此：

**1. 個人品牌的建立**
在求職市場上，一個有質感的個人網站就像是你的名片。面試官可以從你的網站看到你的技術能力、審美品味，甚至是你的思考方式。這比單純的履歷更有說服力。

**2. 內容創作的基地**
有了自己的部落格，就可以把學習心得、技術筆記、工作反思通通記錄下來。這些內容不僅能幫助別人，也是自己成長的軌跡。更重要的是，你完全掌控內容，不用擔心平台政策改變或服務終止。

**3. 技術實驗的遊樂場**
想試試 CSS 新特性？想玩玩 JavaScript 動畫？自己的網站就是最好的實驗場。這次加入 Dark/Light mode 切換功能，就是一個很好的學習機會。

## 技術選型：為什麼選擇 Jekyll？

市面上做網站的方案很多，為什麼我最後選擇 Jekyll？讓我分析一下各種方案的優缺點：

**Jekyll 的優勢：**
- **GitHub Pages 免費託管**：推送到 GitHub 就自動部署，完全免費，還有 SSL 憑證
- **Markdown 寫作體驗**：專心寫內容就好，不用管排版
- **靜態網站速度快**：沒有資料庫查詢，載入速度飛快
- **安全性高**：靜態檔案沒有後端漏洞的風險
- **版本控制友善**：所有內容都是純文字，Git 管理超方便

**對比其他方案：**
- **Hugo**：速度更快，但 Go template 語法對我來說不太直覺
- **Next.js / Gatsby**：功能強大但 overkill，部落格不需要這麼複雜的框架
- **WordPress**：太肥大，而且我不想管理伺服器和資料庫

所以最後選擇 Jekyll，對我來說是最佳平衡點。

## 環境設定的坑：Ruby 版本問題

選好技術後，第一關就是環境設定。這裡我踩了一個大坑：**Ruby 版本問題**。

一開始我想安裝 Ruby 2.7.x，結果用 RVM 怎麼裝都裝不起來。錯誤訊息看起來是相依套件缺失，試了好多天還是失敗。後來改裝 Ruby 3.1.x 才順利成功。

**給新手的建議：**
- 直接使用 Ruby 3.x 版本，不要浪費時間在 2.x 上
- 使用 RVM 或 rbenv 管理 Ruby 版本，避免污染系統環境
- Jekyll 4.x 已經完整支援 Ruby 3.x，相容性沒問題

安裝好 Ruby 後，剩下的就簡單了：

```bash
gem install bundler jekyll
jekyll new my-blog
cd my-blog
bundle exec jekyll serve
```

網站就在 `http://localhost:4000` 跑起來了。

## GitHub Pages 設定：docs 目錄的妙用

我的 repo 一開始不是為了做網站而建的，所以專案結構不太標準。後來發現 GitHub Pages 可以設定從 `docs/` 目錄發布，這就解決了我的問題。

**設定步驟：**
1. 把 Jekyll 專案建在 `docs/` 目錄下
2. 到 GitHub repo 的 Settings → Pages
3. Source 選擇「Deploy from a branch」
4. Branch 選擇 `main`，目錄選擇 `/docs`
5. 儲存後等幾分鐘就會自動部署

這樣的好處是專案根目錄可以放其他檔案，網站內容獨立在 `docs/` 裡，結構更清晰。

## 從套主題到自己設計

一開始我用的是 [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes/) 主題，功能完整、使用者多、文件也很齊全。對新手來說是個不錯的起點。

但用了一陣子後，我開始覺得不太對勁：
- 主題的設定選項太多，反而不知道該怎麼調
- 想改個小地方都要翻遍主題的程式碼
- 很多功能我根本用不到，卻增加了載入時間
- **最重要的是：用別人的主題，沒辦法展現自己的設計能力**

於是我做了一個決定：**自己從零設計主題**。

**設計理念：**
1. **簡潔現代**：去除不必要的裝飾，讓內容成為主角
2. **重視閱讀體驗**：寬鬆的行距、舒適的字體大小、適當的留白
3. **響應式設計**：手機、平板、桌面都要有好的體驗
4. **效能優先**：只載入必要的 CSS 和 JavaScript

我使用 SCSS 來組織樣式，把顏色、字體、間距都定義成變數，方便統一調整。檔案結構大概長這樣：

```
_sass/
├── _variables.scss       # 變數定義
├── _theme-variables.scss # 主題色彩變數
├── _base.scss            # 基礎樣式
├── _layout.scss          # 版面配置
├── _components.scss      # 元件樣式
└── _animations.scss      # 動畫效果
```

這樣的結構讓程式碼容易維護，也方便未來擴充新功能。

## Dark/Light 模式的實作：技術亮點

做個人網站最大的好處就是可以實驗新技術。最近我加入了 Dark/Light mode 切換功能，這是現代網站幾乎必備的功能。讓我分享一下實作細節。

### 為什麼要做這個功能？

1. **用戶體驗**：有些人喜歡深色介面，有些人喜歡淺色，提供選擇就是尊重用戶
2. **省電 (OLED)**：深色模式在 OLED 螢幕上更省電
3. **技術展現**：這是一個展現前端技術能力的好機會

### 技術架構

我採用的是 **CSS Variables + data-theme 屬性** 的方案，這是目前最現代化的做法。

**核心概念：**
- 所有顏色都定義為 CSS 變數（`--color-bg-primary`, `--color-text-primary` 等）
- 用 `[data-theme="dark"]` 選擇器覆寫深色模式的變數值
- JavaScript 只負責切換 `<html>` 標籤的 `data-theme` 屬性

這樣做的好處是 CSS 和 JavaScript 分離，邏輯清晰，維護容易。

### 配色設計

**淺色模式**：柔和的淺色系，適合長時間閱讀
```scss
:root {
  --color-bg-primary: #F5F7FA;    // 淡藍灰背景
  --color-bg-secondary: #FFFFFF;  // 純白卡片
  --color-text-primary: #1E293B;  // 深藍灰文字
  --color-text-secondary: #475569; // 中灰文字
  --color-cta: #22C55E;           // 綠色強調色
}
```

**深色模式**：現代科技感的深色系
```scss
[data-theme="dark"] {
  --color-bg-primary: #0F172A;    // 深藍黑背景
  --color-bg-secondary: #1E293B;  // 深藍卡片
  --color-text-primary: #F8FAFC;  // 淺白文字
  --color-text-secondary: #E2E8F0; // 次要淺色
  --color-cta: #22C55E;           // 綠色強調色
}
```

### 三種模式的設計

我不只做了 Light/Dark 兩種模式，還加入了 **Auto 模式**：

- 🌓 **Auto**：自動跟隨系統設定（預設）
- ☀️ **Light**：強制淺色模式
- 🌙 **Dark**：強制深色模式

點擊導航列的主題切換按鈕，會循環切換這三種狀態。

### JavaScript 實作重點

```javascript
// 1. 偵測系統主題偏好
function getSystemTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// 2. 儲存用戶偏好到 localStorage
function setStoredTheme(theme) {
  localStorage.setItem('theme', theme);
}

// 3. 套用主題
function applyTheme(theme) {
  const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
  document.documentElement.setAttribute('data-theme', effectiveTheme);
}

// 4. 監聽系統主題變化
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', function() {
    if (getStoredTheme() === 'auto') {
      applyTheme('auto');
    }
  });
```

### 防止閃爍（FOUT）

這是很多網站會忽略的細節。如果等頁面載入完才套用主題，用戶會看到畫面閃一下，體驗很差。

**解決方案：**
- 把主題切換腳本放在 `<head>` 裡，在 CSS 載入前執行
- 使用 IIFE（立即執行函數）確保腳本立刻執行
- 從 localStorage 讀取偏好後立刻套用，不等 DOM ready

這樣用戶就不會看到任何閃爍，體驗更流暢。

### 平滑過渡動畫

為了讓主題切換不那麼生硬，我加入了 200ms 的過渡動畫：

```scss
* {
  transition: background-color 200ms ease,
              color 200ms ease,
              border-color 200ms ease;
}
```

切換主題時，所有顏色會平滑地淡入淡出。按鈕還有 180° 旋轉動畫，增加互動趣味性。

### 遇到的技術挑戰

**挑戰 1：SCSS 函數不能用在 CSS 變數上**
`lighten()` 和 `darken()` 這些 SCSS 函數只能在編譯時使用，無法動態計算 CSS 變數。

**解決方案：**
改用 CSS 的 `color-mix()` 函數：
```scss
// 原本（不行）
background: rgba($color-cta, 0.1);

// 改成（可以）
background: color-mix(in srgb, var(--color-cta) 10%, transparent);
```

**挑戰 2：舊瀏覽器相容性**
CSS 變數在 IE11 不支援，但考慮到目標用戶群都是用現代瀏覽器的開發者，就決定不做降級處理了。

## 部署與維護：持續優化的過程

網站上線不是終點，而是起點。我會定期檢視並優化：

**效能優化：**
- 壓縮 CSS 和 JavaScript
- 優化圖片大小
- 使用 preconnect 加速字體載入

**內容優化：**
- 定期發布高品質文章
- 修正錯字和不清楚的描述
- 根據讀者反饋調整內容

**功能擴充：**
- 加入文章標籤和分類
- 改善導航和搜尋體驗
- 考慮加入留言功能

## 給想做個人網站的你

如果你也想建立自己的個人網站，我有幾個建議：

**1. 不要怕不完美，先做再說**
我的網站也是從很陽春的版本慢慢進化而來。完美主義只會讓你永遠不敢開始。先上線，再慢慢優化。

**2. 技術細節不是重點，內容才是王道**
再炫的特效，沒有好內容也沒用。專注在寫好文章，技術只是輔助。

**3. 從套主題開始也沒關係**
如果設計不是你的強項，用現成的主題完全 OK。等累積一些經驗後，再考慮客製化。

**4. 定期更新很重要**
一個久未更新的網站，反而會給人負面印象。寧可少寫一點，也要保持更新頻率。

**5. 把它當作作品集**
網站本身就是你能力的展現。求職時可以直接把網站連結放在履歷上，讓面試官看到你的完整實力。

## 未來的規劃

這個網站還會持續進化，我計畫加入：
- **搜尋功能**：讓讀者能快速找到想看的文章
- **文章推薦**：根據標籤推薦相關文章
- **RSS 訂閱**：讓讀者能追蹤更新
- **效能監控**：持續優化載入速度

## 結語

做個人網站這件事，技術層面其實不難，真正的挑戰是**持續產出有價值的內容**。網站只是一個載體，你的思考、經驗、見解才是最珍貴的。

如果你也想建立自己的技術品牌，不妨從一個簡單的部落格開始。不用管別人怎麼看，先寫給未來的自己看。相信我，幾年後回頭看這些文章，你會很感謝當初的自己。

這個網站的所有原始碼都在 [GitHub](https://github.com/danny80916kimo/ryanliouWebsite) 上，歡迎參考。如果有任何問題或建議，也歡迎和我交流。

---

**2024-02-12 記於台北**
**2026-02-14 更新**
