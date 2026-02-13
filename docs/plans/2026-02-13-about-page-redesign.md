# About Page Redesign (Brittany Chiang Style) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the About page as a split-layout resume with sticky sidebar navigation, structured experience entries with tech tags, project cards, and scroll-based nav highlighting — inspired by brittanychiang.com.

**Architecture:** A new `resume.html` Jekyll layout provides a CSS Grid two-column split (sidebar + scrolling content). The sidebar is sticky with name, title, section nav, and social links. Right content has About, Experience, and Projects sections. A small JS file uses IntersectionObserver to highlight the active nav link on scroll. A new `_resume.scss` partial holds all resume-specific styles. The about.md page is rewritten as structured HTML using this layout.

**Tech Stack:** Jekyll, Liquid, SCSS, vanilla JavaScript (IntersectionObserver)

---

## Task 1: Create `_resume.scss` partial and import it

**Files:**
- Create: `docs/_sass/_resume.scss`
- Modify: `docs/assets/css/main.scss:17` (add import)

**Step 1: Create the resume SCSS file**

Create `docs/_sass/_resume.scss` with:

```scss
// =============================================================================
// RESUME / ABOUT PAGE
// =============================================================================

// Main container - two column grid
.resume {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1200px;
  margin: 0 auto;
  padding: $space-lg;
  gap: $space-2xl;

  @media (min-width: $breakpoint-lg) {
    grid-template-columns: 300px 1fr;
    padding: $space-3xl $space-xl;
    gap: $space-3xl;
  }
}

// -----------------------------------------------------------------------------
// SIDEBAR
// -----------------------------------------------------------------------------

.resume-sidebar {
  @media (min-width: $breakpoint-lg) {
    height: fit-content;
    position: sticky;
    top: calc(#{$header-height} + #{$space-xl});
  }
}

.resume-sidebar-inner {
  display: flex;
  flex-direction: column;
  gap: $space-xl;
}

.resume-identity {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
}

.resume-name {
  font-family: $font-heading;
  font-size: $font-size-2xl;
  font-weight: 700;
  color: $color-text;
  margin-bottom: 0;

  @media (min-width: $breakpoint-lg) {
    font-size: $font-size-3xl;
  }
}

.resume-title {
  font-family: $font-heading;
  font-size: $font-size-lg;
  font-weight: 500;
  color: $color-cta;
  margin-bottom: 0;
}

.resume-tagline {
  font-size: $font-size-base;
  color: $color-text-muted;
  line-height: $line-height-relaxed;
  margin-bottom: 0;
}

// Sidebar navigation
.resume-nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }
}

.resume-nav-link {
  display: flex;
  align-items: center;
  gap: $space-md;
  padding: $space-sm 0;
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: 600;
  color: $color-text-muted;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color $transition-base;

  &::before {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: $color-text-muted;
    transition: all $transition-base;
  }

  &:hover,
  &.active {
    color: $color-text;
    text-decoration: none;

    &::before {
      width: 60px;
      background: $color-text;
    }
  }

  &.active {
    color: $color-cta;

    &::before {
      background: $color-cta;
    }
  }
}

// Social links
.resume-social {
  display: flex;
  align-items: center;
  gap: $space-md;
  list-style: none;
  padding: 0;
  margin: 0;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-text-muted;
    transition: color $transition-base;

    &:hover {
      color: $color-cta;
      text-decoration: none;
    }
  }
}

// -----------------------------------------------------------------------------
// MAIN CONTENT
// -----------------------------------------------------------------------------

.resume-content {
  display: flex;
  flex-direction: column;
  gap: $space-3xl;
}

// Section titles
.resume-section-title {
  font-family: $font-heading;
  font-size: $font-size-lg;
  font-weight: 700;
  color: $color-text;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: $space-lg;

  // Only visible on mobile (desktop uses sidebar nav)
  @media (min-width: $breakpoint-lg) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
}

// About section
.resume-about {
  p {
    font-size: $font-size-base;
    line-height: $line-height-relaxed;
    color: $color-text-muted;
    margin-bottom: $space-lg;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-lg;
    }
  }

  strong {
    color: $color-text;
  }
}

// Speaking list
.resume-speaking {
  margin-top: $space-xl;

  h3 {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text;
    margin-bottom: $space-md;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  li {
    font-size: $font-size-sm;
    color: $color-text-muted;
    padding-left: $space-lg;
    position: relative;
    margin-bottom: 0;

    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: $color-cta;
      font-family: $font-code;
    }
  }

  a {
    color: $color-cta;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// -----------------------------------------------------------------------------
// EXPERIENCE ENTRIES
// -----------------------------------------------------------------------------

.resume-entries {
  display: flex;
  flex-direction: column;
  gap: $space-md;
}

.resume-entry {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-md;
  padding: $space-lg;
  border-radius: $radius-lg;
  transition: background $transition-base;

  @media (min-width: $breakpoint-md) {
    grid-template-columns: 140px 1fr;
    gap: $space-xl;
  }

  &:hover {
    background: rgba($color-cta, 0.05);
  }
}

.resume-entry-date {
  font-family: $font-heading;
  font-size: $font-size-sm;
  font-weight: 500;
  color: $color-text-muted;
  white-space: nowrap;
  padding-top: 4px;
}

.resume-entry-content {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
}

.resume-entry-title {
  font-family: $font-heading;
  font-size: $font-size-base;
  font-weight: 600;
  color: $color-text;
  margin-bottom: 0;

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-lg;
  }
}

.resume-entry-company {
  color: $color-cta;
}

.resume-entry-desc {
  font-size: $font-size-sm;
  line-height: $line-height-relaxed;
  color: $color-text-muted;
  margin-bottom: 0;

  ul {
    list-style: none;
    padding: 0;
    margin: $space-sm 0 0 0;
    display: flex;
    flex-direction: column;
    gap: $space-xs;
  }

  li {
    padding-left: $space-lg;
    position: relative;
    margin-bottom: 0;

    &::before {
      content: '>';
      position: absolute;
      left: 0;
      color: $color-cta;
      font-family: $font-code;
      font-size: $font-size-sm;
    }
  }
}

.resume-entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $space-sm;
  margin-top: $space-sm;
}

.resume-tag {
  display: inline-block;
  padding: $space-xs $space-sm;
  font-size: 12px;
  font-weight: 500;
  color: $color-cta;
  background: rgba($color-cta, 0.1);
  border-radius: $radius-full;
}

// -----------------------------------------------------------------------------
// PROJECT ENTRIES
// -----------------------------------------------------------------------------

.resume-project {
  display: flex;
  flex-direction: column;
  gap: $space-sm;
  padding: $space-lg;
  border-radius: $radius-lg;
  transition: background $transition-base;

  &:hover {
    background: rgba($color-cta, 0.05);
  }
}

.resume-project-title {
  font-family: $font-heading;
  font-size: $font-size-base;
  font-weight: 600;
  color: $color-text;
  margin-bottom: 0;

  @media (min-width: $breakpoint-md) {
    font-size: $font-size-lg;
  }
}

.resume-project-desc {
  font-size: $font-size-sm;
  line-height: $line-height-relaxed;
  color: $color-text-muted;
  margin-bottom: 0;
}

// -----------------------------------------------------------------------------
// EDUCATION & CERTIFICATES (compact)
// -----------------------------------------------------------------------------

.resume-compact {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  padding: 0 $space-lg;

  p {
    font-size: $font-size-sm;
    color: $color-text-muted;
    margin-bottom: 0;

    strong {
      color: $color-text;
    }
  }
}
```

