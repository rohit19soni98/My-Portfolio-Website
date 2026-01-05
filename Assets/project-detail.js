// Assets/project-detail.js
const PROJECTS = window.PROJECTS || [];

const id = new URLSearchParams(location.search).get("id");
const project = PROJECTS.find(p => p.id === id);

if (!project) {
  document.title = "Project not found";
  const titleEl = document.getElementById("projectTitle");
  const metaEl = document.getElementById("projectMeta");
  const contentEl = document.getElementById("projectContent");

  if (titleEl) titleEl.textContent = "Project not found";
  if (metaEl) metaEl.textContent = "";
  if (contentEl) contentEl.innerHTML = "<p class='muted'>Invalid project id.</p>";
} else {
  document.title = project.title;

  document.getElementById("projectTitle").textContent = project.title;

  const toolsText = Array.isArray(project.tools) ? project.tools.join(", ") : "";
  document.getElementById("projectMeta").textContent =
    `${project.year || ""} • ${project.role || ""}${toolsText ? " • " + toolsText : ""}`;

  const cover = document.getElementById("projectCover");
  if (cover) {
    cover.src = project.cover;
    cover.alt = project.title;
  }

  document.getElementById("projectContent").innerHTML = project.content || "<p class='muted'>No content.</p>";
}
