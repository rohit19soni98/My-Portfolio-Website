console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded fired");

  // -------------------------
  // HERO HEADLINE ROTATION
  // -------------------------
  const headlines = document.querySelectorAll(".hero__title .headline");
  console.log("headlines found:", headlines.length);

  let headlineTimer = null;

  function startHeadlineRotation() {
    if (headlines.length <= 1 || headlineTimer) return;

    let current = 0;
    const intervalTime = 2500;

    headlines.forEach((h, i) => h.classList.toggle("active", i === 0));

    headlineTimer = setInterval(() => {
      headlines[current].classList.remove("active");
      current = (current + 1) % headlines.length;

      // Force reflow so CSS animation restarts
      void headlines[current].offsetWidth;

      headlines[current].classList.add("active");
    }, intervalTime);
  }

  function stopHeadlineRotation() {
    if (!headlineTimer) return;
    clearInterval(headlineTimer);
    headlineTimer = null;
  }

  // Pause rotation when tab is hidden
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopHeadlineRotation() : startHeadlineRotation();
  });

  startHeadlineRotation();


  // -------------------------
  // FAQ ACCORDION (delegated)
  // -------------------------
  const faq = document.querySelector(".faq");
  const items = document.querySelectorAll(".faq__item");
  console.log("faq items found:", items.length);

  function closeItem(item) {
    const panel = item.querySelector(".faq__answer");
    item.classList.remove("is-open");
    if (panel) panel.style.maxHeight = "0px";
  }

  function openItem(item) {
    const panel = item.querySelector(".faq__answer");
    item.classList.add("is-open");
    if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
  }

  // Initialize state
  items.forEach((item) => {
    item.classList.contains("is-open") ? openItem(item) : closeItem(item);
  });

  function toggleFaq(btn) {
    const item = btn.closest(".faq__item");
    if (!item) return;

    const isOpen = item.classList.contains("is-open");
    items.forEach((other) => other !== item && closeItem(other));
    isOpen ? closeItem(item) : openItem(item);
  }

  if (faq) {
    faq.addEventListener("click", (e) => {
      const btn = e.target.closest(".faq__question");
      if (btn) toggleFaq(btn);
    });
  } else {
    items.forEach((item) => {
      const btn = item.querySelector(".faq__question");
      if (btn) btn.addEventListener("click", () => toggleFaq(btn));
    });
  }

  // -------------------------
  // STICKY BOTTOM MENU (rAF)
  // -------------------------
  // const menuhopin = document.getElementById("menuhopin");
  // console.log("menuhopin found:", !!menuhopin);

  // if (menuhopin) {
  //   const threshold = 50;
  //   let ticking = false;

  //   function updateMenu() {
  //     ticking = false;
  //     menuhopin.classList.toggle("headershow", window.scrollY > threshold);
  //   }

  //   function onScroll() {
  //     if (!ticking) {
  //       ticking = true;
  //       requestAnimationFrame(updateMenu);
  //     }
  //   }

  //   updateMenu();
  //   window.addEventListener("scroll", onScroll, { passive: true });
  // }

  // -------------------------
  // BACK TO TOP
  // -------------------------
  const topBtn = document.querySelector(".footer__toTop");
  console.log("back-to-top found:", !!topBtn);

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
