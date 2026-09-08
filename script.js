
/* =====================================================
   MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


/* =====================================================
   APERTURA MENU
===================================================== */

function openMenu() {

    if (sideMenu) {
        sideMenu.classList.add("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

    if (menuToggle) {
        menuToggle.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CHIUSURA MENU
===================================================== */

function closeMenu() {

    if (sideMenu) {
        sideMenu.classList.remove("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

    if (menuToggle) {
        menuToggle.classList.remove("active");
    }

    document.body.style.overflow = "";
}


/* =====================================================
   CLICK HAMBURGER
===================================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", function() {

        if (sideMenu && sideMenu.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });

}


/* =====================================================
   CLICK CHIUDI
===================================================== */

if (menuClose) {

    menuClose.addEventListener("click", closeMenu);

}


/* =====================================================
   CLICK OVERLAY
===================================================== */

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
   COLORE HAMBURGER E LOGO
===================================================== */

const menuLines = document.querySelectorAll(".menu-toggle span");
const logo = document.querySelector(".logo");


/* =====================================================
   SEZIONI DEL SITO
===================================================== */

const darkSections = document.querySelectorAll(
    ".section-dark, .registry-preview, .section-blue"
);

const lightSections = document.querySelectorAll(
    ".section-light"
);


/* =====================================================
   CAMBIO COLORE HEADER
===================================================== */

function setHeaderColor(color) {

    /* -------------------------------------------------
       MENU
    ------------------------------------------------- */

    menuLines.forEach(function(line) {

        line.style.background = color;

    });


    /* -------------------------------------------------
       LOGO
    ------------------------------------------------- */

    if (logo) {

        if (color === "white") {

            logo.classList.remove("logo-dark");

        } else {

            logo.classList.add("logo-dark");

        }

    }

}


/* =====================================================
   OSSERVATORE SEZIONI
===================================================== */

const sectionObserver = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (!entry.isIntersecting) {
                return;
            }


            const section = entry.target;


            /* -----------------------------------------
               SEZIONI SCURE / COLORATE
            ----------------------------------------- */

            if (
                section.classList.contains("section-dark") ||
                section.classList.contains("registry-preview") ||
                section.classList.contains("section-blue")
            ) {

                setHeaderColor("white");

            }


            /* -----------------------------------------
               SEZIONI BIANCHE
            ----------------------------------------- */

            else if (
                section.classList.contains("section-light")
            ) {

                setHeaderColor("black");

            }

        });

    },

    {
        root: null,

        /*
           Osserviamo principalmente la parte
           superiore dello schermo.
        */

        rootMargin: "-10% 0px -80% 0px",

        threshold: 0
    }

);


/* =====================================================
   AVVIO OSSERVAZIONE
===================================================== */

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

    if (!heroImage) {
        return;
    }


    const scrollPosition = window.scrollY;


    if (scrollPosition < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.05) translateY(${scrollPosition * 0.12}px)`;

    }

});


/* =====================================================
   HEADER VISIBILE SOLO SU:
   
   1. HOME
   2. LISTA NOZZE
===================================================== */

const header = document.querySelector(".header");


/*
   La Home nel tuo sito è rappresentata
   dalla sezione .hero.
*/

const homeSection = document.querySelector(".hero");


/*
   La Lista Nozze è rappresentata
   dalla sezione .registry-section.
*/

const listaSection = document.querySelector(".registry-section");


function updateHeaderVisibility() {

    /*
       Se gli elementi non esistono,
       non facciamo nulla.
    */

    if (!header || !homeSection || !listaSection) {
        return;
    }


    const homeRect =
        homeSection.getBoundingClientRect();

    const listaRect =
        listaSection.getBoundingClientRect();


    /*
       HOME
    */

    const isOnHome =
        homeRect.top <= 100 &&
        homeRect.bottom > 100;


    /*
       LISTA NOZZE
    */

    const isOnLista =
        listaRect.top <= 100 &&
        listaRect.bottom > 100;


    /*
       HEADER VISIBILE
    */

    if (isOnHome || isOnLista) {

        header.classList.remove("header-hidden");

    }


    /*
       HEADER NASCOSTO
    */

    else {

        header.classList.add("header-hidden");

    }

}


/* =====================================================
   CONTROLLO HEADER DURANTE LO SCROLL
===================================================== */

window.addEventListener(
    "scroll",
    updateHeaderVisibility
);


/* =====================================================
   CONTROLLO INIZIALE
===================================================== */

updateHeaderVisibility();
