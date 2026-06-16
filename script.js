const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const heroSnap = document.querySelector("[data-hero-snap]");
const bioSection = document.querySelector("#bio");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeNav = () => {
  document.body.classList.remove("nav-open");
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

let heroSnapLocked = false;

const snapToBio = () => {
  if (!heroSnap || !bioSection || heroSnapLocked) return;
  heroSnapLocked = true;
  bioSection.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    heroSnapLocked = false;
  }, 900);
};

window.addEventListener(
  "wheel",
  (event) => {
    if (!heroSnap || event.deltaY <= 8) return;
    const heroBottomTrigger = heroSnap.offsetTop + heroSnap.offsetHeight * 0.45;
    if (window.scrollY > heroBottomTrigger) return;
    event.preventDefault();
    snapToBio();
  },
  { passive: false }
);

let touchStartY = null;

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0]?.clientY ?? null;
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  (event) => {
    if (touchStartY === null || !heroSnap) return;
    const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
    const swipedDownPage = touchStartY - touchEndY > 28;
    const heroBottomTrigger = heroSnap.offsetTop + heroSnap.offsetHeight * 0.45;
    touchStartY = null;
    if (!swipedDownPage || window.scrollY > heroBottomTrigger) return;
    snapToBio();
  },
  { passive: true }
);

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealTargets = document.querySelectorAll(
  ".section-grid, .challenge-band, .research-card, .feature-strip, .person-card, .publication-list article, .timeline article, .contact-section"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((target) => revealObserver.observe(target));
