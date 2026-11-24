import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getCategories, getTopBooks, getBooksByCategory } from './books-api.js';
import { showLoader, hideLoader } from './loader.js';

const ALL_CATEGORIES = 'All categories';
const LOAD_STEP = 4; // за ТЗ кнопка Show More додає 4 книги

const refs = {
  filter: document.querySelector('.books-filter'),
  filterToggle: document.querySelector('.books-filter-toggle'),
  filterLabel: document.querySelector('.books-filter-label'),
  categories: document.querySelector('.books-categories'),
  list: document.querySelector('.books-list'),
  moreBtn: document.querySelector('.books-more-btn'),
  shown: document.querySelector('.books-count-shown'),
  total: document.querySelector('.books-count-total'),
};

let books = [];
let shownCount = 0;

/* ---------- Допоміжні ---------- */

// За ТЗ: десктоп — 24 книги, мобілка — 10
function getInitialCount() {
  return window.matchMedia('(min-width: 1440px)').matches ? 24 : 10;
}

// top-books повертає категорії з книгами всередині — збираємо в один масив без дублів
function flattenTopBooks(categories) {
  const unique = new Map();
  categories
    .flatMap(category => category.books)
    .forEach(book => unique.set(book._id, book));
  return [...unique.values()];
}

function formatPrice(price) {
  const value = Number(price);
  return Number.isNaN(value) || value === 0 ? '' : `$${Math.round(value)}`;
}

/* ---------- Розмітка ---------- */

function createCategoryMarkup(name, isActive = false) {
  return `
    <li>
      <button
        class="books-category-btn${isActive ? ' is-active' : ''}"
        type="button"
        data-category="${name}"
        aria-pressed="${isActive}"
      >
        ${name}
      </button>
    </li>`;
}

function createBookMarkup({ _id, book_image, title, author, price }) {
  return `
    <li class="book-card">
      <img
        class="book-card-img"
        src="${book_image}"
        alt="${title} by ${author}"
        loading="lazy"
      />
      <div class="book-card-content">
        <div class="book-card-head">
          <h4 class="book-card-title">${title.toLowerCase()}</h4>
          <p class="book-card-author">${author}</p>
        </div>
        <p class="book-card-price">${formatPrice(price)}</p>
      </div>
      <button class="book-card-btn" type="button" data-book-id="${_id}">
        Learn More
      </button>
    </li>`;
}

/* ---------- Рендер ---------- */

function renderNextBooks(count) {
  const nextBooks = books.slice(shownCount, shownCount + count);
  refs.list.insertAdjacentHTML(
    'beforeend',
    nextBooks.map(createBookMarkup).join('')
  );
  shownCount += nextBooks.length;
  updateCounter();
}

function updateCounter() {
  refs.shown.textContent = shownCount;
  refs.total.textContent = books.length;
  // коли книги закінчились — ховаємо Show More
  refs.moreBtn.classList.toggle('is-hidden', shownCount >= books.length);
}

/* ---------- Завантаження ---------- */

async function loadBooks(category) {
  refs.list.innerHTML = '';
  refs.moreBtn.classList.add('is-hidden');
  books = [];
  shownCount = 0;

  const loader = showLoader(refs.list.parentElement);

  try {
    books =
      category === ALL_CATEGORIES
        ? flattenTopBooks(await getTopBooks())
        : await getBooksByCategory(category);

    if (!books.length) {
      refs.list.innerHTML =
        '<li class="books-empty">No books found in this category.</li>';
      updateCounter();
      return;
    }

    renderNextBooks(getInitialCount());
  } catch (error) {
    iziToast.error({ message: 'Failed to load books. Please try again.' });
    console.error(error);
  } finally {
    hideLoader(loader);
  }
}

async function loadCategories() {
  try {
    const categories = await getCategories();
    const names = categories
      .map(category => category.list_name)
      .filter(Boolean);

    refs.categories.innerHTML = [
      createCategoryMarkup(ALL_CATEGORIES, true),
      ...names.map(name => createCategoryMarkup(name)),
    ].join('');
  } catch (error) {
    iziToast.error({ message: 'Failed to load categories.' });
    console.error(error);
  }
}

/* ---------- Dropdown (мобілка і планшет) ---------- */

function toggleFilter(force) {
  const isOpen = refs.filter.classList.toggle('is-open', force);
  refs.filterToggle.setAttribute('aria-expanded', isOpen);
}

/* ---------- Обробники ---------- */

refs.filterToggle?.addEventListener('click', () => toggleFilter());

refs.categories?.addEventListener('click', event => {
  const btn = event.target.closest('.books-category-btn');
  if (!btn) return;

  refs.categories.querySelectorAll('.books-category-btn').forEach(item => {
    item.classList.remove('is-active');
    item.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('is-active');
  btn.setAttribute('aria-pressed', 'true');

  const category = btn.dataset.category;
  refs.filterLabel.textContent =
    category === ALL_CATEGORIES ? 'Categories' : category;
  toggleFilter(false);

  loadBooks(category);
});

refs.moreBtn?.addEventListener('click', () => renderNextBooks(LOAD_STEP));

// закриваємо dropdown кліком поза ним
document.addEventListener('click', event => {
  if (refs.filter && !refs.filter.contains(event.target)) {
    toggleFilter(false);
  }
});

/* ---------- Старт ---------- */

if (refs.list) {
  loadCategories();
  loadBooks(ALL_CATEGORIES);
}