**Step 2: Add import to main.scss**

In `docs/assets/css/main.scss`, add after the `@import "animations";` line:

```scss
@import "resume";
```

**Step 3: Build and verify CSS compiles**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll build 2>&1 | head -20`
Expected: Build succeeds without SCSS errors.

**Step 4: Commit**

```bash
git add docs/_sass/_resume.scss docs/assets/css/main.scss
git commit -m "feat: add resume page SCSS styles

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Update `resume.html` layout

The file `docs/_layouts/resume.html` already exists (partially created). It needs to be verified and kept as-is — it already contains the correct structure with sidebar, nav, social links, and `{{ content }}` slot.

**Files:**
- Verify: `docs/_layouts/resume.html` (already created, no changes needed)

**Step 1: Verify layout file exists and is correct**

Read `docs/_layouts/resume.html` and confirm it has:
- `layout: default` in frontmatter
- `.resume` container with sidebar + main content
- Sidebar with `.resume-identity`, `.resume-nav`, `.resume-social`
- `{{ content }}` in `.resume-content`
- Script tag for `resume.js`

**Step 2: Commit (only if changes were needed)**

No commit needed if file is already correct.

---

## Task 3: Rewrite `about.md` with structured HTML content

**Files:**
- Modify: `docs/_pages/about.md` (complete rewrite)

**Step 1: Replace about.md content**

