# 📘 Памʼятка для команди Booksy

## 🚀 Перший запуск

```bash
git clone https://github.com/Danieltykhonov/project-gr-js-09.git
cd project-gr-js-09
npm i
npm run dev
```

- 📁 Репозиторій: https://github.com/Danieltykhonov/project-gr-js-09
- 📋 Дошка задач: https://github.com/users/Danieltykhonov/projects/2/views/1
- 🌐 Сайт: https://danieltykhonov.github.io/project-gr-js-09/

---

## 🔁 Робота над задачею

**1. Перед початком — свіжий main**

```bash
git switch main
git pull
npm i
```

**2. Своя гілка**

```bash
git switch -c feature/назва-секції
```

Назви гілок:

- `feature/hero`, `feature/books` — нова секція або функціонал
- `fix/burger-menu` — виправлення помилок

**3. Коміт і пуш**

```bash
git add .
git commit -m "Add hero slider"
git push -u origin feature/hero
```

Наступні пуші в цю ж гілку — просто `git push`.

**4. Pull Request**

- На GitHub → **Compare & pull request**
- base: `main` ← compare: твоя гілка
- В описі: коротко що зроблено + `Closes #номер-задачі`
- Додай ревʼюера, картку на дошці перетягни в **Review / PR**

**5. Якщо просять виправити** — правиш у тій самій гілці, `commit` → `push`, PR
оновиться сам.

**6. Якщо main оновився, поки ти працюєш:**

```bash
git pull origin main
```

⚠️ Прямо в `main` не пушимо — тільки через Pull Request.

---

## 📂 Де що лежить

Кожен працює **тільки у своїх файлах**:

| Що                | Де                                                      |
| ----------------- | ------------------------------------------------------- |
| HTML секції       | `src/partials/назва.html`                               |
| Стилі секції      | `src/css/sections/назва.css`                            |
| JS секції         | `src/js/назва.js`                                       |
| Запити до бекенду | `src/js/books-api.js` (спільний)                        |
| Іконки            | `src/img/sprite.svg`                                    |
| Спільні стилі     | `src/css/common.css` — ❗ не змінювати без домовленості |

---

## 🧱 Каркас секції

```html
<section class="section books" id="books">
  <div class="container">
    <h2 class="section-title">Books</h2>
    <!-- контент -->
  </div>
</section>
```

- `section` — відступи зверху/знизу (16 / 32 / 64px)
- `container` — ширина і бокові відступи (16 / 32 / 64px)
- `section-title` — стиль заголовка секції (36 / 48px)
- `books` — твій клас, на нього вішаєш свої стилі

**id секцій** (для навігації в хедері й футері): `#hero` · `#books` ·
`#feedbacks` · `#events` · `#article` · `#location`

---

## 🎨 Кольори — тільки через змінні

```css
/* ✅ так */
color: var(--color-accent);

/* ❌ не так */
color: #e15d05;
```

| Змінна                   | Що це                        |
| ------------------------ | ---------------------------- |
| `--color-bg`             | головний фон `#fceee6`       |
| `--color-text`           | текст і заголовки `#0b0500`  |
| `--color-white`          | білий                        |
| `--color-accent`         | оранжевий `#e15d05`          |
| `--color-accent-dark`    | темніший оранжевий `#b44a04` |
| `--color-accent-darkest` | темно-коричневий `#5a2502`   |
| `--color-footer-bg`      | фон футера `#ea8d50`         |
| `--transition`           | для всіх hover-ефектів       |

Шрифт Rubik, 18px і колір тексту вже задані на `body` — для звичайного тексту
нічого писати не треба.

---

## 📱 Медіазапити — Mobile First

Спочатку стилі для мобілки, потім `min-width`:

```css
.books-list {
  flex-direction: column;
}

@media screen and (min-width: 768px) {
  .books-list {
    flex-direction: row;
  }
}

@media screen and (min-width: 1440px) {
  .books-list {
    gap: 24px;
  }
}
```

Брейкпоінти: **320 (гумова) → 375 → 768 → 1440**

---

## 🛠 Корисне

**Іконка зі спрайту:**

```html
<svg class="icon" width="24" height="24">
  <use href="./img/sprite.svg#icon-arrow-right"></use>
</svg>
```

**Прихований текст** (для скрінрідерів, напр. кнопка-іконка):

```html
<span class="visually-hidden">Next slide</span>
```

**Заборона скролу** (бургер-меню, модалки):

```js
document.body.classList.add('no-scroll');
document.body.classList.remove('no-scroll');
```

**Сховати елемент** (напр. кнопку Show More):

```js
button.classList.add('is-hidden');
```

**Запити до бекенду:**

```js
import {
  getCategories,
  getTopBooks,
  getBooksByCategory,
  getBookById,
} from './books-api.js';
```

**Повідомлення:**

```js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.success({ message: 'Дякуємо за покупку!' });
iziToast.error({ message: 'Щось пішло не так' });
```

**Бібліотеки вже встановлені:** `swiper`, `accordion-js`, `axios`, `izitoast` —
нічого ставити не треба, просто `npm i` після `git pull`.

---

## 🖼 Картинки

- Папка під секцію: `img/hero/`, `img/events/`…
- Retina: дві версії `name@1x.webp` і `name@2x.webp` + `srcset`
- Перед комітом стиснути (squoosh.app або tinypng.com)
- `loading="lazy"` для всіх, крім Hero

---

## ✅ Перед PR перевір

- [ ] Сторінка запускається без помилок у консолі
- [ ] Перевірено на 320, 375, 768 і 1440px
- [ ] Є hover-ефекти і `cursor: pointer` на клікабельному
- [ ] Код відформатований Prettier
- [ ] HTML валідний (https://validator.w3.org/)
- [ ] В описі PR є `Closes #номер`

Питання — пишіть у чат 🙂
