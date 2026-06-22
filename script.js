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

const publicationViews = window.PUBLICATION_VIEWS || {};
const publicationList = document.querySelector("[data-publication-list]");
const publicationTabs = document.querySelector("[data-publication-tabs]");
const publicationButtons = [...document.querySelectorAll("[data-publication-tab]")];
const publicationUnderline = document.querySelector("[data-publication-underline]");

const escapeHtml = (value) => String(value || "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const publicationCardHtml = (item) => {
  const title = escapeHtml(item.title);
  const idHtml = item.id ? ` id="${escapeHtml(item.id)}"` : "";
  const titleHtml = item.href
    ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${title}</a>`
    : title;
  const venueHtml = item.venue ? `<span class="publication-venue">${escapeHtml(item.venue)}</span>` : "";
  const metaHtml = [item.date, item.location].filter(Boolean).map(escapeHtml).join(", ");
  const conferenceMetaHtml = metaHtml ? `<span class="publication-meta">, ${metaHtml}</span>` : "";
  const awardHtml = item.award ? `, <strong class="publication-award">${escapeHtml(item.award)}</strong>` : "";
  const sourceHtml = venueHtml ? `${venueHtml}${conferenceMetaHtml}${awardHtml}` : "";
  return `
    <article class="publication-card"${idHtml}>
      <div class="publication-index">${escapeHtml(item.year)}</div>
      <div class="publication-type">${escapeHtml(item.type)}</div>
      <div class="publication-body">
        <h3>${titleHtml}</h3>
        ${item.authors ? `<p class="authors">${escapeHtml(item.authors)}</p>` : ""}
        ${sourceHtml ? `<p class="publisher">${sourceHtml}</p>` : ""}
      </div>
    </article>
  `;
};

const renderPublications = (viewName = "publications") => {
  if (!publicationList) return;
  const items = publicationViews[viewName] || publicationViews.publications || [];
  publicationList.innerHTML = items.length
    ? items.map(publicationCardHtml).join("")
    : `<p class="publication-empty">No dataset items are listed on the source publications page yet.</p>`;
  publicationList.scrollTop = 0;
};

const movePublicationUnderline = (button) => {
  if (!publicationTabs || !publicationUnderline || !button) return;
  publicationUnderline.style.width = `${button.offsetWidth}px`;
  publicationUnderline.style.transform = `translateX(${button.offsetLeft}px)`;
};

const setPublicationView = (viewName) => {
  const activeButton = publicationButtons.find((button) => button.dataset.publicationTab === viewName) || publicationButtons[0];
  publicationButtons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  renderPublications(activeButton?.dataset.publicationTab || "latest");
  movePublicationUnderline(activeButton);
};

const getPublicationViewForId = (id) => {
  const viewOrder = ["publications", "conferences"];
  return viewOrder.find((viewName) => (publicationViews[viewName] || []).some((item) => item.id === id));
};

const focusPublicationTarget = (id) => {
  if (!id) return false;
  const targetView = getPublicationViewForId(id);
  if (!targetView) return false;
  setPublicationView(targetView);
  window.requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("is-targeted");
    window.setTimeout(() => target.classList.remove("is-targeted"), 1800);
  });
  return true;
};

if (publicationTabs && publicationList && publicationButtons.length) {
  publicationButtons.forEach((button, index) => {
    button.addEventListener("click", () => setPublicationView(button.dataset.publicationTab));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextButton = publicationButtons[(index + direction + publicationButtons.length) % publicationButtons.length];
      nextButton.focus();
      setPublicationView(nextButton.dataset.publicationTab);
    });
  });
  setPublicationView("publications");
  window.addEventListener("resize", () => {
    const activeButton = publicationButtons.find((button) => button.classList.contains("is-active"));
    movePublicationUnderline(activeButton);
  });
  window.addEventListener("hashchange", () => focusPublicationTarget(window.location.hash.slice(1)));
  focusPublicationTarget(window.location.hash.slice(1));
}

document.addEventListener("click", (event) => {
  const publicationLink = event.target.closest('a[href^="#j-"]');
  if (!publicationLink) return;
  window.setTimeout(() => focusPublicationTarget(publicationLink.getAttribute("href").slice(1)), 0);
});

const newsContent = window.NEWS_CONTENT || [];
const newsAtlas = document.querySelector("[data-news-atlas]");
const newsArchive = document.querySelector("[data-news-archive]");

const richTextHtml = (value) => {
  if (!Array.isArray(value)) return escapeHtml(value);
  return value.map((segment) => {
    if (typeof segment === "string") return escapeHtml(segment);
    const text = segment.strong ? `<strong>${escapeHtml(segment.text)}</strong>` : escapeHtml(segment.text);
    if (!segment.href) return text;
    return `<a href="${escapeHtml(segment.href)}" target="_blank" rel="noreferrer">${text}</a>`;
  }).join("");
};

const newsImageButtonHtml = (image, className) => `
  <button class="${className}" type="button" data-site-zoom-src="${escapeHtml(image.src)}" data-site-zoom-alt="${escapeHtml(image.caption || image.alt)}" aria-label="Zoom image: ${escapeHtml(image.caption || image.alt)}">
    <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}">
    <span>${escapeHtml(image.caption || image.alt)}</span>
  </button>
