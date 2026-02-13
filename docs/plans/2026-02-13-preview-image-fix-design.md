# 文章卡片預覽圖修復 + 純 CSS 幾何裝飾

日期：2026-02-13

## 問題

1. `post-card.html` 只檢查 `post.header_image`（扁平格式），但文章 frontmatter 使用 `header.image`（巢狀格式），導致有設定圖片的文章卡片也不顯示圖片。
2. 使用者希望無圖文章能自動產生幾何裝飾，讓有圖與無圖文章能和諧共存。

## 設計

### Bug 修復

在 `post-card.html` 加入 `post.header.image` 的檢查，與 `post.html` 一致。

### 幾何裝飾 Placeholder

- 用標題字元碼做簡單 hash 運算，產生角度和位置參數
- 透過 CSS 自訂屬性傳入 placeholder
- CSS 使用 `linear-gradient` + `radial-gradient` 疊加
- 配色：網站主色系（綠色 #22C55E + 深色背景）
- 每篇文章產生獨特但風格一致的視覺

### 影響檔案

| 檔案 | 改動 |
|------|------|
| `_includes/post-card.html` | 加入 `header.image` 檢查 + hash 計算 |
| `_sass/_components.scss` | 更新 `.card-image-placeholder` 樣式 |

### 兩種文章共存

- 有圖：frontmatter 設定 `header.image` 或 `header_image` → 顯示實際圖片
- 無圖：不設定圖片 → 自動顯示幾何裝飾
- 不需要額外機制，兩種卡片自然混合顯示
