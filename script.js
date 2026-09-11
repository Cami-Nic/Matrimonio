/* =====================================================
   MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const header = document.querySelector(".header");


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

   1. HERO
   2. LISTA NOZZE
===================================================== */

const homeSection =
    document.querySelector(".hero");

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


    /* =================================================
       HERO
    ================================================= */

    const isOnHome =
        homeRect.top <= 100 &&
        homeRect.bottom > 100;


    /* =================================================
       LISTA NOZZE
    ================================================= */

    const isOnLista =
        listaRect.top <= 100 &&
        listaRect.bottom > 100;


    /* =================================================
       MOSTRA HEADER
    ================================================= */

    if (
        isOnHome ||
        isOnLista
    ) {

        header.classList.add(
            "header-visible"
        );

    }


    /* =================================================
       NASCONDI HEADER
    ================================================= */

    else {

        header.classList.remove(
            "header-visible"
        );


        if (
            sideMenu &&
            sideMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    }

}


/* =====================================================
   CONTROLLO DURANTE LO SCROLL
===================================================== */

window.addEventListener(
    "scroll",
    updateHeaderVisibility,
    {
        passive: true
    }
);


/* =====================================================
   CONTROLLO AL RIDIMENSIONAMENTO
===================================================== */

window.addEventListener(
    "resize",
    updateHeaderVisibility
);


/* =====================================================
   CONTROLLO INIZIALE
===================================================== */

updateHeaderVisibility();


/* =====================================================
   =====================================================
   FUOCHI D'ARTIFICIO
   SPETTACOLO INFINITO
   =====================================================
===================================================== */

const hero =
    document.querySelector(".hero");


let fireworksStarted = false;

let fireworksCanvas = null;

let fireworksContext = null;

let fireworksAnimation = null;


/* =====================================================
   COLORI ELEGANTI DA MATRIMONIO
===================================================== */

const weddingColors = [

    "rgba(255,255,255,",

    "rgba(255,248,230,",

    "rgba(250,220,200,",

    "rgba(243,201,208,",

    "rgba(255,231,190,"

];


/* =====================================================
   PARTICELLE E RAZZI
===================================================== */

let fireworksParticles = [];

let fireworksRockets = [];


/* =====================================================
   CREAZIONE CANVAS
===================================================== */

function createFireworksCanvas() {

    if (
        !hero ||
        fireworksCanvas
    ) {

        return;

    }


    fireworksCanvas =
        document.createElement("canvas");


    fireworksCanvas.className =
        "wedding-fireworks";


    fireworksCanvas.style.position =
        "absolute";


    fireworksCanvas.style.inset =
        "0";


    fireworksCanvas.style.width =
        "100%";


    fireworksCanvas.style.height =
        "100%";


    /*
       Il canvas sta sopra la foto
       e sotto il testo della Hero.
    */

    fireworksCanvas.style.zIndex =
        "3";


    fireworksCanvas.style.pointerEvents =
        "none";


    fireworksCanvas.style.opacity =
        "0";


    fireworksCanvas.style.transition =
        "opacity 1s ease";


    hero.appendChild(
        fireworksCanvas
    );


    fireworksContext =
        fireworksCanvas.getContext("2d");


    resizeFireworksCanvas();


    window.addEventListener(
        "resize",
        resizeFireworksCanvas
    );

}


/* =====================================================
   DIMENSIONI CANVAS
===================================================== */

function resizeFireworksCanvas() {

    if (
        !fireworksCanvas ||
        !fireworksContext ||
        !hero
    ) {

        return;

    }


    const rect =
        hero.getBoundingClientRect();


    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    fireworksCanvas.width =
        rect.width * dpr;


    fireworksCanvas.height =
        rect.height * dpr;


    fireworksContext.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


/* =====================================================
   CREAZIONE RAZZO
===================================================== */

function createRocket() {

    if (
        !fireworksCanvas ||
        !hero
    ) {

        return;

    }


    const rect =
        hero.getBoundingClientRect();


    const width =
        rect.width;


    const height =
        rect.height;


    /* -----------------------------------------------
       PUNTO DELL'ESPLOSIONE
    ----------------------------------------------- */

    const targetX =
        width *
        (
            0.15 +
            Math.random() * 0.70
        );


    const targetY =
        height *
        (
            0.12 +
            Math.random() * 0.42
        );


    /* -----------------------------------------------
       PUNTO DI PARTENZA
    ----------------------------------------------- */

    const startX =
        width *
        (
            0.10 +
            Math.random() * 0.80
        );


    const startY =
        height + 20;


    /* -----------------------------------------------
       VELOCITÀ
    ----------------------------------------------- */

    const speed =
        55 +
        Math.random() * 15;


    const dx =
        targetX -
        startX;


    const dy =
        targetY -
        startY;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    const vx =
        dx /
        distance *
        speed;


    const vy =
        dy /
        distance *
        speed;


    fireworksRockets.push({

        x: startX,

        y: startY,

        targetX: targetX,

        targetY: targetY,

        vx: vx,

        vy: vy,

        trail: [],

        color:
            weddingColors[
                Math.floor(
                    Math.random() *
                    weddingColors.length
                )
            ]

    });

}


/* =====================================================
   ESPLOSIONE
===================================================== */

function createExplosion(
    x,
    y,
    color
) {

    /* -----------------------------------------------
       NUMERO PARTICELLE
    ----------------------------------------------- */

    const particleCount =
        75 +
        Math.floor(
            Math.random() * 45
        );


    /* -----------------------------------------------
       PARTICELLE PRINCIPALI
    ----------------------------------------------- */

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            1.2 +
            Math.random() * 3.8;


        fireworksParticles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            gravity:
                0.025 +
                Math.random() * 0.02,

            friction:
                0.985,

            life:
                1,

            decay:
                0.008 +
                Math.random() * 0.012,

            size:
                1 +
                Math.random() * 1.5,

            color:
                color

        });

    }


    /* -----------------------------------------------
       NUCLEO LUMINOSO
    ----------------------------------------------- */

    for (
        let i = 0;
        i < 14;
        i++
    ) {

        fireworksParticles.push({

            x: x,

            y: y,

            vx:
                (
                    Math.random() -
                    0.5
                ) *
                1.5,

            vy:
                (
                    Math.random() -
                    0.5
                ) *
                1.5,

            gravity:
                0,

            friction:
                0.96,

            life:
                1,

            decay:
                0.025,

            size:
                1.5 +
                Math.random() * 1.5,

            color:
                "rgba(255,255,255,"

        });

    }

}


