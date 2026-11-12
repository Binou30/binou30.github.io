document.addEventListener("DOMContentLoaded", () => {

    const boutonCode = document.querySelector(".button-code");
    const boutonLego = document.querySelector(".button-lego");
    const boutonAPropos = document.querySelector(".button-à-propos");
    const boutonLiens = document.querySelector(".button-liens");
    const logo = document.querySelector(".logo");
    const ligneBinou30 = document.querySelector(".bottom-binou30");
    const sousSectionsCode = document.querySelectorAll("[data-section]");
    const navigationCode = document.querySelector(".navigation-code");
    const menuCode = navigationCode?.querySelector(".menu-code-sous-sections");
    let fermetureMenuCode;

    const ouvrirMenuCode = () => {
        window.clearTimeout(fermetureMenuCode);
        navigationCode?.classList.add("menu-code-ouvert");
    };

    const programmerFermetureMenuCode = () => {
        window.clearTimeout(fermetureMenuCode);
        fermetureMenuCode = window.setTimeout(() => {
            navigationCode?.classList.remove("menu-code-ouvert");
        }, 180);
    };

    const actualiserFlouLigne = () => {
        if (!ligneBinou30) return;

        const hauteurBandeau = parseFloat(
            window.getComputedStyle(document.body, "::before").height
        ) || 0;
        const ligne = ligneBinou30.getBoundingClientRect();
        const sousLeFlou = ligne.bottom > 0 && ligne.top < hauteurBandeau;

        ligneBinou30.classList.toggle("ligne-sous-flou", sousLeFlou);
    };

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

    const mobileQuery = window.matchMedia("(max-width: 56.25rem)");

    const closeMenu = () => {
        document.body.classList.remove("menu-ouvert");
        navigationCode?.classList.remove("menu-code-ouvert");
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

    sousSectionsCode.forEach((lien) => {
        lien.addEventListener("click", (event) => {
            event.preventDefault();
            navigationCode?.classList.add("menu-code-ferme");
            scrollToSection(lien.dataset.section);
        });
    });

    navigationCode?.addEventListener("pointerenter", ouvrirMenuCode);
    navigationCode?.addEventListener("pointerleave", programmerFermetureMenuCode);
    menuCode?.addEventListener("pointerenter", ouvrirMenuCode);
    menuCode?.addEventListener("pointerleave", programmerFermetureMenuCode);

    navigationCode?.addEventListener("mouseleave", () => {
        navigationCode.classList.remove("menu-code-ferme");
    });

    burger.addEventListener("click", () => {
        navigationCode?.classList.remove("menu-code-ferme");
        navigationCode?.classList.remove("menu-code-ouvert");
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
