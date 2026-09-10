"use strict";

// Keep the research record available even when citation data cannot be loaded.
async function loadScholarStats() {
  const root = document.querySelector("[data-scholar-metrics]");
  if (!root) return;
  const formatMetric = (value) =>
    typeof value === "number" && Number.isFinite(value)
      ? new Intl.NumberFormat("en-US").format(value)
      : "—";
  try {
    const response = await fetch("data/scholar-stats.json", {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Scholar statistics unavailable");
    const stats = await response.json();
    root.querySelector("[data-scholar-citations]").textContent = formatMetric(
      stats.citations,
    );
    root.querySelector("[data-scholar-hindex]").textContent = formatMetric(
      stats.hIndex,
    );
    root.querySelector("[data-scholar-i10index]").textContent = formatMetric(
      stats.i10Index,
    );
    const date = stats.updatedAt ? new Date(stats.updatedAt) : null;
    root.querySelector("[data-scholar-updated]").textContent =
      date && !Number.isNaN(date.getTime())
        ? `Updated ${date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
        : "Google Scholar profile";
  } catch {
    root.dataset.state = "unavailable";
    root.querySelector("[data-scholar-updated]").textContent =
      "View the latest statistics on Google Scholar ↗";
    root.querySelectorAll(".metric-value").forEach((metric) => {
      metric.textContent = "—";
    });
  }
}

loadScholarStats();

// Native anchors preserve deep links, browser history, and keyboard behavior.
const navLinks = [...document.querySelectorAll(".nav-link")];
const navSections = navLinks.map((link) =>
  document.querySelector(link.getAttribute("href")),
);
let scheduled = false;
function updateActiveSection() {
  const threshold =
    document.querySelector(".site-header").getBoundingClientRect().height + 70;
  let current = navSections[0];
  navSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= threshold) current = section;
  });
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scheduled = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateActiveSection);
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateActiveSection);
updateActiveSection();
