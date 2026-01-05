// Assets/project-list.js
(() => {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const PROJECTS = window.PROJECTS || [];

  const isLocal =
    location.hostname === "127.0.0.1" ||
    location.hostname === "localhost";

  function projectLink(id) {
    const slug = encodeURIComponent(id);
    return isLocal
      ? `project-detail.html?id=${slug}`
      : `/projects/${slug}`;
  }

  if (!PROJECTS.length) {
    grid.innerHTML = `
      <p class="muted">
        No projects found. Check: Assets/projects-data.js must set <b>window.PROJECTS</b>.
      </p>
    `;
    console.log("PROJECTS is empty or not loaded", window.PROJECTS);
    return;
  }

  grid.innerHTML = PROJECTS.map(project => `
    <article class="card">
      <a class="card-link" href="${projectLink(project.id)}">
        <img class="card-img" src="${project.cover}" alt="${escapeHtml(project.title)}">
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-excerpt">${escapeHtml(project.role || "")} • ${escapeHtml(project.year || "")}</p>
          <span class="card-cta">View case study →</span>
        </div>
      </a>
    </article>
  `).join("");

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
