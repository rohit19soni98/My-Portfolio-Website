// Assets/project-list.js
const PROJECTS = window.PROJECTS || [];
const grid = document.getElementById("projectsGrid");

if (grid) {
  grid.innerHTML = PROJECTS.map(project => `
    <article class="card">
      <a class="card-link" href="project-detail.html?id=${encodeURIComponent(project.id)}">
        <img class="card-img" src="${project.cover}" alt="${project.title}">
        <div class="card-body">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-excerpt">${project.role} • ${project.year}</p>
          <span class="card-cta">View case study →</span>
        </div>
      </a>
    </article>
  `).join("");
}
