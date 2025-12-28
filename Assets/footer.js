document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("./footer.html");
    if (!res.ok) throw new Error("Footer not found");

    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);

    // Set year
    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Back to top
    const toTop = document.querySelector(".footer__toTop");
    if (toTop) {
      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Active menu highlight
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".footerMenu__link").forEach(link => {
      const page = link.getAttribute("href")?.split("#")[0];
      link.classList.toggle("is-active", page === current);
    });

  } catch (err) {
    console.error("Footer load failed:", err);
  }
});
