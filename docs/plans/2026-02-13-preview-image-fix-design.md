# 文章卡片預覽圖修復 + 純 CSS 幾何裝飾 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix preview image display bug in post cards and add CSS geometric placeholder for posts without images.

**Architecture:** Fix the Liquid template conditional to support both `header.image` (nested) and `header_image` (flat) frontmatter formats. Add a Liquid-computed hash based on title length and date to generate unique CSS custom properties, which drive `linear-gradient` and `radial-gradient` layers for geometric placeholders.

**Tech Stack:** Jekyll, Liquid templates, SCSS

---

## Task 1: Fix preview image bug in post-card.html

**Files:**
- Modify: `docs/_includes/post-card.html:1-8`

**Step 1: Update the image conditional**

Replace lines 1-8 of `docs/_includes/post-card.html` with:

```liquid
<a href="{{ post.url | relative_url }}" class="card card-clickable" aria-label="Read article: {{ post.title }}">
  {% if post.header_image %}
  <div class="card-image">
    <img src="{{ post.header_image | relative_url }}" alt="{{ post.title }}" loading="lazy">
  </div>
  {% elsif post.header.image %}
  <div class="card-image">
    <img src="{{ post.header.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
  </div>
  {% else %}
  <div class="card-image-placeholder"></div>
  {% endif %}
```

This mirrors the same dual-format check already used in `docs/_layouts/post.html`.

**Step 2: Verify locally**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll build`
Expected: Build succeeds. Check `_site/index.html` to confirm the post with `header.image` now renders an `<img>` tag instead of `.card-image-placeholder`.

**Step 3: Commit**

```bash
git add docs/_includes/post-card.html
git commit -m "fix: support nested header.image format in post cards"
```

---

## Task 2: Add geometric placeholder with Liquid hash + CSS custom properties

**Files:**
- Modify: `docs/_includes/post-card.html` (the `else` branch)
- Modify: `docs/_sass/_components.scss:135-145`

**Step 1: Add Liquid hash computation to post-card.html**

Replace the `else` branch placeholder line in `docs/_includes/post-card.html`:

```liquid
  {% else %}
  {% assign title_size = post.title | size %}
  {% assign day = post.date | date: "%j" | plus: 0 %}
  {% assign seed = title_size | times: 7 | plus: day %}
  {% assign angle = seed | modulo: 360 %}
  {% assign x = seed | times: 13 | modulo: 100 %}
  {% assign y = seed | times: 37 | modulo: 100 %}
  <div class="card-image-placeholder"
       style="--angle: {{ angle }}deg; --x: {{ x }}%; --y: {{ y }}%;">
  </div>
  {% endif %}
```

This computes 3 values from `title.size` and day-of-year:
- `--angle`: gradient rotation (0-359deg)
- `--x`: radial gradient X position (0-99%)
- `--y`: radial gradient Y position (0-99%)

**Step 2: Update `.card-image-placeholder` CSS**

Replace the `.card-image-placeholder` block in `docs/_sass/_components.scss` (lines 135-145) with:

```scss
.card-image-placeholder {
  width: 100%;
  height: 200px;
  border-radius: $radius-md;
  margin-bottom: $space-md;
  background:
    linear-gradient(var(--angle, 135deg), rgba($color-cta, 0.15) 0%, transparent 50%),
    radial-gradient(circle at var(--x, 30%) var(--y, 40%), rgba($color-cta, 0.2) 0%, transparent 50%),
    radial-gradient(circle at calc(100% - var(--x, 30%)) calc(100% - var(--y, 40%)), rgba($color-cta, 0.1) 0%, transparent 40%),
    linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);

  @media (min-width: $breakpoint-md) {
    height: 250px;
  }
}
```

This layers:
1. A green semi-transparent diagonal band (angle varies per post)
2. A green glow circle (position varies per post)
3. A secondary subtle glow at the opposite corner
4. The original dark gradient base

**Step 3: Build and verify**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll build`
Expected: Build succeeds. Posts without images should each have a visually distinct placeholder.

**Step 4: Serve locally and visually inspect**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll serve`
Expected: Open `http://localhost:4000` and verify:
- Post "利用Jenkyll來製作自己的小部落格吧" shows its actual `post1header.png` image
- Other posts show unique geometric placeholders (different gradient angles/positions)
- All cards have consistent height and spacing

**Step 5: Commit**

```bash
git add docs/_includes/post-card.html docs/_sass/_components.scss
git commit -m "feat: add CSS geometric placeholders for posts without images"
```
