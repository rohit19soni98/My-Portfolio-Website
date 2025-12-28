const PER_PAGE = 3;

const cardsRow = document.getElementById("cardsRow");
const pagination = document.getElementById("pagination");
const pageInfo = document.getElementById("pageInfo");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");

let currentPage = 1;

function totalPages() {
  return Math.ceil(BLOGS.length / PER_PAGE);
}

function paginateBlogs(page) {
  const start = (page - 1) * PER_PAGE;
  return BLOGS.slice(start, start + PER_PAGE);
}

function renderCards(page) {
  const items = paginateBlogs(page);

  cardsRow.innerHTML = items.map(blog => `
    <article class="card">
      <a class="card-link" href="blog-detail.html?id=${encodeURIComponent(blog.id)}">
        <img class="card-img" src="${blog.cover}" alt="${blog.title}">
        <div class="card-body">
          <div class="card-meta">
            <span>${blog.date}</span>
            <span class="dot">•</span>
            <span>${blog.categories.join(", ")}</span>
          </div>
          <h3 class="card-title">${blog.title}</h3>
          <p class="card-excerpt">${blog.excerpt}</p>
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
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      update();
    });
    pagination.appendChild(btn);
  }
}

function update() {
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