`;

const newsId = (item) => `news-${item.year}-${item.dateLabel.replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "").toLowerCase()}`;

const renderNewsAtlas = () => {
  if (!newsAtlas || !newsContent.length) return;
  const images = newsContent.flatMap((item) => (item.images || []).map((image) => ({ image, targetId: newsId(item) }))).slice(0, 6);
  newsAtlas.innerHTML = images.map(({ image, targetId }, index) => `
    <a class="news-atlas-tile ${index === 0 ? "is-lead" : ""}" href="#${targetId}" aria-label="Read the ${escapeHtml(image.alt)} news update">
      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}">
    </a>
  `).join("");
};

const renderNewsArchive = () => {
  if (!newsArchive || !newsContent.length) return;
  const years = [...new Set(newsContent.map((item) => item.year))];
  newsArchive.innerHTML = years.map((year) => {
    const rows = newsContent.filter((item) => item.year === year).map((item) => {
      const detailItems = item.details
        ? `<div class="news-details">
            ${item.detailsTitle ? `<span>${escapeHtml(item.detailsTitle)}</span>` : ""}
            <ul>${item.details.map((detail) => `<li>${richTextHtml(detail)}</li>`).join("")}</ul>
          </div>`
        : "";
      const images = item.images?.length
        ? `<div class="news-thumbs">${item.images.map((image) => newsImageButtonHtml(image, "news-thumb")).join("")}</div>`
        : "";
      return `
        <article class="news-row" id="${newsId(item)}">
          <time>${escapeHtml(item.dateLabel)}</time>
          <div class="news-row-body">
            <p>${richTextHtml(item.summary)}</p>
            ${detailItems}
            ${images}
          </div>
        </article>
      `;
    }).join("");
    return `
      <details class="news-year-group" ${year === years[0] ? "open" : ""}>
        <summary><span>${escapeHtml(year)}</span><span class="news-year-toggle" aria-hidden="true"></span></summary>
        <div class="news-year-rows">${rows}</div>
      </details>
    `;
  }).join("");
};

renderNewsAtlas();
renderNewsArchive();

newsAtlas?.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#news-']");
  if (!link) return;
  const target = document.querySelector(link.getAttribute("href"));
  target?.closest("details")?.setAttribute("open", "");
});
const siteLightbox = document.querySelector("[data-site-lightbox]");
const siteTransparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

if (siteLightbox) {
  const siteLightboxImage = siteLightbox.querySelector("img");
  const siteLightboxCaption = siteLightbox.querySelector("figcaption");

  const openSiteLightbox = (src, alt) => {
    siteLightboxImage.src = src;
    siteLightboxImage.alt = alt;
    siteLightboxCaption.textContent = alt;
    siteLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("site-lightbox-open");
  };

  const closeSiteLightbox = () => {
    siteLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("site-lightbox-open");
    siteLightboxImage.src = siteTransparentPixel;
    siteLightboxImage.alt = "";
    siteLightboxCaption.textContent = "";
  };

  document.addEventListener("click", (event) => {
    const zoomButton = event.target.closest("[data-site-zoom-src]");
    if (!zoomButton) return;
    openSiteLightbox(zoomButton.dataset.siteZoomSrc, zoomButton.dataset.siteZoomAlt);
  });

  siteLightbox.querySelectorAll("[data-site-lightbox-close]").forEach((button) => {
    button.addEventListener("click", closeSiteLightbox);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteLightbox.getAttribute("aria-hidden") === "false") {
      closeSiteLightbox();
    }
  });
}

document.querySelectorAll("[data-teaching-carousel]").forEach((carousel) => {
  const gallery = carousel.querySelector("[data-teaching-gallery]");
  const previousButton = carousel.querySelector("[data-teaching-carousel-prev]");
  const nextButton = carousel.querySelector("[data-teaching-carousel-next]");
  const items = [...gallery.querySelectorAll("figure")];
  let currentIndex = 0;
  let autoplayId = null;

  const getGap = () => Number.parseFloat(window.getComputedStyle(gallery).columnGap) || 0;

  const getVisibleCount = () => {
    const firstItem = items[0];
    if (!firstItem) return 1;
    const itemWidth = firstItem.getBoundingClientRect().width + getGap();
    return Math.max(1, Math.round((gallery.clientWidth + getGap()) / itemWidth));
  };

  const getMaxIndex = () => Math.max(0, items.length - getVisibleCount());

  const scrollToIndex = (index) => {
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(Math.max(index, 0), maxIndex);
    const target = items[currentIndex];
    if (!target) return;
    gallery.scrollTo({
      left: target.offsetLeft - gallery.offsetLeft,
      behavior: "smooth"
    });
  };

  const showNext = () => {
    const maxIndex = getMaxIndex();
    scrollToIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const showPrevious = () => {
    const maxIndex = getMaxIndex();
    scrollToIndex(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  };

  const restartAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(showNext, 4200);
  };

  previousButton.addEventListener("click", () => {
    showPrevious();
    restartAutoplay();
  });

  nextButton.addEventListener("click", () => {
    showNext();
    restartAutoplay();
  });

  carousel.addEventListener("mouseenter", () => window.clearInterval(autoplayId));
  carousel.addEventListener("mouseleave", restartAutoplay);
  carousel.addEventListener("focusin", () => window.clearInterval(autoplayId));
  carousel.addEventListener("focusout", restartAutoplay);

  window.addEventListener("resize", () => scrollToIndex(currentIndex));
  scrollToIndex(0);
  restartAutoplay();
});
