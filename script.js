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
  if (!items.length) return;

  // If Font Awesome fails to load, show fallback text icons
  const faLoaded = !!document.querySelector('link[href*="fontawesome"], link[href*="use.fontawesome.com"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]');

  if (!faLoaded) {
    document.querySelectorAll(".faq__icon").forEach((el) => (el.style.display = "none"));
    document.querySelectorAll(".faq__iconText").forEach((el) => (el.style.display = "grid"));
  }

  function setIcons(item, expanded) {
    // Font Awesome icon
    const icon = item.querySelector(".faq__icon i");
    if (icon) {
      icon.classList.toggle("fa-plus", !expanded);
      icon.classList.toggle("fa-minus", expanded);
    }

    // Fallback text icon
    const txt = item.querySelector(".faq__iconText");
    if (txt) txt.textContent = expanded ? "−" : "+";
  }

  function closeItem(item) {
    const panel = item.querySelector(".faq__answer");
    item.classList.remove("is-open");
    panel.style.maxHeight = "0px";
    setIcons(item, false);
  }

  function openItem(item) {
    const panel = item.querySelector(".faq__answer");
    item.classList.add("is-open");
    panel.style.maxHeight = panel.scrollHeight + "px";
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

      // toggle
      if (isOpen) closeItem(item);
      else openItem(item);
    });
  });

  // Resize fix
  window.addEventListener("resize", () => {
    const openItemEl = document.querySelector(".faq__item.is-open");
    if (!openItemEl) return;
    const panel = openItemEl.querySelector(".faq__answer");
    panel.style.maxHeight = panel.scrollHeight + "px";
  });
});
