# Custom Jekyll Theme Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a custom tech-focused Jekyll theme with futuristic dark design, replacing Minimal Mistakes theme while maintaining all existing content.

**Architecture:** Custom Jekyll layouts with modular SCSS architecture. Dark theme with neon green accents (#22C55E), Space Grotesk headings + DM Sans body. Card-based article listings with optional cover images. Complete mobile-first responsive design.

**Tech Stack:** Jekyll 4.3.3, Liquid templates, SCSS (no Sass frameworks), HTML5, CSS Grid/Flexbox, Google Fonts

**Design System:** See `design-system/ryan-liou-tech-blog/MASTER.md` for complete color palette, typography, spacing tokens, and component specs.

---

## Task 1: Setup Design System Variables

**Files:**
- Create: `docs/_sass/_variables.scss`
- Modify: `docs/assets/css/main.scss`

### Step 1: Write SCSS variables file

Create `docs/_sass/_variables.scss`:

```scss
// Color Palette - Tech Dark Theme
$color-primary: #1E293B;
$color-secondary: #334155;
$color-cta: #22C55E;
$color-background: #0F172A;
$color-text: #F8FAFC;
$color-text-muted: #94A3B8;
$color-border: #334155;

// Spacing Scale
$space-xs: 0.25rem;  // 4px
$space-sm: 0.5rem;   // 8px
$space-md: 1rem;     // 16px
$space-lg: 1.5rem;   // 24px
$space-xl: 2rem;     // 32px
$space-2xl: 3rem;    // 48px
$space-3xl: 4rem;    // 64px

// Typography
$font-heading: 'Space Grotesk', sans-serif;
$font-body: 'DM Sans', sans-serif;
$font-code: 'Fira Code', monospace;

$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;
$font-size-xl: 24px;
$font-size-2xl: 32px;
$font-size-3xl: 48px;

$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

// Shadows
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

// Border Radius
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-xl: 16px;
$radius-full: 9999px;

// Transitions
$transition-fast: 150ms ease;
$transition-base: 200ms ease;
$transition-slow: 300ms ease;

// Breakpoints
$breakpoint-sm: 375px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1440px;

// Z-index Scale
$z-dropdown: 1000;
$z-sticky: 1020;
$z-fixed: 1030;
$z-modal-backdrop: 1040;
$z-modal: 1050;
$z-popover: 1060;
$z-tooltip: 1070;
```

### Step 2: Update main.scss to use new variables

Replace `docs/assets/css/main.scss` content:

```scss
---
# Only the main Sass file needs front matter
---

@charset "utf-8";

// Google Fonts Import
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

// Import variables first
@import "variables";

// Import other partials (to be created)
@import "base";
@import "layout";
@import "components";
@import "animations";
```

### Step 3: Verify SCSS compiles

Run: `bundle exec jekyll build`

Expected: Build succeeds, no SCSS errors

### Step 4: Commit

```bash
git add docs/_sass/_variables.scss docs/assets/css/main.scss
git commit -m "feat: add design system SCSS variables

- Add color palette (dark theme + neon green)
- Add spacing scale and typography tokens
- Add shadow, radius, transition variables
- Import Google Fonts (Space Grotesk, DM Sans, Fira Code)
- Setup main.scss structure for modular imports

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Base Styles Setup

**Files:**
- Create: `docs/_sass/_base.scss`

### Step 1: Write base styles

Create `docs/_sass/_base.scss`:

```scss
// CSS Reset & Base Styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: $font-size-base;
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}

body {
  font-family: $font-body;
  font-size: $font-size-base;
  line-height: $line-height-normal;
  color: $color-text;
  background-color: $color-background;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Typography
h1, h2, h3, h4, h5, h6 {
  font-family: $font-heading;
  font-weight: 600;
  line-height: $line-height-tight;
  color: $color-text;
  margin-bottom: $space-md;
}

h1 { font-size: $font-size-3xl; }
h2 { font-size: $font-size-2xl; }
h3 { font-size: $font-size-xl; }
h4 { font-size: $font-size-lg; }
h5, h6 { font-size: $font-size-base; }

p {
  margin-bottom: $space-md;
  line-height: $line-height-relaxed;
}

a {
  color: $color-cta;
  text-decoration: none;
  transition: opacity $transition-base;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid $color-cta;
    outline-offset: 2px;
    border-radius: $radius-sm;
  }
}

