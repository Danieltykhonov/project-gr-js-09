import Swiper from 'swiper';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';

const heroSwiperEl = document.querySelector('.hero-swiper');

if (heroSwiperEl) {
  new Swiper(heroSwiperEl, {
    modules: [Navigation, Keyboard, A11y],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 500,
    // без loop: за ТЗ крайня стрілка має ставати disabled
    loop: false,
    navigation: {
      prevEl: '.hero-nav-prev',
      nextEl: '.hero-nav-next',
      // Swiper ставить цей клас і атрибут disabled на <button>
      disabledClass: 'is-disabled',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      // за замовчуванням Swiper ставить <li> role="group" — тоді <ul>
      // перестає бути списком для скрінрідерів; лишаємо рідну роль listitem
      slideRole: null,
    },
    breakpoints: {
      1440: {
        spaceBetween: 24,
      },
    },
  });
}
