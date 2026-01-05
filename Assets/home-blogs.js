// Assets/home-blogs.js
(() => {
  const wrap = document.getElementById("homeBlogs");
  if (!wrap) return;

  const BLOGS = window.BLOGS || [];
  if (!BLOGS.length) {
    wrap.innerHTML = `<p class="muted">No blogs yet.</p>`;
    return;
  }

  // newest first
  const sorted = [...BLOGS].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const latest3 = sorted.slice(0, 3);

  wrap.innerHTML = latest3.map((blog, idx) => {
    return `
      <div class="blog-item">
        <div class="meta">
          <span>${formatDate(blog.date)}</span>
          <span class="dot">•</span>
          <span>${(Array.isArray(blog.categories) && blog.categories.length) ? blog.categories[0] : "Blog"}</span>
        </div>

        <h3>${escapeHtml(blog.title)}</h3>

        <a href="blog-detail.html?id=${encodeURIComponent(blog.id)}" class="read-link">
          READ THE ARTICLE <i class="fa-solid fa-arrow-right-long"></i>
        </a>
      </div>
      ${idx !== latest3.length - 1 ? "<hr />" : ""}
    `;
  }).join("");

  function formatDate(iso) {
    // expects YYYY-MM-DD
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
