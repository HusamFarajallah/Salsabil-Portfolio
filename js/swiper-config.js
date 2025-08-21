// Initialize Swiper for testimonials
const swiper = new Swiper('.testimonials-slider', {
  // Optional parameters
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // When window width is >= 768px
    768: {
      slidesPerView: 2,
    },
    // When window width is >= 1024px
    1024: {
      slidesPerView: 3,
    },
  },
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
