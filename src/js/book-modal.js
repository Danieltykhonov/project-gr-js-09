import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import books from './books.js';

const modal = document.querySelector('#bookModal');
const backdrop = document.querySelector('.book-modal__backdrop');
const closeBtn = document.querySelector('.book-modal__close');

const coverEl = document.querySelector('#modalBookCover');
const titleEl = document.querySelector('#modalBookTitle');
const authorEl = document.querySelector('#modalBookAuthor');
const priceEl = document.querySelector('#modalBookPrice');

const detailsEl = document.querySelector('#modalBookDetails');
const shippingEl = document.querySelector('#modalBookShipping');
const returnsEl = document.querySelector('#modalBookReturns');

const formEl = document.querySelector('#bookModalForm');
const qtyInput = document.querySelector('#qtyInput');
const decreaseBtn = document.querySelector('#qtyDecrease');
const increaseBtn = document.querySelector('#qtyIncrease');
const addToCartBtn = document.querySelector('#addToCartBtn');
const statusMessageEl = document.querySelector('#modalStatusMessage');

const booksSection = document.querySelector('#books');

let currentBook = null;

const accordion = new Accordion('#bookAccordion', {
  duration: 250,
  showMultiple: true
});

function normalizeBook(rawBook) {
  return {
    id: String(rawBook.id ?? rawBook._id ?? rawBook.slug ?? ''),
    title: rawBook.title ?? rawBook.name ?? '',
    author: rawBook.author ?? '',
    price: rawBook.price ?? '',
    cover: rawBook.cover ?? rawBook.image ?? rawBook.img ?? '',
    details: rawBook.details ?? rawBook.description ?? '',
    shipping: rawBook.shipping ?? '',
    returns: rawBook.returns ?? ''
  };
}

function formatPrice(price) {
  if (price === '' || price === undefined || price === null) return '';
  const strPrice = String(price).trim();
  return strPrice.startsWith('$') ? strPrice : `$${strPrice}`;
}

function openBookModal(rawBook) {
  if (!rawBook || !modal) return;

  const book = normalizeBook(rawBook);
  currentBook = book;

  if (coverEl) {
    coverEl.src = book.cover;
    coverEl.alt = `${book.title} by ${book.author}`.trim();
  }
  if (titleEl) titleEl.textContent = book.title;
  if (authorEl) authorEl.textContent = book.author;
  if (priceEl) priceEl.textContent = formatPrice(book.price);

  if (detailsEl) detailsEl.textContent = book.details;
  if (shippingEl) shippingEl.textContent = book.shipping;
  if (returnsEl) returnsEl.textContent = book.returns;

  if (qtyInput) qtyInput.value = 1;
  if (statusMessageEl) statusMessageEl.textContent = '';

  accordion.closeAll();

  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookModal() {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  currentBook = null;
}

closeBtn?.addEventListener('click', closeBookModal);

backdrop?.addEventListener('click', (event) => {
  if (event.target === backdrop) {
    closeBookModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
    closeBookModal();
  }
});

function getQuantity() {
  const value = parseInt(qtyInput?.value, 10);
  return Number.isNaN(value) || value < 1 ? 1 : value;
}

decreaseBtn?.addEventListener('click', () => {
  if (!qtyInput) return;
  const current = getQuantity();
  qtyInput.value = current > 1 ? current - 1 : 1;
});

increaseBtn?.addEventListener('click', () => {
  if (!qtyInput) return;
  qtyInput.value = getQuantity() + 1;
});

qtyInput?.addEventListener('change', () => {
  qtyInput.value = getQuantity();
});

addToCartBtn?.addEventListener('click', () => {
  if (!currentBook) return;
  const quantity = getQuantity();
  const message = `Обрана кількість книг ("${currentBook.title}"): ${quantity}`;
  console.log(message, { book: currentBook, quantity });
  if (statusMessageEl) {
    statusMessageEl.textContent = message;
  }
});

formEl?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!currentBook) return;
  const quantity = getQuantity();
  console.log('Buy Now:', { book: currentBook, quantity });
  if (statusMessageEl) {
    statusMessageEl.textContent = 'Дякуємо за покупку';
  }
});

const triggerContainer = booksSection || document;

triggerContainer.addEventListener('click', (event) => {
  const learnMoreBtn = event.target.closest('[data-learn-more], .learn-more-btn');
  if (!learnMoreBtn) return;

  const card = learnMoreBtn.closest('[data-book-id], [data-id], .book-card');
  const bookId = learnMoreBtn.dataset.bookId || card?.dataset.bookId || card?.dataset.id;
  const bookTitle = learnMoreBtn.dataset.bookTitle || card?.querySelector('h2, h3, .book-title')?.textContent?.trim();

  const bookList = Array.isArray(books) ? books : [];
  const foundBook = bookList.find((item) => {
    const normalized = normalizeBook(item);
    if (bookId && normalized.id === String(bookId)) return true;
    if (bookTitle && normalized.title.toLowerCase() === bookTitle.toLowerCase()) return true;
    return false;
  });

  if (foundBook) {
    openBookModal(foundBook);
  }
});