/* =====================================================
   AGGIORNAMENTO RAZZI
===================================================== */

function updateRockets() {

    for (
        let i =
            fireworksRockets.length - 1;

        i >= 0;

        i--
    ) {

        const rocket =
            fireworksRockets[i];


        /* -------------------------------------------
           SCIA
        ------------------------------------------- */

        rocket.trail.push({

            x: rocket.x,

            y: rocket.y

        });


        if (
            rocket.trail.length >
            10
        ) {

            rocket.trail.shift();

        }


        /* -------------------------------------------
           MOVIMENTO
        ------------------------------------------- */

        rocket.x +=
            rocket.vx;


        rocket.y +=
            rocket.vy;


        /* -------------------------------------------
           DISTANZA DAL BERSAGLIO
        ------------------------------------------- */

        const distanceX =
            rocket.targetX -
            rocket.x;


        const distanceY =
            rocket.targetY -
            rocket.y;


        const distance =
            Math.sqrt(
                distanceX *
                distanceX +
                distanceY *
                distanceY
            );


        /* -------------------------------------------
           ESPLOSIONE
        ------------------------------------------- */

        if (
            distance < 25
        ) {

            createExplosion(
                rocket.x,
                rocket.y,
                rocket.color
            );


            fireworksRockets.splice(
                i,
                1
            );

        }

    }

}


/* =====================================================
   DISEGNO RAZZI
===================================================== */

function drawRockets() {

    if (!fireworksContext) {
        return;
    }


    fireworksRockets.forEach(
        function(rocket) {

            /* ---------------------------------------
               SCIA
            --------------------------------------- */

            for (
                let i = 0;
                i < rocket.trail.length;
                i++
            ) {

                const point =
                    rocket.trail[i];


                const alpha =
                    i /
                    rocket.trail.length;


                fireworksContext.beginPath();


                fireworksContext.arc(
                    point.x,
                    point.y,
                    1,
                    0,
                    Math.PI * 2
                );


                fireworksContext.fillStyle =
                    rocket.color +
                    (
                        alpha * 0.45
                    ) +
                    ")";


                fireworksContext.fill();

            }


            /* ---------------------------------------
               PUNTO LUMINOSO
            --------------------------------------- */

            fireworksContext.beginPath();


            fireworksContext.arc(
                rocket.x,
                rocket.y,
                1.8,
                0,
                Math.PI * 2
            );


            fireworksContext.fillStyle =
                "rgba(255,255,255,0.95)";


            fireworksContext.shadowBlur =
                8;


            fireworksContext.shadowColor =
                "#fff8e6";


            fireworksContext.fill();


            fireworksContext.shadowBlur =
                0;

        }
    );

}


/* =====================================================
   AGGIORNAMENTO PARTICELLE
===================================================== */

function updateParticles() {

    for (
        let i =
            fireworksParticles.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            fireworksParticles[i];


        /* -------------------------------------------
           ATTRITO
        ------------------------------------------- */

        particle.vx *=
            particle.friction;


        particle.vy *=
            particle.friction;


        /* -------------------------------------------
           GRAVITÀ
        ------------------------------------------- */

        particle.vy +=
            particle.gravity;


        /* -------------------------------------------
           POSIZIONE
        ------------------------------------------- */

        particle.x +=
            particle.vx;


        particle.y +=
            particle.vy;


        /* -------------------------------------------
           VITA
        ------------------------------------------- */

        particle.life -=
            particle.decay;


        /* -------------------------------------------
           RIMOZIONE
        ------------------------------------------- */

        if (
            particle.life <= 0
        ) {

            fireworksParticles.splice(
                i,
                1
            );

        }

    }

}


