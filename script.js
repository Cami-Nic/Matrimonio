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
        menuToggle.setAttribute("aria-label", "Chiudi menu");
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
        menuToggle.setAttribute("aria-label", "Apri menu");
    }

    document.body.style.overflow = "";
}


/* =====================================================
   CLICK HAMBURGER
===================================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", function() {

        if (
            sideMenu &&
            sideMenu.classList.contains("active")
        ) {

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

    menuClose.addEventListener(
        "click",
        closeMenu
    );

}


/* =====================================================
   CLICK OVERLAY
===================================================== */

if (menuOverlay) {

    menuOverlay.addEventListener(
        "click",
        closeMenu
    );

}


/* =====================================================
   CHIUDI MENU QUANDO SI CLICCA SU UN LINK
===================================================== */

const menuLinks =
    document.querySelectorAll(".side-menu a");


menuLinks.forEach(function(link) {

    link.addEventListener(
        "click",
        function() {

            closeMenu();

        }
    );

});


/* =====================================================
   ANIMAZIONI ALLO SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

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

const menuLines =
    document.querySelectorAll(
        ".menu-toggle span"
    );

const logo =
    document.querySelector(".logo");


/* =====================================================
   SEZIONI DEL SITO
===================================================== */

const darkSections =
    document.querySelectorAll(
        ".section-dark, .registry-preview, .section-blue"
    );

const lightSections =
    document.querySelectorAll(
        ".section-light"
    );


/* =====================================================
   SEZIONE INFORMAZIONI SULL'EVENTO
===================================================== */

const eventoSection =
    document.getElementById("evento");


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

            logo.classList.remove(
                "logo-dark"
            );

        } else {

            logo.classList.add(
                "logo-dark"
            );

        }

    }

}


/* =====================================================
   OSSERVATORE SEZIONI
===================================================== */

const sectionObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                const section =
                    entry.target;


                /* -----------------------------------------
                   SEZIONI SCURE / COLORATE
                ----------------------------------------- */

                if (
                    section.classList.contains(
                        "section-dark"
                    ) ||
                    section.classList.contains(
                        "registry-preview"
                    ) ||
                    section.classList.contains(
                        "section-blue"
                    )
                ) {

                    setHeaderColor("white");

                }


                /* -----------------------------------------
                   SEZIONI BIANCHE
                ----------------------------------------- */

                else if (
                    section.classList.contains(
                        "section-light"
                    )
                ) {

                    setHeaderColor("black");

                }

            });

        },

        {
            root: null,

            /*
               Osserviamo principalmente
               la parte superiore dello schermo.
            */

            rootMargin:
                "-10% 0px -80% 0px",

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
   HAMBURGER BIANCO NELLA SEZIONE EVENTO
===================================================== */

if (eventoSection) {

    const eventoMenuObserver =
        new IntersectionObserver(

            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        header.classList.add(
                            "header-white-menu"
                        );

                        menuLines.forEach(function(line) {

                            line.style.background =
                                "#ffffff";

                        });

                    } else {

                        header.classList.remove(
                            "header-white-menu"
                        );

                    }

                });

            },

            {
                threshold: 0.2
            }

        );

    eventoMenuObserver.observe(eventoSection);

}


/* =====================================================
   PARALLAX LEGGERO IMMAGINE HERO
===================================================== */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener(
    "scroll",
    function() {

        if (!heroImage) {
            return;
        }


        const scrollPosition =
            window.scrollY;


        if (
            scrollPosition <
            window.innerHeight
        ) {

            heroImage.style.transform =
                `scale(1.05) translateY(${scrollPosition * 0.12}px)`;

        }

    }
);


/* =====================================================
   VISIBILITÀ HEADER
   MOSTRA SOLO SU:
   
   1. HOME
   2. LISTA NOZZE
===================================================== */

const header =
    document.querySelector(".header");


/*
   HOME
*/

const homeSection =
    document.querySelector(".hero");


/*
   LISTA NOZZE

   Nel tuo HTML la sezione è:

   <section
       id="lista"
       class="section registry-preview section-dark">

   Per questo utilizziamo .registry-preview.
*/

const listaSection =
    document.querySelector(".registry-preview");


/* =====================================================
   AGGIORNA VISIBILITÀ HEADER
===================================================== */

function updateHeaderVisibility() {

    if (
        !header ||
        !homeSection ||
        !listaSection
    ) {
        return;
    }


    const homeRect =
        homeSection.getBoundingClientRect();

    const listaRect =
        listaSection.getBoundingClientRect();


    /* -----------------------------------------
       HOME
    ----------------------------------------- */

    const isOnHome =
        homeRect.top <= 100 &&
        homeRect.bottom > 100;


    /* -----------------------------------------
       LISTA NOZZE
    ----------------------------------------- */

    const isOnLista =
        listaRect.top <= 100 &&
        listaRect.bottom > 100;


    /* -----------------------------------------
       MOSTRA HEADER
    ----------------------------------------- */

    if (
        isOnHome ||
        isOnLista
    ) {

        header.classList.add(
            "header-visible"
        );

    }


    /* -----------------------------------------
       NASCONDI HEADER
    ----------------------------------------- */

    else {

        header.classList.remove(
            "header-visible"
        );

        /*
           Se il menu fosse rimasto aperto
           durante lo spostamento tra sezioni,
           lo chiudiamo.
        */

        if (
            sideMenu &&
            sideMenu.classList.contains("active")
        ) {

            closeMenu();

        }

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


/* =========================
   COUNTDOWN MATRIMONIO
========================== */

const weddingDate =
    new Date("April 2, 2027 12:30:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days").textContent =
        days;

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);