// Code blocks
code {
  font-family: $font-code;
  font-size: $font-size-sm;
  background: $color-primary;
  padding: 2px 6px;
  border-radius: $radius-sm;
  color: $color-cta;
}

pre {
  background: $color-primary;
  padding: $space-lg;
  border-radius: $radius-lg;
  overflow-x: auto;
  margin-bottom: $space-lg;

  code {
    background: none;
    padding: 0;
  }
}

// Images
img {
  max-width: 100%;
  height: auto;
  display: block;
}

// Lists
ul, ol {
  margin-bottom: $space-md;
  padding-left: $space-xl;
}

li {
  margin-bottom: $space-sm;
}

// Selection
::selection {
  background: $color-cta;
  color: $color-background;
}

// Focus visible
:focus-visible {
  outline: 2px solid $color-cta;
  outline-offset: 2px;
}
```

### Step 2: Rebuild and check

Run: `bundle exec jekyll build`

Expected: Build succeeds with new base styles

### Step 3: Commit

```bash
git add docs/_sass/_base.scss
git commit -m "feat: add base styles and typography

- CSS reset with box-sizing
- Base typography (Space Grotesk + DM Sans)
- Code block styling with Fira Code
- Link and focus states
- Accessibility (reduced-motion, focus-visible)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Layout Styles

**Files:**
- Create: `docs/_sass/_layout.scss`

### Step 1: Write layout styles

Create `docs/_sass/_layout.scss`:

```scss
// Container
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $space-lg;

  @media (max-width: $breakpoint-md) {
    padding: 0 $space-md;
  }
}

.container-narrow {
  max-width: 800px;
}

// Main layout grid
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-content {
  flex: 1;
  padding-top: $space-3xl;
  padding-bottom: $space-3xl;

  @media (max-width: $breakpoint-md) {
    padding-top: $space-2xl;
    padding-bottom: $space-2xl;
  }
}

// Grid layouts
.grid {
  display: grid;
  gap: $space-xl;

  @media (max-width: $breakpoint-md) {
    gap: $space-lg;
  }
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

// Flexbox utilities
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.gap-sm { gap: $space-sm; }
.gap-md { gap: $space-md; }
.gap-lg { gap: $space-lg; }
.gap-xl { gap: $space-xl; }

// Spacing utilities
.mt-xl { margin-top: $space-xl; }
.mt-2xl { margin-top: $space-2xl; }
.mb-xl { margin-bottom: $space-xl; }
.mb-2xl { margin-bottom: $space-2xl; }
```

### Step 2: Rebuild and check

Run: `bundle exec jekyll build`

Expected: Build succeeds with layout utilities

### Step 3: Commit

```bash
git add docs/_sass/_layout.scss
git commit -m "feat: add layout styles and utilities

- Container with max-width 1200px
- Responsive grid systems (2col, 3col)
- Flexbox utilities
- Spacing utilities

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Component Styles (Cards, Buttons, Header)

**Files:**
- Create: `docs/_sass/_components.scss`

### Step 1: Write component styles

Create `docs/_sass/_components.scss`:

```scss
// Buttons
.btn {
  display: inline-flex;
  align-items: center;
  gap: $space-sm;
  padding: 12px 24px;
  border-radius: $radius-md;
  font-family: $font-heading;
  font-weight: 600;
  font-size: $font-size-base;
  transition: all $transition-base;
  cursor: pointer;
  border: none;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid $color-cta;
    outline-offset: 2px;
  }
}

.btn-primary {
  background: $color-cta;
  color: $color-background;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

.btn-secondary {
  background: transparent;
  color: $color-cta;
  border: 2px solid $color-cta;

  &:hover {
    background: rgba($color-cta, 0.1);
  }
}

// Cards
.card {
  background: $color-primary;
  border-radius: $radius-lg;
  padding: $space-xl;
  box-shadow: $shadow-md;
  transition: all $transition-base;
  border: 1px solid $color-border;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
    border-color: rgba($color-cta, 0.3);
  }
}

.card-clickable {
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $radius-md;
  margin-bottom: $space-md;
}

