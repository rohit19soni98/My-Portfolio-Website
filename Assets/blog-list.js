// Assets/blog-list.js
const BLOGS = window.BLOGS || [];
const PER_PAGE = 9;

const cardsRow = document.getElementById("cardsRow");
const pagination = document.getElementById("pagination");
const pageInfo = document.getElementById("pageInfo");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

let currentPage = 1;

// Local dev (VS Code Live Server) vs Production (Hostinger)
const isLocal =
  location.hostname === "127.0.0.1" ||
  location.hostname === "localhost";

// Build correct link for both environments
function blogLink(id) {
  const slug = encodeURIComponent(id);
  return isLocal
    ? `blog-detail.html?id=${slug}`  // Live Server
    : `/blog/${slug}`;              // Hostinger clean URL
}

// newest first
BLOGS.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

function totalPages() {
  return Math.max(1, Math.ceil(BLOGS.length / PER_PAGE));
}

function paginateBlogs(page) {
  const start = (page - 1) * PER_PAGE;
  return BLOGS.slice(start, start + PER_PAGE);
}

function renderCards(page) {
  const items = paginateBlogs(page);

  cardsRow.innerHTML = items.map(blog => `
    <article class="card">
      <a class="card-link" href="${blogLink(blog.id)}">
        <img class="card-img" src="${blog.cover}" alt="${escapeHtml(blog.title)}">
        <div class="card-body">
          <div class="card-meta">
            <span>${blog.date || ""}</span>
            <span class="dot">•</span>
            <span>${Array.isArray(blog.categories) ? blog.categories.join(", ") : ""}</span>
          </div>
          <h3 class="card-title">${escapeHtml(blog.title)}</h3>
          <p class="card-excerpt">${escapeHtml(blog.excerpt || "")}</p>
          <span class="card-cta">Read more →</span>
        </div>
      </a>
    </article>
  `).join("");

  pageInfo.textContent = `Page ${page} of ${totalPages()}`;
  prevPageBtn.disabled = page <= 1;
  nextPageBtn.disabled = page >= totalPages();
}

function renderPagination() {
  pagination.innerHTML = "";
  const pages = totalPages();
  if (pages <= 1) return;

  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-btn" + (i === currentPage ? " active" : "");
    btn.type = "button";
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      update();
    });
    pagination.appendChild(btn);
  }
}

function update() {
  currentPage = Math.min(Math.max(1, currentPage), totalPages());
  renderCards(currentPage);
  renderPagination();
}

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    update();
  }
});

nextPageBtn.addEventListener("click", () => {
  if (currentPage < totalPages()) {
    currentPage++;
    update();
  }
});

update();

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
