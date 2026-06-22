(function () {
  const areas = window.RESEARCH_CONTENT || [];
  const intro = window.RESEARCH_INTRO || {};

  const esc = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const inlineHtml = (value) => {
    if (!Array.isArray(value)) return esc(value);
    return value.map((segment) => {
      if (typeof segment === "string") return esc(segment);
      const text = esc(segment.text);
      const emphasized = segment.strong ? `<strong>${text}</strong>` : text;
      if (!segment.href) return emphasized;
      const isExternal = /^https?:\/\//.test(segment.href);
      const externalAttrs = isExternal ? ` target="_blank" rel="noreferrer"` : "";
      return `<a href="${esc(segment.href)}"${externalAttrs}>${emphasized}</a>`;
    }).join("");
  };

  const paragraphHtml = (items) => (items || []).map((text) => `<p>${inlineHtml(text)}</p>`).join("");

  const chipHtml = (items) => (items || []).map((item) => `<span><em>${esc(item)}</em></span>`).join("");

  const exampleHtml = (example) => `
    <article class="research-detail-card">
      <div class="research-detail-copy">
        <h4>${esc(example.title)}</h4>
        ${paragraphHtml(example.body)}
        ${example.bullets ? `<ul>${example.bullets.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>` : ""}
      </div>
      <button class="research-detail-image zoomable-image" type="button" data-zoom-src="${esc(example.image)}" data-zoom-alt="${esc(example.imageAlt || example.title)}" aria-label="Zoom image: ${esc(example.imageAlt || example.title)}">
        <img src="${esc(example.image)}" alt="${esc(example.imageAlt || example.title)}">
      </button>
    </article>
  `;

  const summaryMetaHtml = (area) => `
    <div class="research-compact-meta">
      <div>
        <span>Keywords</span>
        <p>${area.keywords.map((keyword) => `<em>${esc(keyword)}</em>`).join("; ")}</p>
      </div>
      <div>
        <span>Applications</span>
        <p>${esc(area.applications)}</p>
      </div>
    </div>
  `;

  const summaryCardHtml = (area, action = "button", index = 0) => {
    const content = `
      <div class="research-compact-body">
        <h3>${esc(area.title)}</h3>
        <p>${esc(area.summary)}</p>
      </div>
      <button class="research-compact-image zoomable-image" type="button" data-zoom-src="${esc(area.image)}" data-zoom-alt="${esc(area.imageAlt)}" aria-label="Zoom image: ${esc(area.imageAlt)}">
        <img src="${esc(area.image)}" alt="${esc(area.imageAlt)}">
      </button>
      ${summaryMetaHtml(area)}
    `;

    if (action === "link") {
      return `<a class="research-compact-card research-card" href="research.html#${esc(area.slug)}">${content}</a>`;
    }

    const expanded = action === "accordion" && index === 0;
    return `
      <article class="research-compact-card research-card">
        ${content}
        <button class="research-card-action" type="button" data-research-open="${esc(area.slug)}" aria-expanded="${expanded ? "true" : "false"}">
          ${action === "accordion" ? (index === 0 ? "Hide details" : "Learn more") : "Learn more"}
        </button>
      </article>
    `;
  };

  const fullAreaHtml = (area) => `
    <section class="research-full-area" id="${esc(area.slug)}">
      <div class="research-full-header">
        <h2>${esc(area.title)}</h2>
        ${paragraphHtml(area.description)}
        ${summaryMetaHtml(area)}
      </div>
      <div class="research-detail-grid">
        ${area.examples.map(exampleHtml).join("")}
      </div>
    </section>
  `;

  const renderAccordion = (root) => {
    root.innerHTML = `
      <div class="research-demo-intro">
        ${paragraphHtml(intro.body)}
      </div>
      <div class="research-accordion-list">
        ${areas.map((area, index) => `
          <section class="research-accordion-item ${index === 0 ? "is-open" : ""}" data-accordion-item>
            ${summaryCardHtml(area, "accordion", index)}
            <div class="research-accordion-panel" data-accordion-panel ${index === 0 ? "" : "hidden"}>
              <div class="research-panel-copy">
                ${paragraphHtml(area.description)}
              </div>
              <div class="research-chip-row">${chipHtml(area.keywords)}</div>
              <div class="research-detail-grid">
                ${area.examples.map(exampleHtml).join("")}
              </div>
            </div>
          </section>
        `).join("")}
      </div>
    `;

    root.querySelectorAll("[data-research-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest("[data-accordion-item]");
        const isOpen = item.classList.contains("is-open");
        root.querySelectorAll("[data-accordion-item]").forEach((other) => {
          other.classList.remove("is-open");
          other.querySelector("[data-accordion-panel]").hidden = true;
          const otherButton = other.querySelector("[data-research-open]");
          otherButton.textContent = "Learn more";
          otherButton.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          item.querySelector("[data-accordion-panel]").hidden = false;
          button.textContent = "Hide details";
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  };

  const renderSeparateSummary = (root) => {
    root.innerHTML = `
      <div class="research-demo-intro">
        ${paragraphHtml(intro.body)}
      </div>
      <div class="research-compact-grid">
        ${areas.map((area) => summaryCardHtml(area, "link")).join("")}
      </div>
      <div class="research-demo-actions">
        <a class="button primary" href="research.html">Open full research page</a>
        <a class="button secondary" href="${esc(intro.sourceUrl)}" target="_blank" rel="noreferrer">Original Rice page</a>
      </div>
    `;
  };

  const renderSeparatePage = (root) => {
    root.innerHTML = `
      <div class="research-page-layout">
        <aside class="research-page-index" aria-label="Research areas">
          <p class="section-kicker">Index</p>
          ${areas.map((area) => `<a href="#${esc(area.slug)}">${esc(area.shortTitle)}</a>`).join("")}
        </aside>
        <div class="research-page-body">
          <div class="research-demo-intro research-page-intro">
            ${paragraphHtml(intro.body)}
          </div>
          ${areas.map(fullAreaHtml).join("")}
        </div>
      </div>
    `;
  };

  const renderModal = (root) => {
    root.innerHTML = `
      <div class="research-demo-intro">
        ${paragraphHtml(intro.body)}
      </div>
      <div class="research-compact-grid modal-grid">
        ${areas.map((area) => summaryCardHtml(area, "modal")).join("")}
      </div>
      <div class="research-drawer" data-research-drawer aria-hidden="true">
        <button class="research-drawer-scrim" type="button" data-drawer-close aria-label="Close research details"></button>
        <aside class="research-drawer-panel" role="dialog" aria-modal="true" aria-label="Research details">
          <button class="research-drawer-close" type="button" data-drawer-close aria-label="Close">Close</button>
          <div data-drawer-content></div>
        </aside>
      </div>
      <div class="research-lightbox" data-research-lightbox aria-hidden="true">
        <button class="research-lightbox-scrim" type="button" data-lightbox-close aria-label="Close image preview"></button>
        <figure class="research-lightbox-panel">
          <button class="research-lightbox-close" type="button" data-lightbox-close aria-label="Close image preview">Close</button>
          <img src="${transparentPixel}" alt="">
          <figcaption></figcaption>
        </figure>
      </div>
    `;

    const drawer = root.querySelector("[data-research-drawer]");
    const drawerContent = root.querySelector("[data-drawer-content]");
    const lightbox = root.querySelector("[data-research-lightbox]");
    const lightboxImage = lightbox.querySelector("img");
    const lightboxCaption = lightbox.querySelector("figcaption");
    const openDrawer = (slug) => {
      const area = areas.find((item) => item.slug === slug);
      if (!area) return;
      drawerContent.innerHTML = fullAreaHtml(area);
      drawer.setAttribute("aria-hidden", "false");
      document.body.classList.add("research-drawer-open");
    };
    const closeDrawer = () => {
      drawer.setAttribute("aria-hidden", "true");
      document.body.classList.remove("research-drawer-open");
    };
    const openLightbox = (src, alt) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      lightboxCaption.textContent = alt;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("research-lightbox-open");
    };
    const closeLightbox = () => {
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("research-lightbox-open");
      lightboxImage.src = transparentPixel;
      lightboxImage.alt = "";
      lightboxCaption.textContent = "";
    };

    root.querySelectorAll("[data-research-open]").forEach((button) => {
      button.addEventListener("click", () => openDrawer(button.dataset.researchOpen));
    });
    root.querySelectorAll("[data-drawer-close]").forEach((button) => {
      button.addEventListener("click", closeDrawer);
    });
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (lightbox.getAttribute("aria-hidden") === "false") {
        closeLightbox();
      } else {
        closeDrawer();
      }
    });
    root.addEventListener("click", (event) => {
      const publicationLink = event.target.closest('a[href^="#j-"]');
      if (publicationLink && root.contains(publicationLink)) {
        closeLightbox();
        closeDrawer();
        return;
      }
      const zoomButton = event.target.closest("[data-zoom-src]");
      if (!zoomButton || !root.contains(zoomButton)) return;
      openLightbox(zoomButton.dataset.zoomSrc, zoomButton.dataset.zoomAlt);
    });
    root.querySelectorAll("[data-lightbox-close]").forEach((button) => {
      button.addEventListener("click", closeLightbox);
    });
  };

  document.querySelectorAll("[data-research-demo]").forEach((root) => {
    const mode = root.dataset.researchDemo;
    if (mode === "accordion") renderAccordion(root);
    if (mode === "separate-summary") renderSeparateSummary(root);
    if (mode === "separate-page") renderSeparatePage(root);
    if (mode === "modal") renderModal(root);
  });
}());
