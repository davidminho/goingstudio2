document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  const open = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (status) status.textContent = "Thanks — your inquiry is ready to send.";
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.body.classList.add("motion-ready");

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  const revealGroups = [
    [".section-head, .center-head, .page-hero .shell, .about-intro .shell", ""],
    [".value, .project-card, .value-card, .team-card, .model, .service-row, .faq-item", ""],
    [".story img, .contact-info", "reveal-left"],
    [".story-grid > div:last-child, .project-form", "reveal-right"],
    [".cta-copy, .compact-form, .testimonial blockquote, .footer-grid", ""],
  ];

  revealGroups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal");
      if (direction) element.classList.add(direction);
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 90}ms`);
    });
  });

  document.querySelectorAll(
    ".project-card, .team-card, .story > .shell, .location"
  ).forEach((element) => element.classList.add("image-reveal"));

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
  );

  document.querySelectorAll(".reveal, .image-reveal").forEach((element) => observer.observe(element));

  const hero = document.querySelector(".home-hero");
  let ticking = false;

  const updateScrollEffects = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progress.style.setProperty("--scroll-progress", `${percent}%`);

    if (hero && window.scrollY < hero.offsetHeight + 120) {
      const travel = Math.min(window.scrollY, hero.offsetHeight);
      hero.style.setProperty("--parallax-y", `${travel * 0.18}px`);
      hero.style.setProperty("--hero-y", `${travel * 0.07}px`);
    }
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    },
    { passive: true }
  );

  updateScrollEffects();
}
