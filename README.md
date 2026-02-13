# Ryan Liou's Personal Website

A modern, performant personal website built with Jekyll, featuring a custom dark theme optimized for technical content and accessibility.

## Features

### Design & User Experience
- **Custom Dark Theme**: Modern tech-focused dark color scheme with vibrant green accents
- **Fully Responsive**: Mobile-first design that works beautifully on all screen sizes
- **Card-Based Layout**: Clean, organized content presentation with hover animations
- **Smooth Animations**: Subtle entrance animations and hover effects (respects `prefers-reduced-motion`)
- **Fast Performance**: Minimal CSS (~15KB gzipped), no JavaScript required for core functionality

### Accessibility
- **WCAG 2.1 AAA Compliant**: All color contrasts exceed AAA standards
- **Keyboard Navigation**: Full keyboard accessibility with visible focus states
- **Screen Reader Friendly**: Semantic HTML and ARIA labels throughout
- **Touch-Friendly**: Minimum 44x44px touch targets on all interactive elements
- **Skip Navigation**: Skip-to-content link for keyboard users

### Technical Highlights
- **Modern CSS**: CSS Grid, Flexbox, custom properties, and animations
- **Google Fonts**: Space Grotesk, DM Sans, and Fira Code for optimal typography
- **Progressive Enhancement**: Features degrade gracefully in older browsers
- **SEO Optimized**: Semantic HTML5, meta tags, and structured data
- **Lightweight**: No heavy frameworks or dependencies

## Tech Stack

- **Static Site Generator**: Jekyll 4.3.3
- **Styling**: SCSS with custom design system
- **Typography**: Google Fonts (Space Grotesk, DM Sans, Fira Code)
- **Template Engine**: Liquid
- **Deployment**: GitHub Pages compatible
- **Build Tool**: Jekyll with bundler

## Quick Start

### Prerequisites

- Ruby 2.7+ (recommended: 3.0+)
- Bundler gem installed
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/danny80916kimo/ryanliouWebsite.git
cd ryanliouWebsite
```

2. Install dependencies:
```bash
cd docs
bundle install
```

3. Run the development server:
```bash
bundle exec jekyll serve
```

4. Open your browser to `http://localhost:4000/ryanliouWebsite/`

### Development

The site will automatically rebuild when you make changes to files. The browser will need to be manually refreshed to see changes.

**Key directories:**
- `docs/_posts/` - Blog posts (Markdown files)
- `docs/_pages/` - Static pages
- `docs/_layouts/` - Page templates
- `docs/_sass/` - SCSS stylesheets
- `docs/assets/` - Images and compiled CSS

## Design System

A comprehensive design system ensures consistency across the entire site. Key elements include:

