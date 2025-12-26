    const headlines = document.querySelectorAll('.hero__title .headline');
    let currentIndex = 0;
    const intervalTime = 2500;

    setInterval(() => {
      headlines[currentIndex].classList.remove('active');

      currentIndex = (currentIndex + 1) % headlines.length;

      // restart animation
      void headlines[currentIndex].offsetWidth;

      headlines[currentIndex].classList.add('active');
    }, intervalTime);



    // FAQ

  (function () {
    const items = document.querySelectorAll(".faq__item");

    function closeItem(item) {
      const btn = item.querySelector(".faq__question");
      const panel = item.querySelector(".faq__answer");
      item.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "0px";
    }

    function openItem(item) {
      const btn = item.querySelector(".faq__question");
      const panel = item.querySelector(".faq__answer");
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

    // Init based on aria-expanded (first one open in markup)
    items.forEach((item) => {
      const btn = item.querySelector(".faq__question");
      const panel = item.querySelector(".faq__answer");
      const expanded = btn.getAttribute("aria-expanded") === "true";

      if (expanded) openItem(item);
      else panel.style.maxHeight = "0px";

      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        // Only one open at a time
        items.forEach((other) => other !== item && closeItem(other));

        if (isOpen) closeItem(item);
        else openItem(item);
      });
    });

    // Keep open panel height correct on resize
    window.addEventListener("resize", () => {
      items.forEach((item) => {
        const btn = item.querySelector(".faq__question");
        const panel = item.querySelector(".faq__answer");
        if (btn.getAttribute("aria-expanded") === "true") {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  })();