Replace the entire content of `docs/_pages/about.md` with:

```html
---
layout: resume
title: 關於我
permalink: /about/
name: Ryan Liou
role: Senior iOS Engineer
tagline: "Building reliable, user-centric mobile experiences with Swift, SwiftUI, and a passion for clean architecture."
---

<section id="about" class="resume-section" aria-label="About">
  <h2 class="resume-section-title">About</h2>
  <div class="resume-about">
    <p>
      I am an iOS, iPadOS, and watchOS developer with experience building
      online fitness training platforms, instant messaging apps, and CRM systems.
    </p>
    <p>
      With strong expertise in <strong>streaming</strong>, <strong>Bluetooth integration</strong>,
      and <strong>real-time communication</strong>, I focus on transforming product requirements
      into stable, user-friendly applications.
    </p>
    <p>
      I emphasize <strong>SOLID principles</strong> and apply <strong>Domain-Driven Design (DDD)</strong>
      pragmatically to improve maintainability, scalability, and long-term code quality.
      I actively embrace <strong>Agile (Scrum)</strong> methodologies and am highly engaged in
      AI-driven software engineering workflows.
    </p>

    <div class="resume-speaking">
      <h3>Speaking & Community</h3>
      <ul>
        <li>iPlayground 2020 — Random API evolution</li>
        <li>Engineering Community 2024 — AI frameworks</li>
        <li>iPlayground 2025 — Running LLMs on iOS</li>
        <li>Swift Taipei 2026 — Spec-Driven Development
          (<a href="https://speakerdeck.com/danny80916kimo/random" target="_blank" rel="noopener">Slides</a>)
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="experience" class="resume-section" aria-label="Experience">
  <h2 class="resume-section-title">Experience</h2>
  <div class="resume-entries">

    <div class="resume-entry">
      <div class="resume-entry-date">2025 — Present</div>
      <div class="resume-entry-content">
        <h3 class="resume-entry-title">
          iOS Developer · <span class="resume-entry-company">Wit Software Ltd.</span>
        </h3>
        <div class="resume-entry-desc">
          <ul>
            <li>Develop instant messaging apps for multiple clients</li>
            <li>Clean Architecture + MVVM</li>
            <li>Optimized video compression/upload via Swift concurrency</li>
            <li>Introduced SwiftFormat + SwiftLint</li>
            <li>Built automatic localization workflow</li>
          </ul>
        </div>
        <div class="resume-entry-tags">
          <span class="resume-tag">Swift</span>
          <span class="resume-tag">Clean Architecture</span>
          <span class="resume-tag">MVVM</span>
          <span class="resume-tag">GitLab CI/CD</span>
          <span class="resume-tag">Swift Concurrency</span>
        </div>
      </div>
    </div>

    <div class="resume-entry">
      <div class="resume-entry-date">2021 — 2025</div>
      <div class="resume-entry-content">
        <h3 class="resume-entry-title">
          iOS Developer · <span class="resume-entry-company">Wondercise</span>
        </h3>
        <div class="resume-entry-desc">
          <ul>
            <li>Built fitness streaming apps across iOS, iPadOS, watchOS</li>
            <li>Apple Watch / Garmin Bluetooth integration</li>
            <li>Real-time metrics syncing via WebSocket</li>
            <li>Designed Apple Watch communication protocol</li>
            <li>Remote Scrum collaboration</li>
          </ul>
        </div>
        <div class="resume-entry-tags">
          <span class="resume-tag">Swift</span>
          <span class="resume-tag">SwiftUI</span>
          <span class="resume-tag">watchOS</span>
          <span class="resume-tag">Bluetooth</span>
          <span class="resume-tag">WebSocket</span>
          <span class="resume-tag">Agora</span>
        </div>
      </div>
    </div>

    <div class="resume-entry">
      <div class="resume-entry-date">2016 — 2021</div>
      <div class="resume-entry-content">
        <h3 class="resume-entry-title">
          Software Developer · <span class="resume-entry-company">Savun Bio Tech</span>
        </h3>
        <div class="resume-entry-desc">
          <ul>
            <li>Built Firebase-integrated CRM system</li>
            <li>Sales increased 50%, management cost reduced 70%</li>
            <li>Backend migration from Kintone to Firebase</li>
          </ul>
        </div>
        <div class="resume-entry-tags">
          <span class="resume-tag">Firebase</span>
          <span class="resume-tag">CRM</span>
          <span class="resume-tag">Django</span>
        </div>
      </div>
    </div>

  </div>

  <div class="resume-compact" style="margin-top: 2rem;">
    <p><strong>Education:</strong> National Chung Hsing University — Life Science & Forestry Double Major (2010–2015)</p>
    <p><strong>Certificate:</strong> TOEIC 810 (2026)</p>
  </div>
</section>

<section id="projects" class="resume-section" aria-label="Projects">
  <h2 class="resume-section-title">Projects</h2>
  <div class="resume-entries">

    <div class="resume-project">
      <h3 class="resume-project-title">ChitChat App</h3>
      <p class="resume-project-desc">Real-time messaging social platform focused on performance and scalability.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">Swift</span>
        <span class="resume-tag">WebSocket</span>
        <span class="resume-tag">Real-time</span>
      </div>
    </div>

    <div class="resume-project">
      <h3 class="resume-project-title">ERP System + AI Agent</h3>
      <p class="resume-project-desc">Web ERP with conversational LINE Bot interface for operations.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">LINE Bot</span>
        <span class="resume-tag">AI</span>
        <span class="resume-tag">ERP</span>
      </div>
    </div>

    <div class="resume-project">
      <h3 class="resume-project-title">Wondercise Platform</h3>
      <p class="resume-project-desc">Online fitness streaming with real-time metrics sync across devices.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">iOS</span>
        <span class="resume-tag">watchOS</span>
        <span class="resume-tag">Streaming</span>
      </div>
    </div>

    <div class="resume-project">
      <h3 class="resume-project-title">CEO Robot</h3>
      <p class="resume-project-desc">Educational robotics app with Bluetooth control and drag-drop programming.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">Bluetooth</span>
        <span class="resume-tag">Education</span>
        <span class="resume-tag">Robotics</span>
      </div>
    </div>

    <div class="resume-project">
      <h3 class="resume-project-title">Savun CRM</h3>
      <p class="resume-project-desc">Location-aware sales CRM improving visit efficiency.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">Firebase</span>
        <span class="resume-tag">Location</span>
        <span class="resume-tag">CRM</span>
      </div>
    </div>

    <div class="resume-project">
      <h3 class="resume-project-title">TOPSPEEDSALES CRM</h3>
      <p class="resume-project-desc">Quotation and case tracking CRM improving decision workflows.</p>
      <div class="resume-entry-tags">
        <span class="resume-tag">CRM</span>
        <span class="resume-tag">Workflow</span>
      </div>
    </div>

  </div>
</section>
```

