import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const feedbacksSwiper = new Swiper('.feedbacks-swiper', {
  modules: [Navigation, Pagination, Keyboard],
  slidesPerView: 1,
  spaceBetween: 24,

  pagination: {
    el: '.feedbacks-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.feedbacks-button-next',
    prevEl: '.feedbacks-button-prev',
  },
  keyboard: {
    enabled: true,
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
