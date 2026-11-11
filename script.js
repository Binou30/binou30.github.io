document.addEventListener("DOMContentLoaded", () => {

    const boutonCode = document.querySelector(".button-code");
    const boutonLego = document.querySelector(".button-lego");
    const boutonAPropos = document.querySelector(".button-à-propos");
    const boutonLiens = document.querySelector(".button-liens");
    const logo = document.querySelector(".logo");
    const ligneBinou30 = document.querySelector(".bottom-binou30");

    const actualiserFlouLigne = () => {
        if (!ligneBinou30) return;

        const hauteurBandeau = parseFloat(
            window.getComputedStyle(document.body, "::before").height
        ) || 0;
        const ligne = ligneBinou30.getBoundingClientRect();
        const sousLeFlou = ligne.bottom > 0 && ligne.top < hauteurBandeau;

        ligneBinou30.classList.toggle("ligne-sous-flou", sousLeFlou);
    };

    let recalibrageEnAttente = false;
    const mediaOrientation = window.matchMedia("(orientation: portrait)");

    const recalibrerOrientation = () => {
        if (recalibrageEnAttente) return;

        recalibrageEnAttente = true;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty(
                    "--orientation-viewport-width",
                    `${window.innerWidth}px`
                );

                actualiserFlouLigne();
                recalibrageEnAttente = false;
            });
        });
    };

    // Contenu d'origine de la meta viewport, mémorisé une seule fois
    const metaViewport = document.querySelector('meta[name="viewport"]');
    const contenuMetaOriginal = metaViewport?.getAttribute("content") ?? null;

    // Force le navigateur à réévaluer viewport et media queries
    // (Safari : meta viewport / Chrome et autres : micro-défilement invisible)
    const secouerViewport = () => {
        if (metaViewport && contenuMetaOriginal !== null) {
            metaViewport.setAttribute(
                "content",
                "width=device-width, initial-scale=1, maximum-scale=1"
            );
        }

        const y = window.scrollY;
        window.scrollTo(window.scrollX, y + 1);
        window.scrollTo(window.scrollX, y);

        requestAnimationFrame(() => {
            if (metaViewport && contenuMetaOriginal !== null) {
                metaViewport.setAttribute("content", contenuMetaOriginal);
            }
            recalibrerOrientation();
        });
    };

    // Surveille les dimensions pendant 1 s après une rotation
    // (chaque navigateur met à jour les siennes à un moment différent)
    let idSurveillance = 0;
    const stabiliserApresRotation = () => {
        const id = ++idSurveillance;
        const debut = performance.now();
        let derniereSignature = "";

        const verifier = () => {
            if (id !== idSurveillance) return;

            const signature = `${window.innerWidth}x${window.innerHeight}`;
            if (signature !== derniereSignature) {
                derniereSignature = signature;
                secouerViewport();
            }

            if (performance.now() - debut < 1000) {
                requestAnimationFrame(verifier);
            } else {
                secouerViewport();
            }
        };

        requestAnimationFrame(verifier);
    };

    const gererRotation = () => {
        document.body.classList.remove("menu-ouvert");

        const burgerRotation = document.querySelector(".menu-burger");
        if (burgerRotation) {
            burgerRotation.setAttribute("aria-expanded", "false");
            burgerRotation.setAttribute("aria-label", "Ouvrir le menu");
        }

        recalibrerOrientation();
        stabiliserApresRotation();
    };

    window.addEventListener("orientationchange", gererRotation);
    window.addEventListener("resize", recalibrerOrientation);
    window.visualViewport?.addEventListener("resize", recalibrerOrientation);
    screen.orientation?.addEventListener("change", gererRotation);

    if (mediaOrientation.addEventListener) {
        mediaOrientation.addEventListener("change", gererRotation);
    } else {
        mediaOrientation.addListener(gererRotation);
    }

    function animationTap(element) {
        if (!element) return;

        element.addEventListener("click", () => {
            element.classList.remove("tap-active");

            void element.offsetWidth;

            element.classList.add("tap-active");

            setTimeout(() => {
                element.classList.remove("tap-active");
            }, 150);
        });
    }

    [
        boutonCode,
        boutonLego,
        boutonAPropos,
        boutonLiens,
        logo
    ].forEach(animationTap);

    actualiserFlouLigne();
    window.addEventListener("scroll", actualiserFlouLigne, { passive: true });
    window.addEventListener("resize", actualiserFlouLigne);

    const burger = document.querySelector(".menu-burger");
    const navigation = document.querySelector(".navigation-principale");

    if (!burger || !navigation) {
        return;
    }

    const mobileQuery = window.matchMedia(
        "(max-width: 56.25rem), (min-width: 56.26rem) and (max-width: 75rem) and (orientation: portrait)"
    );

    const closeMenu = () => {
        document.body.classList.remove("menu-ouvert");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Ouvrir le menu");
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        closeMenu();
        const blurHeight = parseFloat(
            window.getComputedStyle(document.body, "::before").height
        ) || 0;

        window.scrollTo({
            top: Math.max(0, sectionTop - blurHeight - 16),
            behavior: "smooth"
        });
    };

    logo?.addEventListener("click", () => {
        closeMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const destinations = [
        [boutonCode, "code"],
        [boutonLego, "lego"],
        [boutonAPropos, "a-propos"],
        [boutonLiens, "liens"]
    ];

    destinations.forEach(([bouton, id]) => {
        bouton?.addEventListener("click", () => {
            scrollToSection(id);
        });
    });

    burger.addEventListener("click", () => {
        const menuOuvert = document.body.classList.toggle("menu-ouvert");

        burger.setAttribute("aria-expanded", String(menuOuvert));
        burger.setAttribute(
            "aria-label",
            menuOuvert ? "Fermer le menu" : "Ouvrir le menu"
        );

    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.body.classList.contains("menu-ouvert")) {
            closeMenu();
            burger.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            document.body.classList.contains("menu-ouvert") &&
            !burger.contains(event.target) &&
            !navigation.contains(event.target)
        ) {
            closeMenu();
        }
    });

    mobileQuery.addEventListener("change", (event) => {
        if (!event.matches) {
            closeMenu();
        }
    });
});