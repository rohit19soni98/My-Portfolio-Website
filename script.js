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