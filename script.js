/*=========================================
            LOADING SCREEN
=========================================*/

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(function () {

        loader.style.opacity = "0";

        setTimeout(function () {

            loader.style.display = "none";

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
        NAVIGATION SCROLL
=========================================*/

const nav = document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        nav.classList.add("scrolled");

    }else{

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
const spinner = document.querySelector(".loading-spinner");
const galleryImages = document.querySelectorAll(".gallery-grid img");

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

const closeModal = document.querySelector(".close-modal");
const prevBtn = document.querySelector(".prev-image");
const nextBtn = document.querySelector(".next-image");

let currentImage = 0;

function openModal(index){

    currentImage = index;

    const clickedImage = galleryImages[currentImage];

    const rect = clickedImage.getBoundingClientRect();

   if (spinner) {

    spinner.style.display = "block";

}

modalImage.style.opacity = "0";

modalImage.src=clickedImage.src;

modalImage.onload=()=>{

    if (spinner) {

    spinner.style.display = "none";

}

    modalImage.style.opacity="1";

}

    imageModal.classList.add("active");
    document.body.classList.add("modal-open");

    /* Start from clicked image position */

    modalImage.style.transition = "none";

    modalImage.style.left = rect.left + "px";
    modalImage.style.top = rect.top + "px";

    modalImage.style.width = rect.width + "px";
    modalImage.style.height = rect.height + "px";

    modalImage.style.transform = "none";

    requestAnimationFrame(()=>{

        modalImage.style.transition = "all .45s ease";

        modalImage.style.left = "50%";
        modalImage.style.top = "50%";

        modalImage.style.width = "80%";
        modalImage.style.height = "auto";

        modalImage.style.transform = "translate(-50%,-50%)";

    });

}

function closeLightbox(){

    const clickedImage = galleryImages[currentImage];

    const rect = clickedImage.getBoundingClientRect();

    modalImage.style.left = rect.left + "px";
    modalImage.style.top = rect.top + "px";

    modalImage.style.width = rect.width + "px";
    modalImage.style.height = rect.height + "px";

    modalImage.style.transform = "none";

    setTimeout(()=>{

        imageModal.classList.remove("active");
        document.body.classList.remove("modal-open");

    },400);

}

galleryImages.forEach((image,index)=>{

    image.addEventListener("click",()=>{

        openModal(index);

    });

});

if (nextBtn) {

    nextBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        currentImage++;

        if(currentImage>=galleryImages.length){

            currentImage=0;

        }

        modalImage.src=galleryImages[currentImage].src;

    });

}

if (prevBtn) {
    prevBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    currentImage--;

    if(currentImage<0){

        currentImage=galleryImages.length-1;

    }

    modalImage.src = galleryImages[currentImage].src;

});
}
if (closeModal) {

    closeModal.addEventListener("click", closeLightbox);

}

if (imageModal) {

    imageModal.addEventListener("click", (e) => {

        if (e.target === imageModal) {

            closeLightbox();

        }

    });

}

document.addEventListener("keydown", (e) => {

    if (!imageModal) return;

    if (!imageModal.classList.contains("active")) return;

    if (e.key === "Escape") {

        closeLightbox();

    }

    if (e.key === "ArrowRight" && nextBtn) {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft" && prevBtn) {

        prevBtn.click();

    }

});

if (modalImage) {

    let touchStartX = 0;

    modalImage.addEventListener("touchstart", (e) => {

        touchStartX = e.touches[0].clientX;

    });

    modalImage.addEventListener("touchend", (e) => {

        const touchEndX = e.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 50) {

            if (nextBtn) nextBtn.click();

        }

        if (touchEndX - touchStartX > 50) {

            if (prevBtn) prevBtn.click();

        }

    });

}
/*=========================================
        MOBILE MENU
=========================================*/

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle && navLinks){

    menuToggle.addEventListener("click",()=>{
        const navItems = document.querySelectorAll("#navLinks a");

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        menuToggle.innerHTML="☰";

    });

});

        navLinks.classList.toggle("active");

        if(navLinks.classList.contains("active")){

            menuToggle.textContent="✕";
menuToggle.style.transform="rotate(180deg)";

        }else{

            menuToggle.textContent="☰";
menuToggle.style.transform="rotate(0deg)";

        }

    });

}
/*=========================================
        EMAILJS CONTACT FORM
=========================================*/

// Initialize EmailJS
emailjs.init({
    publicKey: "TGmjQ2I7YWrcF5Sh4",
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "mrchai_service",
            "template_l2ki7jp",
            this
        )

        .then(function () {

            alert("✅ Thank you! Your message has been sent successfully.");

            contactForm.reset();

        })

        .catch(function (error) {

            console.error(error);

            alert("❌ Failed to send message. Please try again.");

        });

    });

}