function slider(sliderContainer, slidesArray, gap) {
  const btn = document.querySelector('.slider-btn');
  if (!btn) return;

  let currentSlide = 0;
  let slideWidth = slidesArray[0].offsetWidth + gap;
  let totalSlides = slidesArray.length;

  function resetSlides() {
    slidesArray.forEach((slide) => slide.classList.remove('active'));
  }

  function updateSlider() {
    slideWidth = slidesArray[0].offsetWidth + gap;
    sliderContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  }

  btn.addEventListener('click', () => {
    const slideNumber = document.querySelector('.slide-number');
    currentSlide++;
    if (currentSlide >= totalSlides) currentSlide = 0;
    resetSlides();
    slidesArray[currentSlide].classList.add('active');
    if (slideNumber) {
      slideNumber.innerHTML = `${currentSlide + 1}<span>/${totalSlides}</span>`;
    }
    sliderContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
  });

  window.addEventListener('resize', updateSlider);
  resetSlides();
  slidesArray[currentSlide].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const sliders = [
    { container: document.querySelector('.review-slider'), items: '.review-item' },
    { container: document.querySelector('.our-works-slider'), items: '.our-work' },
  ];

  sliders.forEach(({ container, items }) => {
    if (container) {
      const slidesArray = Array.from(container.querySelectorAll(items));
      if (slidesArray.length > 0) {
        slider(container, slidesArray, 32);
      }
    }
  });
});