.card-title {
  font-size: $font-size-xl;
  margin-bottom: $space-sm;
  color: $color-text;
}

.card-meta {
  display: flex;
  gap: $space-md;
  align-items: center;
  font-size: $font-size-sm;
  color: $color-text-muted;
  margin-bottom: $space-md;
}

.card-excerpt {
  color: $color-text-muted;
  line-height: $line-height-relaxed;
  margin-bottom: $space-md;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $space-sm;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba($color-cta, 0.1);
  color: $color-cta;
  border-radius: $radius-full;
  font-size: $font-size-sm;
  font-weight: 500;
  transition: background $transition-base;

  &:hover {
    background: rgba($color-cta, 0.2);
  }
}

// Site Header
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba($color-background, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $color-border;
  padding: $space-lg 0;
  z-index: $z-sticky;

  @media (max-width: $breakpoint-md) {
    padding: $space-md 0;
  }
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-logo {
  font-family: $font-heading;
  font-size: $font-size-xl;
  font-weight: 700;
  color: $color-text;

  span {
    color: $color-cta;
  }
}

.nav-links {
  display: flex;
  gap: $space-xl;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: $breakpoint-md) {
    gap: $space-lg;
  }
}

.nav-link {
  color: $color-text;
  font-weight: 500;
  transition: color $transition-base;

  &:hover {
    color: $color-cta;
  }

  &.active {
    color: $color-cta;
  }
}

// Site Footer
.site-footer {
  background: $color-primary;
  border-top: 1px solid $color-border;
  padding: $space-2xl 0 $space-xl;
  margin-top: $space-3xl;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    flex-direction: column;
    gap: $space-lg;
    text-align: center;
  }
}

.footer-text {
  color: $color-text-muted;
  font-size: $font-size-sm;
}

.social-links {
  display: flex;
  gap: $space-md;
  list-style: none;
  padding: 0;
  margin: 0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $radius-full;
  background: rgba($color-cta, 0.1);
  color: $color-cta;
  transition: all $transition-base;

  &:hover {
    background: $color-cta;
    color: $color-background;
    transform: translateY(-2px);
  }
}

// Hero Section
.hero {
  padding: $space-3xl 0;
  text-align: center;

  @media (max-width: $breakpoint-md) {
    padding: $space-2xl 0;
  }
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: $space-md;

  span {
    color: $color-cta;
  }
}

.hero-subtitle {
  font-size: $font-size-xl;
  color: $color-text-muted;
  max-width: 600px;
  margin: 0 auto $space-xl;
}

// Article content
.article-content {
  max-width: 800px;
  margin: 0 auto;

  h2, h3, h4 {
    margin-top: $space-2xl;
    margin-bottom: $space-lg;
  }

  img {
    margin: $space-xl 0;
    border-radius: $radius-lg;
  }

  blockquote {
    border-left: 4px solid $color-cta;
    padding-left: $space-lg;
    margin: $space-xl 0;
    color: $color-text-muted;
    font-style: italic;
  }
}

.article-header {
  text-align: center;
  margin-bottom: $space-2xl;
}

.article-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: $space-md;
}

.article-meta {
  display: flex;
  gap: $space-lg;
  justify-content: center;
  align-items: center;
  color: $color-text-muted;
  font-size: $font-size-sm;
}
```

### Step 2: Rebuild and check

Run: `bundle exec jekyll build`

Expected: Build succeeds with all component styles

### Step 3: Commit

```bash
git add docs/_sass/_components.scss
git commit -m "feat: add component styles (buttons, cards, header, footer)

- Button variants (primary, secondary)
- Card component with hover effects
- Fixed header with blur backdrop
- Footer with social links
- Hero section styles
- Article content styles

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Animation Styles

**Files:**
- Create: `docs/_sass/_animations.scss`

### Step 1: Write animation styles

Create `docs/_sass/_animations.scss`:

```scss
// Fade in animation
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

// Staggered fade in for lists
.stagger-fade-in > * {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

.stagger-fade-in > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-fade-in > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-fade-in > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-fade-in > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-fade-in > *:nth-child(5) { animation-delay: 0.5s; }
.stagger-fade-in > *:nth-child(6) { animation-delay: 0.6s; }

// Pulse animation for accents
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .fade-in,
  .stagger-fade-in > *,
  .pulse {
    animation: none;
    opacity: 1;
  }
}
```

