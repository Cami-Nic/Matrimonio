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
   FUOCHI D'ARTIFICIO
   STILE ELEGANTE DA MATRIMONIO
===================================================== */

const hero =
    document.querySelector(".hero");

let fireworksStarted = false;
let fireworksCanvas = null;
let fireworksContext = null;
let fireworksAnimation = null;
let fireworksStartTime = 0;

const fireworksDuration = 10000;


/* =====================================================
   CREAZIONE CANVAS
===================================================== */

function createFireworksCanvas() {

    if (!hero || fireworksCanvas) {
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
        !fireworksContext
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
   PARTICELLE
===================================================== */

let fireworksParticles = [];
let fireworksRockets = [];


/* =====================================================
   COLORI ELEGANTI
===================================================== */

const weddingColors = [
    "rgba(255,255,255,",
    "rgba(255,248,230,",
    "rgba(250,220,200,",
    "rgba(243,201,208,",
    "rgba(255,231,190,"
];


/* =====================================================
   CREAZIONE RAZZO
===================================================== */

function createRocket() {

    if (!fireworksCanvas) {
        return;
    }

    const width =
        hero.getBoundingClientRect().width;

    const height =
        hero.getBoundingClientRect().height;

    const targetX =
        width * (
            0.2 +
            Math.random() * 0.6
        );

    const targetY =
        height * (
            0.15 +
            Math.random() * 0.38
        );

    const startX =
        width * (
            0.15 +
            Math.random() * 0.7
        );

    const startY =
        height + 20;

    fireworksRockets.push({

        x: startX,
        y: startY,

        targetX: targetX,
        targetY: targetY,

        vx:
            (targetX - startX) / 65,

        vy:
            (targetY - startY) / 65,

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

    const particleCount =
        75 +
        Math.floor(
            Math.random() * 35
        );

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
            Math.random() * 3.5;

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
                0.009 +
                Math.random() * 0.012,

            size:
                1 +
                Math.random() * 1.4,

            color:
                color

        });
    }


    /* Piccolo nucleo luminoso */

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        fireworksParticles.push({

            x: x,
            y: y,

            vx:
                (Math.random() - 0.5) *
                1.5,

            vy:
                (Math.random() - 0.5) *
                1.5,

            gravity: 0,

            friction:
                0.96,

            life: 1,

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
        let i = fireworksRockets.length - 1;
        i >= 0;
        i--
    ) {

        const rocket =
            fireworksRockets[i];


        rocket.trail.push({

            x: rocket.x,
            y: rocket.y

        });


        if (
            rocket.trail.length >
            8
        ) {

            rocket.trail.shift();

        }


        rocket.x += rocket.vx;
        rocket.y += rocket.vy;


        const distanceX =
            rocket.targetX -
            rocket.x;

        const distanceY =
            rocket.targetY -
            rocket.y;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        if (distance < 12) {

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

            /* Scia */

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


            /* Punto luminoso */

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
        let i = fireworksParticles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            fireworksParticles[i];


        particle.vx *=
            particle.friction;

        particle.vy *=
            particle.friction;


        particle.vy +=
            particle.gravity;


        particle.x +=
            particle.vx;

        particle.y +=
            particle.vy;


        particle.life -=
            particle.decay;


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
   ANIMAZIONE FUOCHI
===================================================== */

function animateFireworks(
    timestamp
) {

    if (!fireworksCanvas) {
        return;
    }


    const elapsed =
        timestamp -
        fireworksStartTime;


    const width =
        hero.getBoundingClientRect().width;

    const height =
        hero.getBoundingClientRect().height;


    /* -------------------------------------------------
       Sfondo trasparente.
       Lasciamo vedere completamente la foto della Hero.
    ------------------------------------------------- */

    fireworksContext.clearRect(
        0,
        0,
        width,
        height
    );


    /* -------------------------------------------------
       Lancio automatico dei fuochi
    ------------------------------------------------- */

    if (
        elapsed < fireworksDuration
    ) {

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


        /* Raffica iniziale */

        if (
            elapsed < 900 &&
            Math.random() < 0.12
        ) {

            createRocket();

        }


        /* Raffica centrale */

        if (
            elapsed > 3500 &&
            elapsed < 5000 &&
            Math.random() < 0.08
        ) {

            createRocket();

        }


        /* Grande finale */

        if (
            elapsed > 7000 &&
            elapsed < 8500 &&
            Math.random() < 0.11
        ) {

            createRocket();

        }

    }


    updateRockets();
    updateParticles();

    drawRockets();
    drawParticles();


    /* -------------------------------------------------
       Dissolvenza finale
    ------------------------------------------------- */

    if (
        elapsed >
        fireworksDuration - 1200
    ) {

        const fade =
            Math.max(
                0,
                1 -
                (
                    elapsed -
                    (
                        fireworksDuration -
                        1200
                    )
                ) /
                1200
            );

        fireworksCanvas.style.opacity =
            fade;

    }


    /* -------------------------------------------------
       Fine spettacolo
    ------------------------------------------------- */

    if (
        elapsed >=
        fireworksDuration
    ) {

        fireworksContext.clearRect(
            0,
            0,
            width,
            height
        );

        fireworksRockets = [];
        fireworksParticles = [];

        fireworksCanvas.style.opacity =
            "0";

        fireworksAnimation =
            null;

        return;

    }


    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* =====================================================
   AVVIO SPETTACOLO
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


    fireworksStartTime =
        performance.now();


    fireworksCanvas.style.opacity =
        "1";


    /* -------------------------------------------------
       Prima raffica elegante
    ------------------------------------------------- */

    setTimeout(
        function() {

            if (fireworksStarted) {
                createRocket();
                createRocket();
            }

        },
        200
    );


    /* -------------------------------------------------
       Seconda raffica
    ------------------------------------------------- */

    setTimeout(
        function() {

            if (fireworksStarted) {
                createRocket();
            }

        },
        700
    );


    /* -------------------------------------------------
       Grande raffica finale
    ------------------------------------------------- */

    setTimeout(
        function() {

            if (fireworksStarted) {

                createRocket();
                createRocket();
                createRocket();

            }

        },
        7200
    );


    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );
}


/* =====================================================
   COUNTDOWN MATRIMONIO
===================================================== */

const weddingDate =
    new Date(
        Date.now() + 10000
    ).getTime();


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

        document.getElementById(
            "days"
        ).textContent =
            "0";


        document.getElementById(
            "hours"
        ).textContent =
            "0";


        document.getElementById(
            "minutes"
        ).textContent =
            "0";


        document.getElementById(
            "seconds"
        ).textContent =
            "0";


        /* ---------------------------------------------
           AVVIA I FUOCHI
        --------------------------------------------- */

        startWeddingFireworks();


        return;
    }


    /* =================================================
       CALCOLO TEMPO
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

    document.getElementById(
        "days"
    ).textContent =
        days;


    document.getElementById(
        "hours"
    ).textContent =
        String(
            hours
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(
            minutes
        ).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(
            seconds
        ).padStart(
            2,
            "0"
        );

}


/* =====================================================
   AVVIO COUNTDOWN
===================================================== */

updateCountdown();


setInterval(
    updateCountdown,
    1000
);
