import { controller } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
    /******************/
    /* FULLSCREEN NAV */
    /******************/
    const btnMenu = document.getElementById("btn-menu");
    const btnMenuIcon = document.getElementById("btn-menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = mobileMenu.querySelectorAll(".mobile-nav-link");

    if (btnMenu) {
        btnMenu.addEventListener("click", toggleMenu);
    }

    function toggleMenu() {
        const isActive = mobileMenu.classList.contains("active");

        // Actualizar aria-expanded inmediatamente
        btnMenu.setAttribute("aria-expanded", String(!isActive));

        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        // Cambiar ícono inmediatamente
        btnMenuIcon.classList.remove("fa-bars");
        btnMenuIcon.classList.add("fa-xmark");

        // Abrir menú
        mobileMenu.classList.add("active");
        document.body.classList.add('no-scroll');
    }

    function closeMenu() {
        // Cambiar ícono inmediatamente  
        btnMenuIcon.classList.remove("fa-xmark");
        btnMenuIcon.classList.add("fa-bars");

        // Cerrar menú
        mobileMenu.classList.add("closing");
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
            mobileMenu.classList.remove("active", "closing");
        }, 300);
    }

    // CLOSE THE MENU CLICKING ANY LINK
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            btnMenu.setAttribute("aria-expanded", "false");
            closeMenu();
        });
    });

    // Cerrar menú con Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
            btnMenu.setAttribute("aria-expanded", "false");
            closeMenu();
        }
    });
    /**********************/
    /* END FULLSCREEN NAV */
    /**********************/

    /***********************************************/
    /* ADJUSTS THE HERO SECTION HEIGHT DYNAMICALLY */
    /***********************************************/
    function adjustHeroHeight() {
        const mainHeader = document.querySelector('.main-header');
        const hero = document.querySelector('.hero');
        if (mainHeader && hero) {
            const navHeight = mainHeader.offsetHeight;
            hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
        }
    }

    window.addEventListener('load', adjustHeroHeight);
    window.addEventListener('resize', adjustHeroHeight);

    /***************************************/
    /* ENTRANCE ANIMATION FOR HERO BUTTONS */
    /***************************************/
    /*gsap.from(".hero-buttons a", {
        y: 75,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hero",
            start: "top center",
        }
    });*/

    /****************/
    /* GET PROJECTS */
    /****************/
    controller.getProjects();

});