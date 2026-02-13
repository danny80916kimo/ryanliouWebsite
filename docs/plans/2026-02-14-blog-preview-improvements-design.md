# Blog Post Preview Card Improvements - Design

## Goal

Improve homepage blog post preview cards with intelligent excerpt generation and better visual hierarchy.

## Problem

**Current Issues:**
1. **Excerpt logic**: Uses `post.excerpt` which takes the first paragraph - problematic when the first paragraph is a heading (e.g., "## 標題")
2. **Card layout**: Thumbnail appears at top, but time/title should be more prominent

## Solution

### 1. Intelligent Excerpt Generation

**Current approach:**
```liquid
{{ post.excerpt | strip_html | truncate: 150 }}
```

**New approach:**
```liquid
{% if post.description %}
  {{ post.description }}
{% else %}
  {{ post.content | strip_html | truncatewords: 50 }}
{% endif %}
```

**Benefits:**
- Uses full `post.content` instead of first paragraph
- `strip_html` removes all HTML tags and headings
- `truncatewords: 50` ≈ 150 characters (better for Chinese content)
- Optional `description` front matter for manual override

### 2. Card Layout Reordering

**Current order:**
Image → Meta (time/category) → Title → Excerpt → Tags

**New order:**
Time → Title → Thumbnail → Excerpt → Tags

**Visual hierarchy:**
1. **Time** (top, subtle) - establishes freshness
2. **Title** (prominent) - main hook
3. **Thumbnail** (visual interest) - supports the content
4. **Excerpt** (readable preview) - entices reader
5. **Tags** (bottom, subtle) - categorization

## Architecture

### Files to Modify

1. **`_includes/post-card.html`**
   - Restructure HTML elements
   - Implement intelligent excerpt logic
   - Remove category from meta

2. **`_sass/_components.scss`**
   - Adjust spacing for new layout
   - Update visual hierarchy
   - Remove category separator styles

## Implementation Details

### HTML Structure

```html
<a href="{{ post.url | relative_url }}" class="card card-clickable">
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

### CSS Updates

```scss
.card {
  .card-meta {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-muted);

    time {
      font-weight: 500;
    }
  }

  .card-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    line-height: 1.4;
    color: var(--text-primary);
  }

  .card-image {
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 16 / 9;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-excerpt {
    margin-bottom: 1rem;
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  .card-tags {
    margin-top: auto;
  }
}
```

## Testing Strategy

1. Test with posts that have headings as first paragraph
2. Test with posts without `header_image`
3. Test with posts with custom `description` in front matter
4. Test Chinese character truncation
5. Verify visual hierarchy on actual homepage

## Success Criteria

- ✅ Excerpts never show headings or HTML tags
- ✅ Excerpts are approximately 150 characters
- ✅ Card layout follows new visual hierarchy
- ✅ No layout breaks with/without images
- ✅ Responsive behavior maintained