**Step 2: Build and verify page renders**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll build 2>&1 | head -20`
Expected: Build succeeds. Check `_site/about/index.html` exists with the resume layout structure.

**Step 3: Commit**

```bash
git add docs/_pages/about.md
git commit -m "feat: rewrite about page with structured resume content

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Create `resume.js` for scroll-based navigation

**Files:**
- Create: `docs/assets/js/resume.js`

**Step 1: Create the JavaScript file**

Create `docs/assets/js/resume.js` with:

```javascript
(function () {
  'use strict';

  var sections = document.querySelectorAll('.resume-section');
  var navLinks = document.querySelectorAll('.resume-nav-link');

  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // Smooth scroll for nav links
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
```

**Step 2: Verify the script tag is in resume.html**

Read `docs/_layouts/resume.html` and confirm the last line has:
```html
<script src="{{ site.baseurl }}/assets/js/resume.js" defer></script>
```

**Step 3: Build and verify**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll build 2>&1 | head -20`
Expected: Build succeeds. Check `_site/assets/js/resume.js` exists.

**Step 4: Commit**

```bash
git add docs/assets/js/resume.js
git commit -m "feat: add scroll-based navigation highlighting for resume page

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Visual verification

**Step 1: Serve locally**

Run: `cd /Users/ryan_liou/Developer/ryanliouWebsite/docs && bundle exec jekyll serve`

**Step 2: Verify checklist**

Open `http://localhost:4000/about/` and verify:

- [ ] Two-column layout on desktop (sidebar left, content right)
- [ ] Single-column layout on mobile (sidebar on top)
- [ ] Sidebar is sticky on scroll (desktop only)
- [ ] Nav links highlight on scroll (About → Experience → Projects)
- [ ] Experience entries show date on left, content on right
- [ ] Tech tags display as green badges
- [ ] Project cards show title + description + tags
- [ ] Hover effect on experience/project entries (subtle green background)
- [ ] Speaking list renders in About section
- [ ] Education and Certificate display at bottom of Experience section
- [ ] Social links in sidebar work
- [ ] Nav link click smooth-scrolls to section
