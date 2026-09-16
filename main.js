(() => {
  const header = document.querySelector(".site-header");
  const reveals = document.querySelectorAll(".reveal");
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 28);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Hero content should appear immediately on load
  document.querySelectorAll(".hero .reveal").forEach((el) => {
    requestAnimationFrame(() => el.classList.add("is-visible"));
  });

  function handleContactSubmit(event) {
    if (event) event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (!name || !phone || !email) {
      note.textContent = "נא למלא שם, טלפון ואימייל.";
      note.classList.add("is-error");
      return false;
    }

    note.classList.remove("is-error");
    note.textContent = "תודה! הפנייה התקבלה — נחזור אליכם בהקדם.";
    form.reset();
    return false;
  }

  if (form && note) {
    form.addEventListener("submit", handleContactSubmit);
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        handleContactSubmit(event);
      });
    }
  }
})();