### Step 2: Rebuild and check

Run: `bundle exec jekyll build`

Expected: Build succeeds with animations

### Step 3: Commit

```bash
git add docs/_sass/_animations.scss
git commit -m "feat: add animation styles

- Fade-in animation
- Staggered fade-in for lists
- Pulse animation
- Respect prefers-reduced-motion

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Default Layout Template

**Files:**
- Create: `docs/_layouts/default.html`

### Step 1: Write default layout

Create `docs/_layouts/default.html`:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
  <meta name="description" content="{{ page.excerpt | default: site.description | strip_html | truncate: 160 }}">

  <!-- Open Graph -->
  <meta property="og:title" content="{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}">
  <meta property="og:description" content="{{ page.excerpt | default: site.description | strip_html | truncate: 160 }}">
  <meta property="og:type" content="{% if page.date %}article{% else %}website{% endif %}">
  <meta property="og:url" content="{{ page.url | absolute_url }}">

  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="{{ site.baseurl }}/assets/images/logo.jpg">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">
</head>
<body>
  <div class="site-wrapper">
    <!-- Header -->
    <header class="site-header">
      <div class="container">
        <nav class="site-nav">
          <a href="{{ '/' | relative_url }}" class="site-logo">
            Ryan<span>Liou</span>
          </a>

          <ul class="nav-links">
            <li><a href="{{ '/' | relative_url }}" class="nav-link {% if page.url == '/' %}active{% endif %}">首頁</a></li>
            <li><a href="{{ '/about/' | relative_url }}" class="nav-link {% if page.url contains '/about' %}active{% endif %}">關於我</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="site-content">
      {{ content }}
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">
            © 2026 {{ site.name }}. Built with Jekyll & ❤️
          </p>

          <ul class="social-links">
            <li>
              <a href="https://github.com/{{ site.github_username }}" class="social-link" aria-label="GitHub" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/{{ site.twitter.username }}" class="social-link" aria-label="Twitter" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/danny80916kimo" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>
```

### Step 2: Test build

Run: `bundle exec jekyll serve`

Expected: Site builds and runs on http://localhost:4000

### Step 3: View in browser

Navigate to: http://localhost:4000/ryanliouWebsite/

Expected: See new header and footer with dark theme

### Step 4: Commit

