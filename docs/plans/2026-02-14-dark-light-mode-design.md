# Dark/Light 模式功能設計文件

## 目標

為個人部落格網站實作 Dark/Light 主題切換功能，預設跟隨系統設定，同時提供手動切換按鈕讓用戶可以覆蓋系統設定。

## 架構

使用 CSS 變數 + `data-theme` 屬性的現代化方案。系統支援三種主題狀態：
- `auto` - 跟隨系統設定（預設）
- `light` - 強制淺色模式
- `dark` - 強制深色模式

用戶偏好儲存在 localStorage，頁面載入時立即套用以避免閃爍。所有顏色使用 CSS 變數定義，JavaScript 只需切換 `<html>` 標籤的 `data-theme` 屬性。

## 技術堆疊

- **CSS**: CSS 自定義屬性（CSS Variables）+ SCSS
- **JavaScript**: 原生 JavaScript（無框架依賴）
- **儲存**: localStorage API
- **系統偵測**: `prefers-color-scheme` media query
- **Jekyll**: 現有的靜態網站生成器

## 配色方案

### Light 模式（柔和淺色系）
- 背景主色：`#F5F7FA`（淡藍灰）
- 背景次色：`#FFFFFF`（純白卡片）
- 文字主色：`#1E293B`（深藍灰）
- 文字次色：`#475569`（中灰）
- 文字淡色：`#64748B`（淡灰）
- 邊框顏色：`#E2E8F0`（淺灰）
- Accent 顏色：`#22C55E`（綠色，保持不變）
- 陰影：`rgba(0, 0, 0, 0.1)`

### Dark 模式（現有深色主題）
- 背景主色：`#0F172A`（深藍黑）
- 背景次色：`#1E293B`（深藍卡片）
- 文字主色：`#F8FAFC`（淺白）
- 文字次色：`#E2E8F0`（次要淺色）
- 文字淡色：`#9CA3AF`（灰色）
- 邊框顏色：`#334155`（深灰）
- Accent 顏色：`#22C55E`（綠色）
- 陰影：`rgba(0, 0, 0, 0.3)`

## 檔案結構

```
docs/
├── _sass/
│   ├── _variables.scss          # 保留現有 SCSS 變數
│   ├── _theme-variables.scss    # 新增：CSS 變數主題定義
│   ├── _components.scss          # 更新：改用 CSS 變數
│   ├── _layout.scss              # 更新：改用 CSS 變數
│   └── main.scss                 # 更新：匯入主題變數
├── assets/
│   └── js/
│       └── theme-switcher.js     # 新增：主題切換邏輯
└── _layouts/
    └── default.html               # 更新：加入按鈕和腳本
```

## 運作流程

1. 用戶訪問網站
2. `theme-switcher.js` 在 `<head>` 中立即執行
3. 從 localStorage 讀取 `theme` 設定（預設為 `auto`）
4. 如果是 `auto`，檢查 `prefers-color-scheme` media query
5. 在 `<html>` 設定 `data-theme="light"` 或 `data-theme="dark"`
6. CSS 變數根據 `data-theme` 套用對應顏色
7. 頁面渲染，使用 CSS transition 平滑過渡所有顏色變化
8. 用戶點擊切換按鈕 → 循環切換 `auto` → `light` → `dark` → `auto`
9. 新的偏好儲存到 localStorage

## UI/UX 設計

### 切換按鈕位置
- 位於導航列右側，在「關於我」連結之後
- 與其他導航項目對齊
- 視覺上屬於導航列的一部分

### 按鈕樣式
- 圓形按鈕（40px × 40px）
- 透明背景，細邊框
- Emoji 圖示：
  - `🌓` = Auto（跟隨系統）
  - `☀️` = Light（淺色模式）
  - `🌙` = Dark（深色模式）
- Hover 效果：背景變色、邊框高亮、旋轉 180 度

### 過渡動畫
- 所有顏色屬性使用 `transition: 200ms ease`
- 平滑淡入淡出，避免突兀
- 按鈕旋轉動畫增加互動趣味

### 可訪問性
- 按鈕包含 `aria-label` 描述當前模式
- 鍵盤可訪問（可用 Tab 聚焦）
- 高對比度配色符合 WCAG AA 標準

## 實作策略

### CSS 變數命名規範
使用語義化命名，而非直接顏色名稱：
- `--color-bg-primary` / `--color-bg-secondary`
- `--color-text-primary` / `--color-text-secondary` / `--color-text-muted`
- `--color-border`
- `--color-cta`
- `--color-shadow`

### 現有 SCSS 變數處理
保留現有 SCSS 變數作為 fallback，避免破壞現有程式碼。逐步將組件從 SCSS 變數遷移到 CSS 變數。

### JavaScript 最佳實踐
- IIFE 立即執行函數，避免全域污染
- 在 `<head>` 中內聯執行，防止閃爍（FOUT）
- 使用 `window.matchMedia()` 監聽系統主題變化
- Defensive programming：檢查 localStorage 可用性

## 邊界情況處理

### localStorage 不可用
如果瀏覽器禁用 localStorage（隱私模式等），降級為僅在當前 session 記住偏好。

### 系統主題變化
當用戶設定為 `auto` 模式時，監聽 `prefers-color-scheme` 的變化，自動同步切換。

### 無 JavaScript 環境
使用 CSS media query 作為 fallback：
```css
@media (prefers-color-scheme: dark) {
  :root {
    /* 套用深色變數 */
  }
}
```

### 舊瀏覽器相容性
CSS 變數在 IE11 不支援，但目標用戶群主要使用現代瀏覽器，可接受降級體驗。

## 測試計畫

### 功能測試
- [ ] 首次訪問：確認預設跟隨系統設定
- [ ] 手動切換：測試三種狀態循環
- [ ] localStorage 持久化：關閉瀏覽器後重開，確認記住偏好
- [ ] 系統設定變化：在 `auto` 模式下改變系統主題，確認自動同步
- [ ] 無 localStorage：測試隱私模式下的降級行為

### 視覺測試
- [ ] Light 模式：所有頁面正確套用淺色主題
- [ ] Dark 模式：所有頁面正確套用深色主題
- [ ] 顏色對比度：確認文字可讀性符合 WCAG AA
- [ ] 過渡動畫：切換時顏色平滑過渡
- [ ] 按鈕互動：hover/focus 狀態正確顯示

### 跨瀏覽器測試
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Mobile browsers

### 效能測試
- [ ] 首次渲染無閃爍（FCP）
- [ ] 切換主題反應迅速（< 300ms）
- [ ] 無 layout shift

## 成功標準

- ✅ 預設跟隨系統主題設定
- ✅ 用戶可手動切換並覆蓋系統設定
- ✅ 偏好永久儲存在 localStorage
- ✅ 頁面載入無主題閃爍
- ✅ 切換動畫平滑自然（200ms）
- ✅ Light 模式使用柔和淺色系配色
- ✅ Dark 模式保持現有深色主題
- ✅ 所有文字符合可訪問性對比標準
- ✅ 切換按鈕位於導航列，易於發現和使用
- ✅ 支援鍵盤操作和螢幕閱讀器

## 未來擴充可能性

- 新增更多主題選項（例如：高對比模式、護眼模式）
- 自定義配色編輯器
- 根據時間自動切換（日出日落）
- 主題預覽功能（切換前預覽）
- 主題同步到其他裝置（需要後端支援）
