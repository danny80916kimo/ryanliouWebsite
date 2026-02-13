# Blog Post Preview Card Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve homepage blog post preview cards with intelligent excerpt generation and better visual hierarchy.

**Architecture:** Modify existing post-card.html component to reorder elements (Time → Title → Thumbnail → Excerpt → Tags) and implement intelligent excerpt logic using post.content instead of post.excerpt. Update component styles to match new layout hierarchy.

**Tech Stack:** Jekyll 4.3.3, Liquid templating, SCSS/Sass

---

## Task 1: Restructure Post Card HTML

**Files:**
- Modify: `docs/_includes/post-card.html`

**Step 1: Read current post-card.html**

Run: Read the file to understand current structure
Expected: See current order (image → meta → title → excerpt → tags)

**Step 2: Backup current structure in a comment**

Add a comment at the top documenting the change:
```html
{%- comment -%}
  Updated 2026-02-14: Reordered layout for better visual hierarchy
  New order: Time → Title → Thumbnail → Excerpt → Tags
{%- endcomment -%}
```

Expected: Comment added for future reference

**Step 3: Reorder HTML elements**

Replace the entire card structure with:
```html
<a href="{{ post.url | relative_url }}" class="card card-clickable">
  {%- comment -%}
    Updated 2026-02-14: Reordered layout for better visual hierarchy
    New order: Time → Title → Thumbnail → Excerpt → Tags
  {%- endcomment -%}

  <!-- 1. Time at top -->
  <div class="card-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%Y年%m月%d日" }}
    </time>
  </div>

  <!-- 2. Title -->
  <h3 class="card-title">{{ post.title }}</h3>

  <!-- 3. Thumbnail (if exists) -->
  {% if post.header_image %}
    <div class="card-image">
      <img src="{{ post.header_image | relative_url }}"
           alt="{{ post.title }}"
           loading="lazy">
    </div>
  {% endif %}

  <!-- 4. Intelligent excerpt -->
  <p class="card-excerpt">
    {% if post.description %}
      {{ post.description }}
    {% else %}
      {{ post.content | strip_html | truncatewords: 50 }}
    {% endif %}
  </p>

  <!-- 5. Tags at bottom -->
  {% if post.tags %}
    <div class="card-tags">
      {% for tag in post.tags limit:3 %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</a>
```

Expected: HTML reordered, category removed from meta, intelligent excerpt logic added

**Step 4: Verify Jekyll builds**

Run: `bundle exec jekyll build`
Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add docs/_includes/post-card.html
git commit -m "refactor: restructure post card HTML for better hierarchy

- Reorder elements: Time → Title → Thumbnail → Excerpt → Tags
- Implement intelligent excerpt using post.content
- Add optional post.description override
- Remove category from card meta

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 2: Update Card Component Styles

**Files:**
- Modify: `docs/_sass/_components.scss`

**Step 1: Read current component styles**

Run: Read `docs/_sass/_components.scss` and locate the `.card` styles
Expected: See current spacing and layout styles

**Step 2: Update .card-meta styles**

Find the `.card-meta` selector and update:
```scss
.card-meta {
  margin-bottom: 0.75rem; // Reduced spacing since no image above
  font-size: 0.875rem;
  color: var(--text-muted);

  time {
    font-weight: 500;
  }

  // Remove any category-related styles (span separator, etc.)
}
```

Expected: Meta spacing reduced, category styles removed

**Step 3: Update .card-title styles**

Find the `.card-title` selector and update:
```scss
.card-title {
  margin-bottom: 1rem; // Space before image
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--text-primary);
}
```

Expected: Title has breathing room before image

**Step 4: Update .card-image styles**

Find the `.card-image` selector and update:
```scss
.card-image {
  margin-bottom: 1rem; // Space between image and excerpt
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9; // Maintain consistent aspect ratio

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

Expected: Image has consistent aspect ratio and proper spacing

**Step 5: Update .card-excerpt styles**

Find the `.card-excerpt` selector and update:
```scss
.card-excerpt {
  margin-bottom: 1rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

Expected: Excerpt is readable but visually secondary

**Step 6: Update .card-tags styles**

Find the `.card-tags` selector and ensure:
```scss
.card-tags {
  margin-top: auto; // Push to bottom if card has flex layout
  // Keep existing tag styles
}
```

Expected: Tags stay at bottom

**Step 7: Verify Jekyll builds**

Run: `bundle exec jekyll build`
Expected: Build succeeds with no errors

**Step 8: Commit**

```bash
git add docs/_sass/_components.scss
git commit -m "style: update card component styles for new layout

- Adjust spacing for new element order
- Add consistent aspect ratio to card images
- Update visual hierarchy (time subtle, title prominent)
- Remove category separator styles

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

Expected: Changes committed

---

## Task 3: Visual Testing and Verification

**Files:**
- Test: `docs/_layouts/home.html` (no changes, just testing)

**Step 1: Start Jekyll development server**

Run: `bundle exec jekyll serve --detach --port 4002`
Expected: Server starts successfully on port 4002

**Step 2: Visual inspection checklist**

Manually verify on http://127.0.0.1:4002/ryanliouWebsite/:
- [ ] Cards show time at top (subtle, muted color)
- [ ] Title is prominent below time
- [ ] Thumbnail appears below title (if post has header_image)
- [ ] Excerpt is approximately 150 characters
- [ ] Excerpt doesn't contain HTML tags or heading markers
- [ ] Tags appear at bottom
- [ ] Layout works for cards with/without images
- [ ] Responsive behavior maintained on smaller screens

Expected: All checkpoints pass

**Step 3: Test with posts that have headings as first paragraph**

Identify posts where first paragraph is a heading (e.g., starts with ##)
Verify excerpt shows actual content, not the heading

Expected: Excerpts show content, not headings

**Step 4: Test optional description override**

If any post has `description` in front matter, verify it shows instead of auto-excerpt

Expected: Custom description takes precedence

**Step 5: Stop development server**

Run: `pkill -f jekyll`
Expected: Server stopped

**Step 6: Document verification**

No commit needed - testing only

---

## Success Criteria

- ✅ Post cards display in new order: Time → Title → Thumbnail → Excerpt → Tags
- ✅ Excerpts use `post.content` with `strip_html` and `truncatewords: 50`
- ✅ Excerpts never show HTML tags or heading markers (##, ###, etc.)
- ✅ Optional `description` front matter override works
- ✅ Visual hierarchy is clear (time subtle, title prominent)
- ✅ Layout works with and without header images
- ✅ Jekyll builds successfully
- ✅ All visual testing checkpoints pass
