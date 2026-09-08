/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const contactForm = document.querySelector(".contact-form");
const propertySearch = document.querySelector(".property-search");

const galleryImages = document.querySelectorAll(".gallery-item img");


/* =========================================
   SMART HEADER
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    const lightSections = document.querySelectorAll(
    ".intro, .about, .credentials, .buy-sell, .gallery, .services, .location, .contact"
);

const darkSections = document.querySelectorAll(
    ".hero, .stats, .search-section, .cta"
);

function updateHeaderColor() {
    const headerPosition = header.getBoundingClientRect().bottom;

    let overLightSection = false;

    lightSections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (
            headerPosition > rect.top &&
            headerPosition < rect.bottom
        ) {
            overLightSection = true;
        }
    });

    if (overLightSection) {
        header.classList.add("header-light");
    } else {
        header.classList.remove("header-light");
    }
}

window.addEventListener("scroll", updateHeaderColor);
window.addEventListener("resize", updateHeaderColor);

updateHeaderColor();

});


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   CLOSE MOBILE MENU
   WHEN A LINK IS CLICKED
========================================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   CONTACT FORM
========================================= */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const button = contactForm.querySelector("button");


    button.innerHTML = `
        <i class="fa-solid fa-check"></i>
        Message Sent!
    `;


    button.disabled = true;


    setTimeout(() => {

        contactForm.reset();


        button.innerHTML = `
            Send Message
            <i class="fa-solid fa-arrow-right"></i>
        `;


        button.disabled = false;

    }, 3000);

});


/* =========================================
   PROPERTY SEARCH
========================================= */

propertySearch.addEventListener("submit", (event) => {

    event.preventDefault();


    const searchButton =
        propertySearch.querySelector(".search-button");


    const originalContent =
        searchButton.innerHTML;


    searchButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Searching...
    `;


    searchButton.disabled = true;


    setTimeout(() => {

        searchButton.innerHTML = `
            <i class="fa-solid fa-house"></i>
            Contact Marci to View Listings
        `;


        setTimeout(() => {

            searchButton.innerHTML =
                originalContent;

            searchButton.disabled = false;

        }, 3000);

    }, 1200);

});



/* =========================================
   GALLERY LIGHTBOX
========================================= */


const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button
        class="lightbox-close"
        aria-label="Close image"
        type="button"
    >
        <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="lightbox-content">
        <img
            alt=""
        >
    </div>
`;

document.body.appendChild(lightbox);


const lightboxImage =
    lightbox.querySelector(".lightbox-content img");

const lightboxClose =
    lightbox.querySelector(".lightbox-close");


/* Open image */

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightboxImage.alt =
            image.alt || "Gallery image";

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* Close button */

lightboxClose.addEventListener("click", closeLightbox);


/* Close when clicking outside the image */

lightbox.addEventListener("click", event => {

    if (
        event.target === lightbox ||
        event.target.classList.contains("lightbox-content")
    ) {

        closeLightbox();

    }

});


/* Close with Escape */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* Close function */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    /*
       Remove the source after closing.
       This prevents the browser from trying
       to display the image when the lightbox
       isn't being used.
    */

    setTimeout(() => {

        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";

    }, 300);

}




/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(

        ".intro-grid, " +
        ".stat-item, " +
        ".about-grid, " +
        ".service-card, " +
        ".gallery-item, " +
        ".service, " +
        ".contact-grid"

    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

/* =========================================
   PAGE LOADER & IMAGE FALLBACKS
========================================= */

const pageLoader = document.querySelector(".page-loader");

/* Hide loader when page is ready */
window.addEventListener("load", () => {
    setTimeout(() => {
        pageLoader.classList.add("loaded");
    }, 300);
});


/* Image loading */
const pageImages = document.querySelectorAll("img");

pageImages.forEach(image => {

    if (image.complete && image.naturalWidth > 0) {
        image.classList.add("image-loaded");
    } else {
        image.addEventListener("load", () => {
            image.classList.add("image-loaded");
        });
    }

    image.addEventListener("error", () => {
        image.classList.add("image-failed");
        image.alt = "Image unavailable";
    });

});

});