```bash
git add docs/_layouts/default.html
git commit -m "feat: create default layout template

- Fixed header with logo and navigation
- Main content area
- Footer with social links
- SVG icons (GitHub, Twitter, Instagram)
- Semantic HTML5 structure
- Meta tags for SEO and Open Graph

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Home Layout with Card Grid

**Files:**
- Create: `docs/_layouts/home.html`
- Create: `docs/_includes/post-card.html`

### Step 1: Write post card include

Create `docs/_includes/post-card.html`:

```html
<article class="card card-clickable">
  {% if post.header_image %}
    <img src="{{ post.header_image | relative_url }}" alt="{{ post.title }}" class="card-image">
  {% endif %}

  <div class="card-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%Y-%m-%d" }}
    </time>
    {% if post.categories %}
      <span>•</span>
      <span>{{ post.categories | first }}</span>
    {% endif %}
  </div>

  <h3 class="card-title">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </h3>

  {% if post.excerpt %}
    <p class="card-excerpt">
      {{ post.excerpt | strip_html | truncate: 150 }}
    </p>
  {% endif %}

  {% if post.tags %}
    <div class="card-tags">
      {% for tag in post.tags limit:3 %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</article>
```

### Step 2: Write home layout

Create `docs/_layouts/home.html`:

```html
---
layout: default
---

<div class="hero fade-in">
  <div class="container">
    <h1 class="hero-title">
      嗨，我是 <span>大軍軍</span>
    </h1>
    <p class="hero-subtitle">
      iOS 開發者 • 設計師 • 3D 創作者<br>
      分享程式設計、平面設計、3D 設計
    </p>
  </div>
</div>

<section class="container">
  <div class="grid grid-3 stagger-fade-in">
    {% for post in site.posts limit:9 %}
      {% include post-card.html %}
    {% endfor %}
  </div>

  {% if site.posts.size > 9 %}
    <div class="mt-2xl" style="text-align: center;">
      <a href="{{ '/posts/' | relative_url }}" class="btn btn-secondary">
        查看更多文章
      </a>
    </div>
  {% endif %}
</section>
```

### Step 3: Test build and view

Run: `bundle exec jekyll serve`

Navigate to: http://localhost:4000/ryanliouWebsite/

Expected: See hero section and 3-column card grid of posts

### Step 4: Commit

```bash
git add docs/_layouts/home.html docs/_includes/post-card.html
git commit -m "feat: create home layout with card grid

- Hero section with name and subtitle
- 3-column responsive card grid
- Post card component with image, meta, excerpt
- Staggered fade-in animation
- View more button

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Post Layout

**Files:**
- Create: `docs/_layouts/post.html`

### Step 1: Write post layout

Create `docs/_layouts/post.html`:

```html
---
layout: default
---

<article class="container container-narrow fade-in">
  <header class="article-header">
    <h1 class="article-title">{{ page.title }}</h1>

    <div class="article-meta">
      <time datetime="{{ page.date | date_to_xmlschema }}">
        {{ page.date | date: "%Y年%m月%d日" }}
      </time>

      {% if page.categories %}
        <span>•</span>
        <span>{{ page.categories | first }}</span>
      {% endif %}
    </div>

    {% if page.tags %}
      <div class="card-tags" style="justify-content: center; margin-top: 1rem;">
        {% for tag in page.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </header>

  {% if page.header_image %}
    <img src="{{ page.header_image | relative_url }}" alt="{{ page.title }}" style="width: 100%; border-radius: 12px; margin-bottom: 3rem;">
  {% endif %}

  <div class="article-content">
    {{ content }}
  </div>

  <footer style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #334155;">
    <div style="text-align: center;">
      <a href="{{ '/' | relative_url }}" class="btn btn-secondary">
        ← 回到首頁
      </a>
    </div>
  </footer>
</article>
```

### Step 2: Test build and view post

Run: `bundle exec jekyll serve`

Navigate to a post URL

Expected: See single post with title, meta, content, and back button

### Step 3: Commit

```bash
git add docs/_layouts/post.html
git commit -m "feat: create post layout

- Article header with title, date, categories
- Tag display
- Header image support
- Styled article content
- Back to home button

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Page Layout (for About)

**Files:**
- Create: `docs/_layouts/page.html`

### Step 1: Write page layout

Create `docs/_layouts/page.html`:

```html
---
layout: default
---

<article class="container container-narrow fade-in">
  <header class="article-header">
    <h1 class="article-title">{{ page.title }}</h1>
  </header>

  <div class="article-content">
    {{ content }}
  </div>
</article>
```

### Step 2: Update about page front matter

Modify `docs/_pages/about.md`:

```yaml
---
layout: page
title: 關於我
permalink: /about/
---
```

### Step 3: Test build and view about page

Run: `bundle exec jekyll serve`

Navigate to: http://localhost:4000/ryanliouWebsite/about/

Expected: See about page with new layout

### Step 4: Commit

```bash
git add docs/_layouts/page.html docs/_pages/about.md
git commit -m "feat: create page layout for static pages

- Simple page layout for About and other pages
- Update About page to use new layout

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Update Config and Front Matter

**Files:**
- Modify: `docs/_config.yml`
- Modify: `docs/index.markdown`

### Step 1: Update _config.yml

Update `docs/_config.yml` (remove Minimal Mistakes theme lines):

```yaml
title: 軍事重地
subtitle: 程式、設計、3D
name: 大軍軍
description: 分享程式設計、平面設計、3D設計
email: daginryanliou@gmail.com
baseurl: "/ryanliouWebsite"
url: "https://danny80916kimo.github.io"
twitter:
  username: dagingingin
github_username: danny80916kimo

# Build settings
plugins:
  - jekyll-feed

# Remove Minimal Mistakes theme
# remote_theme: "mmistakes/minimal-mistakes"
# minimal_mistakes_skin: "dark"

# Collections
collections:
  art_works:
    output: true

include: ["_pages"]

# Defaults
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: post
  - scope:
      path: ""
      type: pages
    values:
      layout: page
```

### Step 2: Update index.markdown

Update `docs/index.markdown`:

```yaml
---
layout: home
---
```

### Step 3: Rebuild site

Run: `bundle exec jekyll serve`

Expected: Site builds without Minimal Mistakes theme, uses custom layouts

### Step 4: Test all pages

- Home: http://localhost:4000/ryanliouWebsite/
- About: http://localhost:4000/ryanliouWebsite/about/
- A post: Click any post card

Expected: All pages work with new design

### Step 5: Commit

```bash
git add docs/_config.yml docs/index.markdown
git commit -m "feat: switch to custom theme

- Remove Minimal Mistakes theme dependency
- Update default layouts for posts and pages
- Clean up config

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Add Header Images to Posts (Optional Enhancement)

**Files:**
- Modify: Individual post files in `docs/_posts/`

### Step 1: Create placeholder for posts without images

For posts without header images, add a default gradient background to the card:

Update `docs/_includes/post-card.html`:

```html
<article class="card card-clickable">
  {% if post.header_image %}
    <img src="{{ post.header_image | relative_url }}" alt="{{ post.title }}" class="card-image">
  {% else %}
    <div class="card-image" style="background: linear-gradient(135deg, {{ site.color-primary | default: '#1E293B' }} 0%, {{ site.color-secondary | default: '#334155' }} 100%);">
    </div>
  {% endif %}

  <!-- Rest of card content -->
  <div class="card-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}">
      {{ post.date | date: "%Y-%m-%d" }}
    </time>
    {% if post.categories %}
      <span>•</span>
      <span>{{ post.categories | first }}</span>
    {% endif %}
  </div>

  <h3 class="card-title">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
  </h3>

  {% if post.excerpt %}
    <p class="card-excerpt">
      {{ post.excerpt | strip_html | truncate: 150 }}
    </p>
  {% endif %}

  {% if post.tags %}
    <div class="card-tags">
      {% for tag in post.tags limit:3 %}
        <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  {% endif %}
</article>
```

### Step 2: Test with and without images

Run: `bundle exec jekyll serve`

Expected: Posts with header_image show image, others show gradient

### Step 3: Commit

```bash
git add docs/_includes/post-card.html
git commit -m "feat: add gradient fallback for posts without images

- Show gradient background when post has no header_image
- Maintains consistent card height

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Mobile Responsiveness Testing

**Files:**
- No new files, testing phase

### Step 1: Test at 375px (mobile)

Open browser DevTools, set viewport to 375px width

Expected:
- Cards stack in single column
- Header navigation still visible
- No horizontal scroll
- Touch targets at least 44px

### Step 2: Test at 768px (tablet)

Set viewport to 768px width

Expected:
- Cards in 2 columns
- Good spacing
- Readable text

### Step 3: Test at 1024px+ (desktop)

Set viewport to 1024px+ width

Expected:
- Cards in 3 columns
- Content centered with max-width
- All hover states work

### Step 4: Fix any issues found

If issues found, update `docs/_sass/_layout.scss` or `docs/_sass/_components.scss`

### Step 5: Commit any fixes

```bash
git add docs/_sass/
git commit -m "fix: improve mobile responsiveness

- [List specific fixes made]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Accessibility Audit

**Files:**
- Review all created files

### Step 1: Check color contrast

Use browser DevTools or WebAIM Contrast Checker

Expected:
- Text on background: 4.5:1 minimum
- CTA button: 4.5:1 minimum

### Step 2: Check keyboard navigation

Test with Tab key only (no mouse)

Expected:
- Can navigate to all links and buttons
- Focus states visible
- Logical tab order

### Step 3: Check ARIA labels

Review social links, buttons

Expected:
- Icon-only buttons have aria-label
- Images have alt text

### Step 4: Check reduced motion

Add to browser: prefers-reduced-motion

Expected:
- Animations disabled or reduced

### Step 5: Document findings

Create `docs/plans/ACCESSIBILITY-CHECKLIST.md` if issues found

### Step 6: Commit fixes

```bash
git add .
git commit -m "a11y: improve accessibility

- [List specific accessibility improvements]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Performance Optimization

**Files:**
- Modify: Various SCSS files if needed

### Step 1: Check CSS size

Run: `du -sh docs/_site/assets/css/main.css`

Expected: < 50KB

### Step 2: Test page load speed

Use browser DevTools Network tab

Expected:
- Page load < 2 seconds on 3G
- No render-blocking resources

### Step 3: Optimize images (if heavy)

If card images are large:
- Add loading="lazy" to img tags
- Consider webp format

### Step 4: Check for unused CSS

Review SCSS files, remove unused styles

### Step 5: Commit optimizations

```bash
git add .
git commit -m "perf: optimize CSS and assets

- [List optimizations made]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 15: Final Review and Documentation

**Files:**
- Create: `docs/plans/DESIGN-SYSTEM.md`
- Update: `README.md`

### Step 1: Document design system

Create `docs/plans/DESIGN-SYSTEM.md`:

```markdown
# Design System Documentation

This document describes the custom Jekyll theme design system for Ryan Liou's tech blog.

## Color Palette

- Primary: #1E293B (Dark slate)
- Secondary: #334155 (Slate)
- CTA/Accent: #22C55E (Neon green)
- Background: #0F172A (Very dark blue)
- Text: #F8FAFC (Off-white)

## Typography

- Headings: Space Grotesk (Google Fonts)
- Body: DM Sans (Google Fonts)
- Code: Fira Code (Google Fonts)

## Component Specs

See `design-system/ryan-liou-tech-blog/MASTER.md` for complete specs.

## Modifying the Theme

### Color Changes

Edit `docs/_sass/_variables.scss`

### Layout Changes

Edit `docs/_sass/_layout.scss`

### Component Changes

Edit `docs/_sass/_components.scss`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
```

### Step 2: Update README

Update root `README.md`:

```markdown
# Ryan Liou's Website

My Personal Website built with Jekyll and custom theme.

## Features

- Custom dark theme with tech/futuristic design
- Card-based article layout
- Fully responsive (mobile-first)
- Accessible (WCAG 2.1 AA)
- Fast loading with optimized CSS

## Development

To run the site locally:

```bash
cd docs
bundle install
bundle exec jekyll serve
```

Visit http://localhost:4000/ryanliouWebsite/

## Design System

See `design-system/ryan-liou-tech-blog/MASTER.md` for complete design system documentation.

## Tech Stack

- Jekyll 4.3.3
- SCSS (no frameworks)
- Google Fonts (Space Grotesk, DM Sans, Fira Code)
- Liquid templates
```

### Step 3: Test complete site one more time

Run: `bundle exec jekyll serve`

Test:
- ✅ Home page loads
- ✅ Posts display correctly
- ✅ About page works
- ✅ Mobile responsive
- ✅ Keyboard navigation
- ✅ Dark theme looks good

### Step 4: Final commit

```bash
git add docs/plans/DESIGN-SYSTEM.md README.md
git commit -m "docs: add design system documentation

- Document color palette and typography
- Add modification guide
- Update README with features and tech stack

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Summary & Next Steps

**What We Built:**

1. ✅ Complete custom Jekyll theme (no Minimal Mistakes)
2. ✅ Dark tech-focused design with neon green accents
3. ✅ Modular SCSS architecture (variables, base, layout, components, animations)
4. ✅ Card-based article grid with hover effects
5. ✅ Responsive design (mobile-first)
6. ✅ Accessible (keyboard nav, focus states, reduced motion)
7. ✅ Custom layouts (default, home, post, page)
8. ✅ Hero section on homepage
9. ✅ Fixed header with blur backdrop
10. ✅ Social links in footer

**Files Created:**

- 5 SCSS partials (_variables, _base, _layout, _components, _animations)
- 4 layouts (default, home, post, page)
- 1 include (post-card)
- 2 documentation files

**Total Implementation Time:** ~2-3 hours (15 tasks × 10-15 minutes each)

---

## Plan Complete

**Plan saved to:** `docs/plans/2026-02-12-custom-jekyll-theme-redesign.md`

---

### Execution Options

**1. Subagent-Driven (this session)**
- Stay in this session
- Fresh subagent per task
- Code review between tasks
- Fast iteration

**2. Parallel Session (separate)**
- Open new session in worktree
- **REQUIRED SUB-SKILL:** Use superpowers:executing-plans
- Batch execution with checkpoints

**Which approach would you like to use?**
