import Swiper from "swiper";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const eventsSlider = document.querySelector(".events__slider");

if (eventsSlider) {
  new Swiper(eventsSlider, {
    modules: [A11y, Keyboard, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: { enabled: true, slideRole: "listitem" },
    pagination: {
      el: eventsSlider.querySelector(".events__pagination"),
      clickable: true,
    },
    navigation: {
      prevEl: eventsSlider.querySelector(".events__arrow--prev"),
      nextEl: eventsSlider.querySelector(".events__arrow--next"),
    },
    breakpoints: {
      768: { slidesPerView: 2, slidesPerGroup: 2 },
      1440: { slidesPerView: 3, slidesPerGroup: 3 },
    },
  });
}
