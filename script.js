document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

const selectComponents = document.querySelectorAll("[data-select]");

const closeAllSelects = (currentSelect) => {
  selectComponents.forEach((select) => {
    if (select !== currentSelect) {
      select.classList.remove("is-open");
      select.querySelector(".custom-select__trigger")?.setAttribute("aria-expanded", "false");
    }
  });
};

selectComponents.forEach((select) => {
  const trigger = select.querySelector(".custom-select__trigger");
  const hiddenInput = select.querySelector('input[type="hidden"]');
  const label = select.querySelector(".custom-select__text");
  const options = select.querySelectorAll(".custom-select__option");

  if (!trigger || !hiddenInput || !label || !options.length) {
    return;
  }

  options.forEach((option) => {
    option.setAttribute("aria-selected", "false");
  });

  trigger.addEventListener("click", () => {
    const isOpen = select.classList.contains("is-open");
    closeAllSelects(select);
    select.classList.toggle("is-open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-selected", "false");
      });

      option.classList.add("is-selected");
      option.setAttribute("aria-selected", "true");
      hiddenInput.value = option.dataset.value || option.textContent.trim();
      label.textContent = option.textContent.trim();
      select.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-select]")) {
    closeAllSelects(null);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllSelects(null);
  }
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) {
      return;
    }

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
