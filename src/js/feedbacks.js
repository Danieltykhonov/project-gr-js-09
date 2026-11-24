import Swiper from "swiper";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const feedbacksEl = document.querySelector(".feedbacks-swiper");

if (feedbacksEl) {
  new Swiper(feedbacksEl, {
    modules: [A11y, Keyboard, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    watchOverflow: true,

    pagination: {
      el: ".feedbacks-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".feedbacks-button-next",
      prevEl: ".feedbacks-button-prev",
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    a11y: {
      enabled: true,
      prevSlideMessage: "Previous feedbacks",
      nextSlideMessage: "Next feedbacks",
      slideRole: "listitem",
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1440: {
        slidesPerView: 3,
      },
    },
  });
}
