# Dark/Light 模式實作計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 實作 Dark/Light 主題切換功能，預設跟隨系統設定，提供手動切換按鈕，使用 localStorage 儲存偏好

**Architecture:** 使用 CSS 變數 + data-theme 屬性方案。JavaScript 在頁面載入時立即設定 `<html data-theme="light|dark">`，CSS 變數根據 data-theme 套用不同顏色。切換按鈕循環三種狀態：auto（跟隨系統）→ light → dark → auto。

**Tech Stack:** Jekyll 4.3.3, SCSS, 原生 JavaScript, CSS Variables, localStorage API

---

## Task 1: 建立 CSS 主題變數檔案

**Files:**
- Create: `docs/_sass/_theme-variables.scss`
- Modify: `docs/_sass/main.scss`

**Step 1: 建立主題變數檔案**

Create `docs/_sass/_theme-variables.scss`:

```scss
// CSS Variables for Light/Dark Themes
// Light mode is default, dark mode uses [data-theme="dark"]

:root {
  // Light Mode - Soft pastel color scheme
  --color-bg-primary: #F5F7FA;
  --color-bg-secondary: #FFFFFF;
  --color-text-primary: #1E293B;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
  --color-cta: #22C55E;
  --color-shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  // Dark Mode - Current tech dark theme
  --color-bg-primary: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #E2E8F0;
  --color-text-muted: #9CA3AF;
  --color-border: #334155;
  --color-cta: #22C55E;
  --color-shadow: rgba(0, 0, 0, 0.3);
}

// Smooth transitions for theme switching
* {
  transition: background-color 200ms ease,
              color 200ms ease,
              border-color 200ms ease;
}
```

Expected: 檔案建立完成

**Step 2: 在 main.scss 匯入主題變數**

Read: `docs/_sass/main.scss` to see current imports

Expected: See list of @import statements

**Step 3: 在第一行匯入主題變數**

Modify `docs/_sass/main.scss`, add at the very top:

```scss
// Theme Variables - Must be first for CSS variables to work
@import "theme-variables";

// Existing imports...
@import "variables";
```

Expected: Theme variables loaded before other styles

**Step 4: 驗證 Jekyll 建置**

Run: `bundle exec jekyll build`
Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add docs/_sass/_theme-variables.scss docs/_sass/main.scss
git commit -m "feat: add CSS theme variables for light/dark mode

- Create theme-variables.scss with light/dark color schemes
- Light mode uses soft pastel colors (default)
- Dark mode uses current tech dark theme
- Add 200ms smooth transitions for theme switching

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 2: 更新基礎樣式使用 CSS 變數

**Files:**
- Modify: `docs/_sass/_base.scss`

**Step 1: 讀取現有 base.scss**

Run: Read `docs/_sass/_base.scss`
Expected: See current body and html styles using SCSS variables

**Step 2: 更新 body 背景和文字顏色**

Modify `docs/_sass/_base.scss`, find body selector and update:

```scss
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  // Keep other existing properties
}
```

Expected: Body uses CSS variables instead of SCSS variables

**Step 3: 更新連結顏色**

Find `a` selector and update:

```scss
a {
  color: var(--color-cta);
  // Keep other existing properties
}
```

Expected: Links use CSS variable

**Step 4: 驗證建置**

Run: `bundle exec jekyll build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add docs/_sass/_base.scss
git commit -m "refactor: migrate base styles to CSS variables

- Update body background and text colors
- Update link colors to use CSS variables
- Enables theme switching support

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 3: 更新組件樣式使用 CSS 變數

**Files:**
- Modify: `docs/_sass/_components.scss`

**Step 1: 讀取 components.scss**

Run: Read `docs/_sass/_components.scss`
Expected: See card, button components using $color-primary, $color-text etc.

**Step 2: 更新 .card 元件**

Find `.card` selector and update colors:

```scss
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  // Keep other properties unchanged

  &:hover {
    border-color: lighten(var(--color-border), 10%); // This won't work, need different approach
  }
}
```

Wait - lighten() doesn't work with CSS variables. Update to:

```scss
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  // Keep other properties

  &:hover {
    border-color: var(--color-cta);
  }
}
```

Expected: Card background and borders use CSS variables

**Step 3: 更新卡片標題和文字**

Update `.card-title`, `.card-meta`, `.card-excerpt`:

```scss
.card-title {
  color: var(--color-text-primary);
  // Keep other properties
}

.card-meta {
  color: var(--color-text-muted);
  // Keep other properties
}

