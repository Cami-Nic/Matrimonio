/* =====================================================
   MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


function openMenu() {

    sideMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    sideMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}


if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
}


if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
}


/* =====================================================
   CHIUDI MENU QUANDO SI CLICCA SU UN LINK
===================================================== */

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeMenu();

    });

});


/* =====================================================
   ANIMAZIONI ALLO SCROLL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(function(element) {

    observer.observe(element);

});


/* =====================================================
   COLORE HAMBURGER AUTOMATICO
===================================================== */
const menuLines = document.querySelectorAll(".menu-toggle span");
const logo = document.querySelector(".logo");


// ========================================
// SEZIONI DEL SITO
// ========================================

const darkSections = document.querySelectorAll(
    ".section-dark, .registry-preview, .section-blue"
);

const lightSections = document.querySelectorAll(
    ".section-light"
);


// ========================================
// CAMBIO COLORE HEADER
// ========================================

function setHeaderColor(color) {

    // MENU
    menuLines.forEach(function(line) {
        line.style.background = color;
    });


    // LOGO
    if (logo) {

        if (color === "white") {
            logo.classList.remove("logo-dark");
        } else {
            logo.classList.add("logo-dark");
        }

    }

}


// ========================================
// INTERSECTION OBSERVER
// ========================================

const sectionObserver = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (!entry.isIntersecting) {
                return;
            }


            const section = entry.target;


            // --------------------------------
            // SEZIONI COLORATE / SCURE
            // --------------------------------

            if (
                section.classList.contains("section-dark") ||
                section.classList.contains("registry-preview") ||
                section.classList.contains("section-blue")
            ) {

                setHeaderColor("white");

            }


            // --------------------------------
            // SEZIONI BIANCHE
            // --------------------------------

            else if (
                section.classList.contains("section-light")
            ) {

                setHeaderColor("black");

            }

        });

    },

    {
        root: null,

        // La zona osservata è concentrata
        // nella parte superiore dello schermo,
        // dove si trova il logo/menu.
        rootMargin: "-10% 0px -80% 0px",

        threshold: 0
    }

);


// ========================================
// AVVIO OSSERVAZIONE
// ========================================

darkSections.forEach(function(section) {

    sectionObserver.observe(section);

});


lightSections.forEach(function(section) {

    sectionObserver.observe(section);

});

/* =====================================================
   PARALLAX LEGGERO IMMAGINE HERO
===================================================== */

const heroImage = document.querySelector(".hero-image");


window.addEventListener("scroll", function() {

    if (!heroImage) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.05) translateY(${scrollPosition * 0.12}px)`;

    }

});
