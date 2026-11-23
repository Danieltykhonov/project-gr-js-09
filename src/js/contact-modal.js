import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const backdrop = document.querySelector(".contact-backdrop");

if (backdrop) {
  const closeBtn = backdrop.querySelector(".contact-modal-close-btn");
  const modalSubtitle = backdrop.querySelector(".contact-modal-subtitle");
  const form = backdrop.querySelector(".contact-modal-form");

  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  function openModal(eventTitle) {
    modalSubtitle.textContent = eventTitle;
    backdrop.classList.add("is-open");
    document.body.classList.add("no-scroll");
    document.addEventListener("keydown", onEscKeyPress);
  }

  function closeModal() {
    backdrop.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onEscKeyPress);
  }

  function onEscKeyPress(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".event-card__btn");
    if (!openBtn) return;

    const titleEl = openBtn
      .closest(".events__item")
      ?.querySelector(".event-card__title");

    openModal(titleEl ? titleEl.textContent.trim() : "");
  });

  closeBtn.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("user_name").trim();
    const email = formData.get("user_email").trim();

    if (name.length < 3) {
      iziToast.error({
        title: "Error",
        message: "Please enter your name (at least 3 characters).",
        position: "topRight",
      });
      return;
    }

    if (!emailPattern.test(email)) {
      iziToast.error({
        title: "Error",
        message: "Please enter a valid email address.",
        position: "topRight",
      });
      return;
    }

    iziToast.success({
      title: "Success",
      message: "Thank you for registering! We will contact you soon.",
      position: "topRight",
    });

    form.reset();
    closeModal();
  });
}
