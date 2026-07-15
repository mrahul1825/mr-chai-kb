/*=========================================
            LOADING SCREEN
=========================================*/

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(function () {

            document.getElementById("loader").style.display = "none";

        }, 1000);

    }, 2000);

});

/*=========================================
        BACK TO TOP BUTTON
=========================================*/

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";

        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================
        NAVIGATION SHADOW
=========================================*/

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");

    }

});

/*=========================================
        FADE IN ANIMATION
=========================================*/

const fadeElements = document.querySelectorAll(".fade-in");

if (fadeElements.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    });

    fadeElements.forEach(element => {

        observer.observe(element);

    });

}

/*=========================================
        PROFESSIONAL LIGHTBOX
=========================================*/

const galleryImages = document.querySelectorAll(".gallery-grid img");

const imageModal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const closeModal = document.querySelector(".close-modal");

const prevBtn = document.querySelector(".prev-image");

const nextBtn = document.querySelector(".next-image");

let currentImage = 0;

function openModal(index) {

    currentImage = index;

    modalImage.src = galleryImages[currentImage].src;

    imageModal.style.display = "flex";

    document.body.classList.add("modal-open");

}

function closeLightbox() {

    imageModal.style.display = "none";

    document.body.classList.remove("modal-open");

}

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        openModal(index);

    });

});

nextBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage++;

    if (currentImage >= galleryImages.length) {

        currentImage = 0;

    }

    modalImage.src = galleryImages[currentImage].src;

});

prevBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    currentImage--;

    if (currentImage < 0) {

        currentImage = galleryImages.length - 1;

    }

    modalImage.src = galleryImages[currentImage].src;

});

closeModal.addEventListener("click", closeLightbox);

imageModal.addEventListener("click", (e) => {

    if (e.target === imageModal) {

        closeLightbox();

    }

});

document.addEventListener("keydown", (e) => {

    if (imageModal.style.display === "flex") {

        if (e.key === "Escape") {

            closeLightbox();

        }

        if (e.key === "ArrowRight") {

            nextBtn.click();

        }

        if (e.key === "ArrowLeft") {

            prevBtn.click();

        }

    }

});