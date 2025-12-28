function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function slugToBlog(id) {
  return BLOGS.find(b => b.id === id);
}

function makeTOC(container, contentRoot) {
  const headings = contentRoot.querySelectorAll("h2, h3");
  container.innerHTML = "";

  if (!headings.length) {
    container.innerHTML = `<div class="muted">No sections</div>`;
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "toc-list";

  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    }

    const li = document.createElement("li");
    li.className = "toc-item " + (h.tagName === "H3" ? "toc-sub" : "");
    li.innerHTML = `<a href="#${encodeURIComponent(h.id)}">${h.textContent}</a>`;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

function setPrevNext(currentIndex) {
  const prev = BLOGS[currentIndex - 1] || null;
  const next = BLOGS[currentIndex + 1] || null;

  const prevEl = document.getElementById("prevBlog");
  const nextEl = document.getElementById("nextBlog");

  if (prev) {
    prevEl.href = `blog-detail.html?id=${encodeURIComponent(prev.id)}`;
    prevEl.textContent = `← ${prev.title}`;
    prevEl.classList.remove("disabled");
  } else {
    prevEl.href = "#";
    prevEl.textContent = "← Previous";
    prevEl.classList.add("disabled");
  }

  if (next) {
    nextEl.href = `blog-detail.html?id=${encodeURIComponent(next.id)}`;
    nextEl.textContent = `${next.title} →`;
    nextEl.classList.remove("disabled");
  } else {
    nextEl.href = "#";
    nextEl.textContent = "Next →";
    nextEl.classList.add("disabled");
  }
}

function setupScrollProgress() {
  const bar = document.getElementById("progressBar");
  const label = document.getElementById("progressLabel");

  function onScroll() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;

    const pct = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
    const rounded = Math.round(pct);

    bar.style.width = pct + "%";
    label.textContent = `${rounded}%`;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

(function init() {
  const blogId = getQueryParam("id") || BLOGS[0]?.id;
  const blog = slugToBlog(blogId);

  if (!blog) {
    document.getElementById("blogTitle").textContent = "Blog not found";
    document.getElementById("blogContent").innerHTML = `<p class="muted">Invalid blog id.</p>`;
    return;
  }

  const index = BLOGS.findIndex(b => b.id === blog.id);

  document.title = blog.title;
  document.getElementById("blogTitle").textContent = blog.title;
  document.getElementById("blogMeta").textContent = `${blog.date} • ${blog.categories.join(", ")}`;

  const cats = document.getElementById("blogCategories");
  cats.innerHTML = blog.categories.map(c => `<span class="chip">${c}</span>`).join("");

  const contentEl = document.getElementById("blogContent");
  contentEl.innerHTML = blog.content;

  makeTOC(document.getElementById("toc"), contentEl);
  setPrevNext(index);
  setupScrollProgress();
})();
