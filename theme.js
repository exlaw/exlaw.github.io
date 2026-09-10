"use strict";

// Apply the preference before the stylesheet loads to avoid a theme flash.
(() => {
  const storageKey = "aiwei-color-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const validTheme = (value) => value === "light" || value === "dark";
  let preference = null;
  let button = null;

  try {
    const stored = localStorage.getItem(storageKey);
    if (validTheme(stored)) preference = stored;
  } catch {
    // The toggle still works when browser storage is unavailable.
  }

  function applyTheme() {
    const theme = preference || (systemTheme.matches ? "dark" : "light");
    root.dataset.theme = theme;
    if (themeColor) {
      themeColor.content = theme === "dark" ? "#111820" : "#fafbfc";
    }
    if (button) {
      const nextTheme = theme === "dark" ? "light" : "dark";
      button.querySelector("[data-theme-label]").textContent =
        nextTheme === "light" ? "Light" : "Dark";
      button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
      button.title = `Switch to ${nextTheme} mode`;
    }
  }

  applyTheme();

  function setupToggle() {
    button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    button.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, preference);
      } catch {
        // Retain the preference for this page even without persistent storage.
      }
      applyTheme();
    });
    applyTheme();
    button.hidden = false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupToggle, { once: true });
  } else {
    setupToggle();
  }

  systemTheme.addEventListener("change", () => {
    if (!preference) applyTheme();
  });

  // Keep open tabs in sync, including returning to the system preference.
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = validTheme(event.newValue) ? event.newValue : null;
    applyTheme();
  });
})();
