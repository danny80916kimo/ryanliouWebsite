// Theme Switcher - Dark/Light Mode with Auto-Follow System
// Supports three states: auto (follow system), light (forced), dark (forced)

(function () {
  'use strict';

  const THEME_KEY = 'theme';
  const THEME_AUTO = 'auto';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  // Get current theme preference from localStorage (defaults to 'auto')
  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || THEME_AUTO;
    } catch (e) {
      // localStorage not available (privacy mode, etc.)
      return THEME_AUTO;
    }
  }

  // Save theme preference to localStorage
  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // localStorage not available, ignore
    }
  }

  // Detect system theme preference
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEME_DARK;
    }
    return THEME_LIGHT;
  }

  // Calculate effective theme (resolve 'auto' to actual theme)
  function getEffectiveTheme(preference) {
    if (preference === THEME_AUTO) {
      return getSystemTheme();
    }
    return preference;
  }

  // Apply theme to <html> element
  function applyTheme(theme) {
    const effectiveTheme = getEffectiveTheme(theme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }

  // Update button icon based on current preference
  function updateButtonIcon(preference) {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    const icons = {
      [THEME_AUTO]: '🌓',
      [THEME_LIGHT]: '☀️',
      [THEME_DARK]: '🌙'
    };

    const labels = {
      [THEME_AUTO]: '自動跟隨系統',
      [THEME_LIGHT]: '淺色模式',
      [THEME_DARK]: '深色模式'
    };

    button.textContent = icons[preference] || icons[THEME_AUTO];
    button.setAttribute('aria-label', `切換主題 (目前：${labels[preference] || labels[THEME_AUTO]})`);
  }

  // Cycle through theme states: auto → light → dark → auto
  function cycleTheme() {
    const current = getStoredTheme();
    let next;

    if (current === THEME_AUTO) {
      next = THEME_LIGHT;
    } else if (current === THEME_LIGHT) {
      next = THEME_DARK;
    } else {
      next = THEME_AUTO;
    }

    setStoredTheme(next);
    applyTheme(next);
    updateButtonIcon(next);
  }

  // Initialize theme on page load
  function initTheme() {
    const preference = getStoredTheme();
    applyTheme(preference);
    updateButtonIcon(preference);

    // Listen for system theme changes (only relevant in 'auto' mode)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', function() {
          const currentPreference = getStoredTheme();
          if (currentPreference === THEME_AUTO) {
            applyTheme(THEME_AUTO);
          }
        });
      }
      // Legacy browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(function() {
          const currentPreference = getStoredTheme();
          if (currentPreference === THEME_AUTO) {
            applyTheme(THEME_AUTO);
          }
        });
      }
    }
  }

  // Expose cycleTheme globally for button onclick
  window.toggleTheme = cycleTheme;

  // Initialize immediately
  initTheme();
})();