.card-excerpt {
  color: var(--color-text-secondary);
  // Keep other properties
}
```

Expected: Card text elements use CSS variables

**Step 4: 更新按鈕樣式**

Find `.btn`, `.btn-secondary` and update:

```scss
.btn {
  background: var(--color-cta);
  color: var(--color-bg-primary); // White text on green
  border: 2px solid var(--color-cta);
  // Keep other properties
}

.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);

  &:hover {
    background: var(--color-bg-secondary);
    border-color: var(--color-cta);
    color: var(--color-cta);
  }
}
```

Expected: Buttons use CSS variables

**Step 5: 驗證建置**

Run: `bundle exec jekyll build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add docs/_sass/_components.scss
git commit -m "refactor: migrate component styles to CSS variables

- Update card backgrounds, borders, text colors
- Update button styles to use theme variables
- Remove SCSS color functions (lighten) incompatible with CSS vars

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 4: 更新佈局樣式使用 CSS 變數

**Files:**
- Modify: `docs/_sass/_layout.scss`

**Step 1: 讀取 layout.scss**

Run: Read `docs/_sass/_layout.scss`
Expected: See header, footer, nav styles

**Step 2: 更新 .site-header**

Find `.site-header` and update:

```scss
.site-header {
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  // Keep other properties
}
```

Expected: Header uses CSS variables

**Step 3: 更新導航連結**

Find `.nav-link` and update:

```scss
.nav-link {
  color: var(--color-text-secondary);

  &:hover,
  &.active {
    color: var(--color-cta);
  }
}
```

Expected: Nav links use CSS variables

**Step 4: 更新 footer**

Find `.site-footer` and update:

```scss
.site-footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  // Keep other properties
}
```

Expected: Footer uses CSS variables

**Step 5: 驗證建置**

Run: `bundle exec jekyll build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add docs/_sass/_layout.scss
git commit -m "refactor: migrate layout styles to CSS variables

- Update header, footer backgrounds and borders
- Update navigation link colors
- Enables theme switching for layout elements

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 5: 建立主題切換 JavaScript

**Files:**
- Create: `docs/assets/js/theme-switcher.js`

**Step 1: 建立 JavaScript 檔案**

Create `docs/assets/js/theme-switcher.js`:

```javascript
// Theme Switcher - Handles light/dark mode
// Executes immediately to prevent flash of wrong theme (FOUT)
(function() {
  'use strict';

  // Get saved theme preference, default to 'auto'
  function getSavedTheme() {
    try {
      return localStorage.getItem('theme') || 'auto';
    } catch (e) {
      // localStorage not available (privacy mode, etc.)
      return 'auto';
    }
  }

  // Determine actual theme to apply based on preference
  function getEffectiveTheme(preference) {
    if (preference === 'auto') {
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return preference;
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Save theme preference
  function saveTheme(preference) {
    try {
      localStorage.setItem('theme', preference);
    } catch (e) {
      // Silently fail if localStorage not available
    }
  }

  // Initialize theme on page load
  const savedTheme = getSavedTheme();
  applyTheme(getEffectiveTheme(savedTheme));

  // Listen for system theme changes (only when in auto mode)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', function(e) {
    if (getSavedTheme() === 'auto') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle theme function (exposed globally for button)
  window.toggleTheme = function() {
    const current = getSavedTheme();
    // Cycle: auto → light → dark → auto
    const next = current === 'auto' ? 'light' :
                 current === 'light' ? 'dark' : 'auto';

    saveTheme(next);
    applyTheme(getEffectiveTheme(next));
    updateThemeButton(next);
  };

  // Update button icon to reflect current state
  function updateThemeButton(preference) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const icons = {
      'auto': '🌓',
      'light': '☀️',
      'dark': '🌙'
    };

    const labels = {
      'auto': '自動（跟隨系統）',
      'light': '淺色模式',
      'dark': '深色模式'
    };

    btn.textContent = icons[preference];
    btn.setAttribute('aria-label', '切換主題（目前：' + labels[preference] + '）');
  }

  // Initialize button on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateThemeButton(getSavedTheme());
    });
  } else {
    updateThemeButton(getSavedTheme());
  }
})();
```

Expected: JavaScript 檔案建立完成

**Step 2: 驗證 JavaScript 語法**

檢查檔案沒有語法錯誤

Expected: Clean JavaScript, no syntax errors

**Step 3: Commit**

```bash
git add docs/assets/js/theme-switcher.js
git commit -m "feat: add theme switcher JavaScript

- Implements auto/light/dark theme cycling
- Reads from localStorage, defaults to auto
- Listens to system theme changes in auto mode
- Prevents flash of unstyled content (FOUT)
- Provides window.toggleTheme() for button

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 6: 在 HTML 中加入主題切換腳本和按鈕

