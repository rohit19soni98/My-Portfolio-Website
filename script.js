/* HERO HEADLINE ROTATION */
(() => {
  const headlines = document.querySelectorAll(".hero__title .headline");
  if (!headlines.length) return;

  let current = 0;
  const intervalTime = 2500;

  headlines.forEach((h, i) => h.classList.toggle("active", i === 0));

  let timer = setInterval(nextHeadline, intervalTime);

  function nextHeadline() {
    headlines[current].classList.remove("active");
    current = (current + 1) % headlines.length;
    void headlines[current].offsetWidth;
    headlines[current].classList.add("active");
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else timer = setInterval(nextHeadline, intervalTime);
  });
})();

/* FAQ ACCORDION + FA ICONS */
(() => {
  const items = document.querySelectorAll(".faq__item");
  if (!items.length) return;

  function setIcon(btn, expanded) {
    const icon = btn.querySelector(".faq__icon i");
    if (!icon) return;
    icon.classList.toggle("fa-plus", !expanded);
    icon.classList.toggle("fa-minus", expanded);
  }

  function closeItem(item) {
    const btn = item.querySelector(".faq__question");
    const panel = item.querySelector(".faq__answer");
    item.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
    setIcon(btn, false);
  }

  function openItem(item) {
    const btn = item.querySelector(".faq__question");
    const panel = item.querySelector(".faq__answer");
    item.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    panel.style.maxHeight = panel.scrollHeight + "px";
    setIcon(btn, true);
  }

  items.forEach((item) => {
    const btn = item.querySelector(".faq__question");
    const panel = item.querySelector(".faq__answer");
    const expanded = btn.getAttribute("aria-expanded") === "true";

    if (expanded) openItem(item);
    else panel.style.maxHeight = "0px";

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      items.forEach((other) => other !== item && closeItem(other));
      if (isOpen) closeItem(item);
      else openItem(item);
    });
  });

  window.addEventListener("resize", () => {
    const openPanel = document.querySelector(".faq__item.is-open .faq__answer");
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + "px";
  });
})();
