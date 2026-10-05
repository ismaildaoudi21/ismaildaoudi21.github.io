(() => {
  "use strict";

  const links = window.THABBIT_APP_LINKS || {};

  const activateExternalLinks = (selector, url) => {
    if (!url) return;

    document.querySelectorAll(selector).forEach((link) => {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer external";
    });
  };

  activateExternalLinks('[data-store="android"]', links.googlePlay);
  activateExternalLinks("[data-support]", links.support);

  const appleLinks = document.querySelectorAll('[data-store="apple"]');
  if (links.appStore) {
    appleLinks.forEach((link) => {
      link.href = links.appStore;
      link.target = "_blank";
      link.rel = "noopener noreferrer external";
      link.classList.remove("is-disabled");
      link.removeAttribute("aria-disabled");
      const small = link.querySelector("small");
      if (small) small.textContent = "نزّله من";
    });
  } else {
    appleLinks.forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });
  }

  const imageViewer = document.getElementById("image-viewer");
  const imageViewerImage = document.getElementById("image-viewer-image");
  const imageViewerCaption = document.getElementById("image-viewer-caption");
  const imageViewerClose = document.querySelector(".image-viewer-close");

  if (imageViewer && imageViewerImage && imageViewerCaption) {
    document.querySelectorAll("[data-lightbox]").forEach((button) => {
      button.addEventListener("click", () => {
        const source = button.dataset.lightbox;
        const caption = button.dataset.caption || "صورة من تطبيق ثَبِّتْ";
        if (!source) return;

        imageViewerImage.src = source;
        imageViewerImage.alt = caption;
        imageViewerCaption.textContent = caption;
        imageViewer.showModal();
      });
    });

    imageViewerClose?.addEventListener("click", () => imageViewer.close());
    imageViewer.addEventListener("click", (event) => {
      if (event.target === imageViewer) imageViewer.close();
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
