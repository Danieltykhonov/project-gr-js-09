import Accordion from 'accordion-js';
import 'accordion-js/accordion.min.css';
import { getBookById } from './books-api.js';

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

const formEl = document.querySelector('#bookOrderForm');
const qtyInput = document.querySelector('#qtyInput');
const decreaseBtn = document.querySelector('#qtyDecrease');
const increaseBtn = document.querySelector('#qtyIncrease');
const addToCartBtn = document.querySelector('#addToCartBtn');
const statusMessageEl = document.querySelector('#modalStatusMessage');

const booksSection = document.querySelector('#books');

const SHIPPING_TEXT =
  'We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.';
const RETURNS_TEXT =
  'You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.';

let currentBook = null;
let isLoadingBook = false;

const accordionContainer = document.querySelector('#bookAccordion');
const accordion = accordionContainer
  ? new Accordion(accordionContainer, {
      duration: 250,
      showMultiple: true,
    })
  : null;

function normalizeBook(rawBook) {
  return {
    id: String(rawBook.id ?? rawBook._id ?? rawBook.slug ?? ''),
    title: rawBook.title ?? rawBook.name ?? '',
    author: rawBook.author ?? '',
    price: rawBook.price ?? '',
    cover:
      rawBook.book_image ?? rawBook.cover ?? rawBook.image ?? rawBook.img ?? '',
    details: rawBook.description ?? rawBook.details ?? '',
    shipping: rawBook.shipping ?? '',
    returns: rawBook.returns ?? '',
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
  if (shippingEl) shippingEl.textContent = book.shipping || SHIPPING_TEXT;
  if (returnsEl) returnsEl.textContent = book.returns || RETURNS_TEXT;

  if (qtyInput) qtyInput.value = 1;
  if (statusMessageEl) statusMessageEl.textContent = '';

  accordion?.closeAll();

  modal.classList.add('is-open');
  modal.removeAttribute('hidden');
  document.body.classList.add('no-scroll');
}

function closeBookModal() {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('hidden', '');
  document.body.classList.remove('no-scroll');
  currentBook = null;
}

closeBtn?.addEventListener('click', closeBookModal);

backdrop?.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeBookModal();
  }
});

document.addEventListener('keydown', event => {
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

formEl?.addEventListener('submit', event => {
  event.preventDefault();
  if (!currentBook) return;
  const quantity = getQuantity();
  console.log('Buy Now:', { book: currentBook, quantity });
  if (statusMessageEl) {
    statusMessageEl.textContent = 'Дякуємо за покупку';
  }
});

const triggerContainer = booksSection || document;

triggerContainer.addEventListener('click', async event => {
  const learnMoreBtn = event.target.closest(
    '[data-learn-more], .learn-more-btn, button[data-book-id]'
  );
  if (!learnMoreBtn || isLoadingBook) return;

  const card = learnMoreBtn.closest('[data-book-id], [data-id], .book-card');
  const bookId =
    learnMoreBtn.dataset.bookId || card?.dataset.bookId || card?.dataset.id;

  if (!bookId) return;

  try {
    isLoadingBook = true;
    learnMoreBtn.disabled = true;

    const bookData = await getBookById(bookId);
    const resolvedBook = bookData?.data ?? bookData;

    if (resolvedBook) {
      openBookModal(resolvedBook);
    }
  } catch (error) {
    console.error('Unable to load the data:', error);
  } finally {
    isLoadingBook = false;
    learnMoreBtn.disabled = false;
  }
});
