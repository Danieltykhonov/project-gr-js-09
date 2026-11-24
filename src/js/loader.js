const scrollUpBtn = document.querySelector('#scroll-up');

if (scrollUpBtn) {
  const toggleScrollUp = () => {
    scrollUpBtn.classList.toggle('is-visible', window.scrollY > 300);
  };

  window.addEventListener('scroll', toggleScrollUp, { passive: true });
  toggleScrollUp();

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
