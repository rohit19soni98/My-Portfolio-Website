document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     HERO HEADLINE ROTATION
     ========================= */
  const headlines = document.querySelectorAll(".hero__title .headline");

  if (headlines.length) {
    let current = 0;
    const intervalTime = 2500;

    headlines.forEach((h, i) => h.classList.toggle("active", i === 0));

    function nextHeadline() {
      headlines[current].classList.remove("active");
      current = (current + 1) % headlines.length;

      // restart animation
      void headlines[current].offsetWidth;

      headlines[current].classList.add("active");
    }

    let timer = setInterval(nextHeadline, intervalTime);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else timer = setInterval(nextHeadline, intervalTime);
    });
  } else {
    console.warn("Headline rotation: .hero__title .headline not found");
  }

  /* =========================
     FAQ ACCORDION + ICONS
     ========================= */
  const items = document.querySelectorAll(".faq__item");
  if (items.length) {
    function setIcons(item, expanded) {
      // Font Awesome icon
      const icon = item.querySelector(".faq__icon i");
      if (icon) {
        icon.classList.toggle("fa-plus", !expanded);
        icon.classList.toggle("fa-minus", expanded);
      }

      // Optional fallback text icon (only if you added it in HTML)
      const txt = item.querySelector(".faq__iconText");
      if (txt) txt.textContent = expanded ? "−" : "+";
    }

    function closeItem(item) {
      const panel = item.querySelector(".faq__answer");
      item.classList.remove("is-open");
      if (panel) panel.style.maxHeight = "0px";
      setIcons(item, false);
    }

    function openItem(item) {
      const panel = item.querySelector(".faq__answer");
      item.classList.add("is-open");
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
      setIcons(item, true);
    }

    // Init
    items.forEach((item) => {
      const panel = item.querySelector(".faq__answer");
      const btn = item.querySelector(".faq__question");
      if (!panel || !btn) return;

      if (item.classList.contains("is-open")) openItem(item);
      else closeItem(item);

      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // close others
        items.forEach((other) => {
          if (other !== item) closeItem(other);
        });

        // toggle current
        if (isOpen) closeItem(item);
        else openItem(item);
      });
    });

    // Resize fix
    window.addEventListener("resize", () => {
      const openItemEl = document.querySelector(".faq__item.is-open");
      if (!openItemEl) return;
      const panel = openItemEl.querySelector(".faq__answer");
      if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  /* =========================
     STICKY BOTTOM MENU (menuhopin)
     ========================= */
  const menuhopin = document.getElementById("menuhopin");
  if (menuhopin) {
    const threshold = 50;

    function onScroll() {
      if (window.scrollY > threshold) menuhopin.classList.add("headershow");
      else menuhopin.classList.remove("headershow");
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =========================
     FOOTER BACK TO TOP
     ========================= */
  const topBtn = document.querySelector(".footer__toTop");
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
