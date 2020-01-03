function Gallery(gallery) {
  if (!gallery) {
    throw new Error("No Gallery Found!");
  }
  // select the elements we need
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    console.info("Opening Modal...");
    // First check if the modal is already open
    if (modal.matches(".open")) {
      console.info("Madal already open");
      return; // stop the function from running
    }
    modal.classList.add("open");

    // Event listeners to be bound when we open the modal:
    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  }

  function closeModal() {
    modal.classList.remove("open");
    // TODO: add event listeners for clicks and keyboard..
    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.removeEventListener("click", showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === "Escape") return closeModal();
    if (event.key === "ArrowRight") return showNextImage();
    if (event.key === "ArrowLeft") return showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info("no image to show");
      return;
    }
    // update the modal with this info
    console.log(el);
    modal.querySelector("img").src = el.src;
    currentImage = el;
    openModal();
  }

  // These are our Event Listeners!
  images.forEach(image =>
    image.addEventListener("click", e => showImage(e.currentTarget))
  );

  // loop over each image
  images.forEach(image => {
    // attach an event listener for each image
    image.addEventListener("keyup", e => {
      // when that is keyup'd, check if it was enter
      if (e.key === "Enter") {
        // if it was, show that image
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener("click", handleClickOutside);

  // slider
  const gap = 16;

  const carousel = gallery.parentElement;
  const next = carousel.parentElement.querySelector(".carousel-nav-next");
  const prev = carousel.parentElement.querySelector(".carousel-nav-prev");

  next.addEventListener("click", e => {
    carousel.scrollBy(width + gap, 0);
    if (carousel.scrollWidth !== 0) {
      prev.style.display = "flex";
    }
    if (gallery.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "none";
    }
  });
  prev.addEventListener("click", e => {
    carousel.scrollBy(-(width + gap), 0);
    if (carousel.scrollLeft - width - gap <= 0) {
      prev.style.display = "none";
    }
    if (!gallery.scrollWidth - width - gap <= carousel.scrollLeft + width) {
      next.style.display = "flex";
    }
  });

  let width = carousel.offsetWidth;
  window.addEventListener("resize", e => (width = carousel.offsetWidth));
}

const galleries = Array.from(document.querySelectorAll(".gallery"));
galleries.forEach(singleGallery => Gallery(singleGallery));