**Files:**
- Modify: `docs/_layouts/default.html`
- Modify: `docs/_sass/_components.scss`

**Step 1: 讀取 default.html**

Run: Read `docs/_layouts/default.html`
Expected: See <head> and <nav> sections

**Step 2: 在 <head> 加入 theme-switcher.js（必須在最前面）**

Modify `docs/_layouts/default.html`, add script right after opening <head> tag:

```html
<head>
  <meta charset="UTF-8">

  <!-- Theme Switcher - Load FIRST to prevent flash -->
  <script src="{{ site.baseurl }}/assets/js/theme-switcher.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Rest of head... -->
```

Expected: Script loads before any styling to prevent flash

**Step 3: 在導航列加入切換按鈕**

Find the `<ul class="nav-links">` section and add button as last item:

```html
<ul class="nav-links">
  <li>
    <a href="{{ site.baseurl }}/" class="nav-link {% if page.url == '/' %}active{% endif %}">
      首頁
    </a>
  </li>
  <li>
    <a href="{{ site.baseurl }}/about/" class="nav-link {% if page.url contains '/about' %}active{% endif %}">
      關於我
    </a>
  </li>
  <li>
    <button id="theme-toggle"
            class="theme-toggle"
            onclick="toggleTheme()"
            aria-label="切換主題">
      🌓
    </button>
  </li>
</ul>
```

Expected: Button added to navigation

**Step 4: 加入按鈕樣式**

Modify `docs/_sass/_components.scss`, add at the end:

```scss
// Theme Toggle Button
.theme-toggle {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: $radius-full;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all $transition-base;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: var(--color-bg-secondary);
    border-color: var(--color-cta);
    transform: rotate(180deg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-cta);
    outline-offset: 2px;
  }
}
```

Expected: Button styling added

**Step 5: 驗證建置**

Run: `bundle exec jekyll build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add docs/_layouts/default.html docs/_sass/_components.scss
git commit -m "feat: add theme toggle button to navigation

- Add theme-switcher.js to head (load first)
- Add toggle button to nav-links
- Style button with hover rotation effect
- Ensure keyboard accessibility

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 7: 測試與調整

**Files:**
- Test: All pages visually

**Step 1: 啟動開發伺服器**

Run: `bundle exec jekyll serve --detach --port 4003`
Expected: Server starts on http://127.0.0.1:4003/ryanliouWebsite/

**Step 2: 視覺測試 Light 模式**

Open http://127.0.0.1:4003/ryanliouWebsite/ in browser

檢查清單：
- [ ] 背景是淺色（#F5F7FA）
- [ ] 文字清晰可讀（深色文字）
- [ ] 卡片有白色背景
- [ ] 邊框可見但柔和
- [ ] 綠色 accent 突出
- [ ] 切換按鈕顯示正確圖示

Expected: Light 模式視覺正確

**Step 3: 測試切換到 Dark 模式**

點擊切換按鈕（🌓 → ☀️ → 🌙）

檢查：
- [ ] 背景變為深色（#0F172A）
- [ ] 文字變為淺色
- [ ] 卡片深藍色背景
- [ ] 切換動畫平滑（200ms）
- [ ] 按鈕圖示變為 🌙

Expected: Dark 模式正常運作

**Step 4: 測試 localStorage 持久化**

1. 切換到 Light 模式
2. 重新整理頁面
3. 確認仍是 Light 模式

Expected: 偏好被記住

**Step 5: 測試 Auto 模式**

1. 點擊按鈕回到 🌓（Auto）
2. 在系統設定中切換深淺色模式
3. 確認網站自動跟隨

Expected: Auto 模式跟隨系統設定

**Step 6: 停止伺服器**

Run: `pkill -f jekyll`
Expected: Server stopped

**Step 7: 文件測試結果**

如果發現問題，記錄並修正。如果一切正常，無需 commit（僅測試）

Expected: 測試完成

---

## Success Criteria

完成後應達成：

- ✅ CSS 變數定義兩套完整的主題配色
- ✅ 所有元件（base, components, layout）使用 CSS 變數
- ✅ JavaScript 正確實作三種狀態切換
- ✅ localStorage 儲存用戶偏好
- ✅ 切換按鈕位於導航列，樣式美觀
- ✅ 主題切換動畫平滑（200ms）
- ✅ Light 模式使用柔和淺色系
- ✅ Dark 模式保持原有深色主題
- ✅ Auto 模式正確跟隨系統設定
- ✅ 頁面載入無主題閃爍（FOUT）
- ✅ Jekyll 建置無錯誤
