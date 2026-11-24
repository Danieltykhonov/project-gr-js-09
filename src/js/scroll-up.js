
const scrollUpBtn = document.querySelector('#scroll-up');

if (scrollUpBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollUpBtn.classList.add('is-visible');
    } else {
      scrollUpBtn.classList.remove('is-visible');
    }
  });

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