### Color Palette (Tech Dark Theme)
- **Background**: Deep slate (#0F172A)
- **Cards**: Dark slate (#1E293B)
- **Accent/CTA**: Vibrant green (#22C55E)
- **Text**: Near white (#F8FAFC)
- **Muted Text**: Gray (#9CA3AF) - AAA compliant contrast

### Typography
- **Headings**: Space Grotesk (geometric, modern)
- **Body**: DM Sans (clean, readable)
- **Code**: Fira Code (with ligatures)

### Spacing
8px-based spacing scale from 4px to 64px for consistent visual rhythm.

### Components
- Buttons (Primary & Secondary)
- Cards (Standard & Clickable)
- Navigation Header (Sticky)
- Footer with Social Links
- Hero Sections
- Article Content Styling

For detailed design system documentation, see [Design System Guide](docs/plans/DESIGN-SYSTEM.md).

## Customization

### Changing Colors

Edit `docs/_sass/_variables.scss`:

```scss
$color-cta: #22C55E;  // Change accent color
$color-background: #0F172A;  // Change background
```

### Changing Fonts

1. Update Google Fonts link in `docs/_layouts/default.html`
2. Update font variables in `docs/_sass/_variables.scss`

### Modifying Layout

- **Container width**: Edit `.container` in `docs/_sass/_layout.scss`
- **Grid columns**: Edit `.grid.cols-3` in `docs/_sass/_layout.scss`
- **Spacing**: Adjust spacing variables in `docs/_sass/_variables.scss`

See the [Design System Modification Guide](docs/plans/DESIGN-SYSTEM.md#modification-guide) for detailed instructions.

## Site Structure

```
docs/
├── _config.yml              # Jekyll configuration
├── _posts/                  # Blog posts
├── _pages/                  # Static pages (About, etc.)
├── _layouts/                # Page templates
│   ├── default.html         # Base layout
│   ├── home.html            # Homepage layout
│   ├── post.html            # Blog post layout
│   └── page.html            # Standard page layout
├── _sass/                   # SCSS stylesheets
│   ├── _variables.scss      # Design tokens
│   ├── _base.scss           # Base styles
│   ├── _layout.scss         # Layout system
│   ├── _components.scss     # UI components
│   └── _animations.scss     # Animations
├── assets/
│   ├── css/
│   │   └── main.scss        # Main stylesheet
│   └── images/              # Site images
└── plans/
    └── DESIGN-SYSTEM.md     # Design documentation
```

## Content Management

### Adding a Blog Post

Create a new file in `docs/_posts/` with the naming format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-01-15
categories: [Category]
tags: [tag1, tag2]
excerpt: "Brief description of the post"
---

Your content here...
```

### Adding a Page

Create a new file in `docs/_pages/`:

```markdown
---
layout: page
title: "Page Title"
permalink: /page-url/
---

Your content here...
```

## Building for Production

Generate the static site:

```bash
cd docs
bundle exec jekyll build
```

The compiled site will be in `docs/_site/`.

## Deployment

### GitHub Pages

The site is configured for GitHub Pages deployment:

1. Push changes to your repository
2. GitHub Actions will automatically build and deploy
3. Site will be available at `https://[username].github.io/[repository]/`

### Custom Domain

To use a custom domain:

1. Add `CNAME` file to `docs/` with your domain
2. Configure DNS settings with your domain provider
3. Update `url` in `docs/_config.yml`

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Android Chrome (last 2 versions)

## Performance

- **Lighthouse Score**: 95+ on all metrics
- **CSS Size**: ~15KB minified and gzipped
- **No JavaScript**: Core functionality works without JS
- **Optimized Images**: Responsive images with proper sizing
- **Fast Fonts**: Google Fonts with `display=swap`

## Accessibility

- WCAG 2.1 Level AAA color contrast compliance
- Full keyboard navigation support
- Screen reader tested and optimized
- Semantic HTML5 markup
- ARIA labels on all icon buttons
- Skip navigation links
- Respects `prefers-reduced-motion`

## Project History

This site started with the Minimal Mistakes Jekyll theme and has been completely redesigned with a custom theme system featuring:

- Custom SCSS architecture
- Modern component-based design
- Enhanced accessibility features
- Performance optimizations
- Improved responsive design

**Current Version**: 2.0 (Custom Theme)
**Previous Version**: 1.0 (Minimal Mistakes Theme)

## Contributing

This is a personal website, but if you notice any issues:

1. Open an issue describing the problem
2. Include browser/device information
3. Provide steps to reproduce

## License

Content: All blog posts and images are © Ryan Liou. All rights reserved.

Code: The theme code (SCSS, templates, layouts) is available for reference and learning purposes.

## Contact

- **Website**: https://danny80916kimo.github.io/ryanliouWebsite
- **GitHub**: [@danny80916kimo](https://github.com/danny80916kimo)
- **Twitter**: [@DAGINGINGIN](https://twitter.com/DAGINGINGIN)
- **Instagram**: [@danny80916kimo](https://www.instagram.com/danny80916kimo/)

## Acknowledgments

- Jekyll static site generator
- Google Fonts for typography
- Initial inspiration from Minimal Mistakes theme
- Built with Claude Code assistance

---

**Built with Jekyll** | **Designed by Ryan Liou** | **Last Updated: February 2025**
