/* =========================================================
   SHOVON MAHALI — PROFESSIONAL PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT SELECTORS
    ====================================================== */

    const header = document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const navWrapper =
        document.getElementById("navWrapper");

    const dropdownTrigger =
        document.getElementById("dropdownTrigger");

    const dropdownMenu =
        document.getElementById("moreMenu");

    const dropdown =
        document.querySelector(".nav-dropdown");

    const pageLoader =
        document.getElementById("pageLoader");

    const currentYear =
        document.getElementById("currentYear");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );



    /* =====================================================
       PAGE LOADER
    ====================================================== */

    function hidePageLoader() {

        if (!pageLoader) return;

        pageLoader.classList.add("hidden");

        /*
         * Remove it from accessibility tree after
         * the animation has finished.
         */
        setTimeout(() => {

            pageLoader.setAttribute(
                "aria-hidden",
                "true"
            );

        }, 700);

    }


    /*
     * Hide loader when the page has fully loaded.
     */
    window.addEventListener(
        "load",
        () => {

            setTimeout(
                hidePageLoader,
                250
            );

        }
    );



    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    function openMobileMenu() {

        if (
            !mobileMenuButton ||
            !navWrapper
        ) {
            return;
        }


        navWrapper.classList.add("open");

        mobileMenuButton.classList.add("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Close navigation"
        );

        /*
         * Prevent background page scrolling
         * while the mobile navigation is open.
         */
        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        if (
            !mobileMenuButton ||
            !navWrapper
        ) {
            return;
        }


        navWrapper.classList.remove("open");

        mobileMenuButton.classList.remove(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    function toggleMobileMenu() {

        if (!navWrapper) return;


        const isOpen =
            navWrapper.classList.contains("open");


        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMobileMenu();

            }
        );

    }



    /* =====================================================
       MORE DROPDOWN
    ====================================================== */

    function openDropdown() {

        if (
            !dropdown ||
            !dropdownTrigger
        ) {
            return;
        }


        dropdown.classList.add("open");

        dropdownTrigger.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeDropdown() {

        if (
            !dropdown ||
            !dropdownTrigger
        ) {
            return;
        }


        dropdown.classList.remove("open");

        dropdownTrigger.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleDropdown() {

        if (!dropdown) return;


        const isOpen =
            dropdown.classList.contains("open");


        if (isOpen) {

            closeDropdown();

        } else {

            openDropdown();

        }

    }


    if (dropdownTrigger) {

        dropdownTrigger.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                toggleDropdown();

            }
        );

    }



    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                dropdown &&
                !dropdown.contains(
                    event.target
                )
            ) {

                closeDropdown();

            }

        }
    );



    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const href =
                        link.getAttribute("href");


                    /*
                     * Ignore empty hashes.
                     */
                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    /*
                     * Only process valid internal
                     * section links.
                     */
                    if (
                        !href.startsWith("#")
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) return;


                    /*
                     * Prevent the browser's
                     * default jump.
                     */
                    event.preventDefault();


                    /*
                     * Close menus.
                     */
                    closeMobileMenu();

                    closeDropdown();


                    /*
                     * Scroll smoothly.
                     */
                    target.scrollIntoView({
                        behavior:
                            prefersReducedMotion()
                                ? "auto"
                                : "smooth",

                        block: "start"
                    });


                    /*
                     * Update the URL without
                     * forcing another page jump.
                     */
                    if (
                        history.pushState
                    ) {

                        history.pushState(
                            null,
                            "",
                            href
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       REDUCED MOTION CHECK
    ====================================================== */

    function prefersReducedMotion() {

        return window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function updateActiveNavigation() {

        if (!sections.length) return;


        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "home";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition <
                        sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.id;

                }

            }
        );


        /*
         * Contact becomes active when the user
         * reaches the bottom of the page.
         */
        const pageBottom =
            window.innerHeight +
            window.scrollY >=
            document.documentElement.scrollHeight - 100;


        if (pageBottom) {

            currentSection = "contact";

        }


        /*
         * Main navigation links.
         */
        navLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute("href");


                /*
                 * Don't treat the More button
                 * as a normal navigation link.
                 */
                if (
                    link === dropdownTrigger
                ) {
                    return;
                }


                if (
                    href === `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                } else {

                    link.classList.remove(
                        "active"
                    );

                }

            }
        );


        /*
         * Sections contained inside the More menu.
         */
        const moreSections = [
            "research",
            "entrepreneurship",
            "education",
            "certifications",
            "awards",
            "contact"
        ];


        if (
            dropdownTrigger &&
            moreSections.includes(
                currentSection
            )
        ) {

            dropdownTrigger.classList.add(
                "active"
            );

        } else if (dropdownTrigger) {

            dropdownTrigger.classList.remove(
                "active"
            );

        }

    }


    /*
     * Scroll listener.
     */
    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );



    /* =====================================================
       HEADER SCROLL STATE
    ====================================================== */

    function updateHeader() {

        if (!header) return;


        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .section-intro,
            .focus-card,
            .about-copy,
            .about-details,
            .experience-card,
            .skill-card,
            .research-card,
            .entrepreneurship-grid,
            .education-item,
            .certification-item,
            .award-card,
            .project-card,
            .resume-inner,
            .contact-intro,
            .contact-links
            `
        );


    /*
     * If reduced motion is enabled, don't
     * use animation observers.
     */
    if (
        prefersReducedMotion()
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    } else if (
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

            }
        );


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback for older browsers.
         */
        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }



    /* =====================================================
       STAGGERED CARD DELAYS
    ====================================================== */

    const staggerGroups = [
        ".focus-grid .focus-card",
        ".skills-grid .skill-card",
        ".experience-list .experience-card",
        ".research-grid .research-card",
        ".certifications-list .certification-item",
        ".awards-grid .award-card",
        ".projects-grid .project-card"
    ];


    staggerGroups.forEach(
        (selector) => {

            const cards =
                document.querySelectorAll(
                    selector
                );


            cards.forEach(
                (card, index) => {

                    /*
                     * Maximum delay prevents
                     * very slow animations on
                     * long lists.
                     */
                    const delay =
                        Math.min(
                            index * 70,
                            420
                        );


                    card.style.setProperty(
                        "--stagger-delay",
                        `${delay}ms`
                    );

                }
            );

        }
    );



    /* =====================================================
       MOBILE MENU — CLOSE AFTER LINK CLICK
    ====================================================== */

    if (navWrapper) {

        const navigationLinks =
            navWrapper.querySelectorAll(
                "a"
            );


        navigationLinks.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMobileMenu();

                    }
                );

            }
        );

    }



    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            /*
             * Close More dropdown.
             */
            closeDropdown();


            /*
             * Close mobile navigation.
             */
            closeMobileMenu();


            /*
             * Return focus to menu button
             * when appropriate.
             */
            if (
                mobileMenuButton &&
                window.innerWidth <= 900
            ) {

                mobileMenuButton.focus();

            }

        }
    );



    /* =====================================================
       DROPDOWN KEYBOARD NAVIGATION
    ====================================================== */

    if (
        dropdownTrigger &&
        dropdownMenu
    ) {

        const dropdownLinks =
            dropdownMenu.querySelectorAll(
                "a"
            );


        /*
         * Arrow Down from More button.
         */
        dropdownTrigger.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "ArrowDown"
                ) {

                    event.preventDefault();

                    openDropdown();


                    if (
                        dropdownLinks.length
                    ) {

                        dropdownLinks[0].focus();

                    }

                }


                if (
                    event.key === "Escape"
                ) {

                    event.preventDefault();

                    closeDropdown();

                    dropdownTrigger.focus();

                }

            }
        );


        /*
         * Keyboard movement inside dropdown.
         */
        dropdownLinks.forEach(
            (link, index) => {

                link.addEventListener(
                    "keydown",
                    (event) => {

                        /*
                         * Move down.
                         */
                        if (
                            event.key ===
                            "ArrowDown"
                        ) {

                            event.preventDefault();


                            const next =
                                dropdownLinks[
                                    index + 1
                                ];


                            if (next) {

                                next.focus();

                            }

                        }


                        /*
                         * Move up.
                         */
                        if (
                            event.key ===
                            "ArrowUp"
                        ) {

                            event.preventDefault();


                            const previous =
                                dropdownLinks[
                                    index - 1
                                ];


                            if (previous) {

                                previous.focus();

                            } else {

                                dropdownTrigger.focus();

                            }

                        }


                        /*
                         * Close with Escape.
                         */
                        if (
                            event.key ===
                            "Escape"
                        ) {

                            event.preventDefault();

                            closeDropdown();

                            dropdownTrigger.focus();

                        }

                    }
                );

            }
        );

    }



    /* =====================================================
       RESIZE HANDLER
    ====================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    () => {

                        /*
                         * Reset mobile navigation
                         * when moving to desktop.
                         */
                        if (
                            window.innerWidth >
                            900
                        ) {

                            closeMobileMenu();

                        }


                        /*
                         * Keep active navigation
                         * accurate after resizing.
                         */
                        updateActiveNavigation();

                    },
                    120
                );

        }
    );



    /* =====================================================
       DYNAMIC COPYRIGHT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       HANDLE INITIAL HASH
    ====================================================== */

    function handleInitialHash() {

        const hash =
            window.location.hash;


        if (!hash) return;


        const target =
            document.querySelector(
                hash
            );


        if (!target) return;


        /*
         * Wait until the page is rendered before
         * scrolling to the requested section.
         */
        setTimeout(
            () => {

                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion()
                            ? "auto"
                            : "smooth",

                    block: "start"
                });

            },
            350
        );

    }


    handleInitialHash();



    /* =====================================================
       BROWSER HISTORY / HASH CHANGES
    ====================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            updateActiveNavigation();

        }
    );



    /* =====================================================
       EXTERNAL LINK SECURITY
    ====================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(
        (link) => {

            const currentRel =
                link.getAttribute("rel") ||
                "";


            const relParts =
                currentRel
                    .split(" ")
                    .filter(Boolean);


            if (
                !relParts.includes(
                    "noopener"
                )
            ) {

                relParts.push(
                    "noopener"
                );

            }


            if (
                !relParts.includes(
                    "noreferrer"
                )
            ) {

                relParts.push(
                    "noreferrer"
                );

            }


            link.setAttribute(
                "rel",
                relParts.join(" ")
            );

        }
    );



    /* =====================================================
       INITIAL UI STATE
    ====================================================== */

    updateHeader();

    updateActiveNavigation();



    /* =====================================================
       DEBUG / DEVELOPMENT MESSAGE
    ====================================================== */

    console.log(
        "Shovon Mahali Portfolio — JavaScript loaded successfully."
    );

});