/* =====================================================
   DISEGNO PARTICELLE
===================================================== */

function drawParticles() {

    if (!fireworksContext) {
        return;
    }


    fireworksParticles.forEach(
        function(particle) {

            fireworksContext.beginPath();


            fireworksContext.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            fireworksContext.fillStyle =
                particle.color +
                particle.life +
                ")";


            fireworksContext.shadowBlur =
                7;


            fireworksContext.shadowColor =
                "rgba(255,245,220,0.8)";


            fireworksContext.fill();


            fireworksContext.shadowBlur =
                0;

        }
    );

}


/* =====================================================
   ANIMAZIONE INFINITA
===================================================== */

function animateFireworks(
    timestamp
) {

    if (
        !fireworksCanvas ||
        !fireworksContext ||
        !hero
    ) {

        return;

    }


    const rect =
        hero.getBoundingClientRect();


    const width =
        rect.width;


    const height =
        rect.height;


    /* -----------------------------------------------
       PULIZIA FRAME
    ----------------------------------------------- */

    fireworksContext.clearRect(
        0,
        0,
        width,
        height
    );


    /* -----------------------------------------------
       FREQUENZA LANCIO
    ----------------------------------------------- */

    const launchChance =
        window.innerWidth < 600
            ? 0.035
            : 0.055;


    if (
        Math.random() <
        launchChance
    ) {

        createRocket();

    }


    /* -----------------------------------------------
       PICCOLE RAFFICA CASUALI
    ----------------------------------------------- */

    if (
        Math.random() <
        0.018
    ) {

        createRocket();

    }


    /* -----------------------------------------------
       AGGIORNAMENTO
    ----------------------------------------------- */

    updateRockets();

    updateParticles();


    /* -----------------------------------------------
       DISEGNO
    ----------------------------------------------- */

    drawRockets();

    drawParticles();


    /* -----------------------------------------------
       CONTINUA ALL'INFINITO
    ----------------------------------------------- */

    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* =====================================================
   AVVIO FUOCHI
===================================================== */

function startWeddingFireworks() {

    if (
        fireworksStarted ||
        !hero
    ) {

        return;

    }


    fireworksStarted =
        true;


    createFireworksCanvas();


    fireworksCanvas.style.opacity =
        "1";


    /* -----------------------------------------------
       GRANDE APERTURA
    ----------------------------------------------- */

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        setTimeout(
            function() {

                if (
                    fireworksStarted
                ) {

                    createRocket();

                }

            },
            i * 300
        );

    }


    /* -----------------------------------------------
       AVVIO ANIMAZIONE
    ----------------------------------------------- */

    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* =====================================================
   COUNTDOWN MATRIMONIO
===================================================== */

/*
   2 APRILE 2027
   ORE 00:00:01

   IMPORTANTE:
   In JavaScript aprile = 3
   perché gennaio = 0.
*/

const weddingDate = Date.now() + 10000;

/* =====================================================
   AGGIORNAMENTO COUNTDOWN
===================================================== */

function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate -
        now;


    /* =================================================
       MATRIMONIO ARRIVATO
    ================================================= */

    if (
        distance <= 0
    ) {

        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (daysElement) {
            daysElement.textContent = "0";
        }


        if (hoursElement) {
            hoursElement.textContent = "00";
        }


        if (minutesElement) {
            minutesElement.textContent = "00";
        }


        if (secondsElement) {
            secondsElement.textContent = "00";
        }


        /* ---------------------------------------------
           AVVIA FUOCHI INFINITI
        --------------------------------------------- */

        startWeddingFireworks();


        return;

    }


    /* =================================================
       CALCOLO GIORNI
    ================================================= */

    const days =
        Math.floor(
            distance /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    /* =================================================
       CALCOLO ORE
    ================================================= */

    const hours =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            ) /
            (
                1000 *
                60 *
                60
            )
        );


    /* =================================================
       CALCOLO MINUTI
    ================================================= */

    const minutes =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60 *
                    60
                )
            ) /
            (
                1000 *
                60
            )
        );


    /* =================================================
       CALCOLO SECONDI
    ================================================= */

    const seconds =
        Math.floor(
            (
                distance %
                (
                    1000 *
                    60
                )
            ) /
            1000
        );


    /* =================================================
       AGGIORNAMENTO HTML
    ================================================= */

    const daysElement =
        document.getElementById("days");


    const hoursElement =
        document.getElementById("hours");


    const minutesElement =
        document.getElementById("minutes");


    const secondsElement =
        document.getElementById("seconds");


    if (daysElement) {

        daysElement.textContent =
            days;

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours)
                .padStart(2, "0");

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes)
                .padStart(2, "0");

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds)
                .padStart(2, "0");

    }

}


/* =====================================================
   AVVIO COUNTDOWN
===================================================== */

updateCountdown();


setInterval(
    updateCountdown,
    1000
);
