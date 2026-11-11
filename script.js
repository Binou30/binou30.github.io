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

    // Orientation réelle de l'appareil (fiable même quand le viewport est périmé)
    const orientationReelle = () => {
        if (typeof window.orientation === "number") {
            return Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
        }
        const type = screen.orientation?.type;
        if (type) {
            return type.startsWith("landscape") ? "landscape" : "portrait";
        }
        return null;
    };

    const viewportCoherent = () => {
        const reelle = orientationReelle();
        if (!reelle) return true;
        const viewportEnPaysage = window.innerWidth > window.innerHeight;
        return viewportEnPaysage === (reelle === "landscape");
    };

    // Contournement du bug de Chrome iOS/iPadOS : si le viewport n'a pas
    // été mis à jour après la rotation, on recharge (une seule fois).
    let minuterieRotation = null;
    const verifierApresRotation = () => {
        clearTimeout(minuterieRotation);
        minuterieRotation = setTimeout(() => {
            if (viewportCoherent()) return;

            const dernier = Number(sessionStorage.getItem("dernier-reload-rotation")) || 0;
            if (Date.now() - dernier < 3000) return;

            sessionStorage.setItem("dernier-reload-rotation", String(Date.now()));
            location.reload();
        }, 700);
    };

    const gererRotation = () => {
        document.body.classList.remove("menu-ouvert");

        const burgerRotation = document.querySelector(".menu-burger");
        if (burgerRotation) {
            burgerRotation.setAttribute("aria-expanded", "false");
            burgerRotation.setAttribute("aria-label", "Ouvrir le menu");
        }

        recalibrerOrientation();
        verifierApresRotation();
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