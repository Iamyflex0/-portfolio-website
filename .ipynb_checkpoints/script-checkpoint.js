/* =========================================================
   SHOVON MAHALI — PERSONAL PORTFOLIO
   COMPLETE UPDATED SCRIPT.JS
========================================================= */


/* =========================================================
   01. GET DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

const currentYear = document.getElementById("current-year");


/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active");

        const isOpen =
            navLinks.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


/* =========================================================
   03. MORE DROPDOWN
========================================================= */

if (
    dropdown &&
    dropdownToggle &&
    dropdownMenu
) {

    dropdownToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            dropdown.classList.toggle("active");

            const isOpen =
                dropdown.classList.contains("active");

            dropdownToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


/* =========================================================
   04. CLOSE DROPDOWN WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            dropdown &&
            !dropdown.contains(event.target)
        ) {

            dropdown.classList.remove("active");

            if (dropdownToggle) {

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   05. NAVIGATION LINK CLICK
========================================================= */

const allNavLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


allNavLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {


                /* Close mobile menu */

                if (navLinks) {

                    navLinks.classList.remove(
                        "open"
                    );

                }


                /* Reset hamburger */

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /* Close dropdown */

                if (dropdown) {

                    dropdown.classList.remove(
                        "active"
                    );

                }


                if (dropdownToggle) {

                    dropdownToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }
);


/* =========================================================
   06. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav-links > li > a:not(.nav-resume), .dropdown-menu a"
    );


function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY;


    sections.forEach(
        function (section) {

            const sectionTop =
                section.offsetTop - 160;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navigationLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


/* Run on scroll */

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   07. MORE MENU ACTIVE STATE
========================================================= */

function updateDropdownActiveState() {

    const currentHash =
        window.location.hash;


    const dropdownLinks =
        document.querySelectorAll(
            ".dropdown-menu a"
        );


    let dropdownIsActive = false;


    dropdownLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                currentHash
            ) {

                link.classList.add(
                    "active"
                );

                dropdownIsActive = true;

            }

        }
    );


    if (
        dropdown &&
        dropdownIsActive
    ) {

        dropdown.classList.add(
            "active"
        );

    }

}


/* =========================================================
   08. SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section, " +
        ".skill-card, " +
        ".experience-card, " +
        ".research-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".entrepreneurship-content, " +
        ".resume-content"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   09. CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   10. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {


            /* Close dropdown */

            if (dropdown) {

                dropdown.classList.remove(
                    "active"
                );

            }


            if (dropdownToggle) {

                dropdownToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            /* Close mobile navigation */

            if (navLinks) {

                navLinks.classList.remove(
                    "open"
                );

            }


            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   11. HANDLE WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        /*
         * If the screen becomes desktop-sized,
         * make sure the mobile menu is reset.
         */

        if (
            window.innerWidth > 900
        ) {

            if (navLinks) {

                navLinks.classList.remove(
                    "open"
                );

            }

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   12. PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "loaded"
        );


        updateActiveNavigation();

        updateDropdownActiveState();

    }
);


/* =========================================================
   13. INITIAL ACTIVE NAVIGATION
========================================================= */

updateActiveNavigation();

updateDropdownActiveState();


/* =========================================================
   14. CONSOLE MESSAGE
========================================================= */

console.log(
    "Shovon Mahali Portfolio — Website loaded successfully."
);