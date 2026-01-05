// Assets/project-detail.js
const PROJECTS = window.PROJECTS || [];

const id = new URLSearchParams(location.search).get("id");
const project = PROJECTS.find(p => p.id === id);

if (!project) {
  document.body.innerHTML = "<p class='muted'>Project not found.</p>";
} else {
  document.title = project.title;

  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectMeta").textContent =
    `${project.year} • ${project.role} • ${project.tools.join(", ")}`;

  const cover = document.getElementById("projectCover");
  cover.src = project.cover;
  cover.alt = project.title;

  document.getElementById("projectContent").innerHTML = project.content;
}
