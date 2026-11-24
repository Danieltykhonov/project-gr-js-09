import './js/header.js';
import './js/hero.js';
import './js/books.js';
import './js/feedbacks.js';
import './js/events.js';
import './js/book-modal.js';
import './js/contact-modal.js';
import './js/footer.js';
import './js/loader.js';

import AOS from 'aos';
import 'aos/dist/aos.css';

document.querySelectorAll('section:not(.hero)').forEach(section => {
  section.setAttribute('data-aos', 'fade-up');
});

AOS.init({
  duration: 800,
  once: true,
});
