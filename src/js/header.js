const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.menu-close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function openMenu() {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
  burgerBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  burgerBtn.setAttribute('aria-expanded', 'false');
}

burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

// Клік по пункту меню: переходимо до секції і закриваємо меню
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Якщо екран розширили до планшета, а меню було відкрите
window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (e.matches) closeMenu();
});
