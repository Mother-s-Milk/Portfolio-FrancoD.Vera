import { service } from "./service.js";

const controller = {
    getProjects: () => {
        service.getProjects()
            .then(response => {
                controller.renderProjects(response)
            })
            .catch(error => console.log('Error al cargar los proyectos: ', error))
    },
    renderProjects: (projects) => {
        let projectsMain = document.getElementById('projects-cards');

        projects.forEach(element => {
            // Generar las tecnologías de forma dinámica
            let technologies = '';

            element.technologies.forEach(tech => {
                let iconClass = '';
                let iconFamily = '';

                switch (tech.toLowerCase()) {
                    case 'html':
                        iconFamily = 'fa-brands';
                        iconClass = 'fa-html5';
                        break;
                    case 'css':
                        iconFamily = 'fa-brands';
                        iconClass = 'fa-css3-alt';
                        break;
                    case 'js':
                        iconFamily = 'fa-brands';
                        iconClass = 'fa-js';
                        break;
                    case 'php':
                        iconFamily = 'fa-brands';
                        iconClass = 'fa-php';
                        break;
                    case 'mysql':
                        iconFamily = 'fa-solid';
                        iconClass = 'fa-database';
                        break;
                    case 'git':
                        iconFamily = 'fa-brands';
                        iconClass = 'fa-git-alt';
                        break;
                    default:
                        iconFamily = 'fa-solid';
                        iconClass = 'fa-circle-question';
                }

                technologies += `
                    <span class="tag-${tech.toLowerCase()}">
                        <i class="${iconFamily} ${iconClass}"></i>${tech}
                    </span>
                `;
            });

            let newCard = `
                <article class="project-card" data-type="${element.type}">
                    <img class="project-img" src="${element.img}" alt="${element.title}">
                    <div class="project-info">
                        <h2>${element.title}</h2>
                        <p>${element.description}</p>
                        <div class="project-technologies">
                            ${technologies}
                        </div>
                    </div>
                    <div class="project-links">
                        <a class="btn-site" href="${element.site}" title="Ver sitio web de ${element.title}" target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-link"></i>
                        </a>
                        <a class="btn-github" href="${element.repository}" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-github-alt"></i>
                        </a>
                    </div>
                </article>
            `;

            projectsMain.insertAdjacentHTML('beforeend', newCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /******************/
    /* FULLSCREEN NAV */
    /******************/
    const btnMenu = document.getElementById("btn-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = mobileMenu.querySelectorAll(".mobile-nav-link");

    btnMenu.addEventListener("click", () => {
        const isActive = mobileMenu.classList.contains("active");

	    btnMenu.setAttribute("aria-expanded", String(!isActive));

        if (isActive) {
            mobileMenu.classList.add("closing");
            setTimeout(() => {
                mobileMenu.classList.remove("active", "closing");
            }, 300);
        } else {
            mobileMenu.classList.add("active");
        }
    });

    // CLOSE THE MENU CLICKING ANY LINK
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("closing");
            btnMenu.setAttribute("aria-expanded", "false");
            setTimeout(() => {
                mobileMenu.classList.remove("active", "closing");
            }, 300);
        });
    });

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
    gsap.from(".hero-buttons a", {
        y: 75,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".hero",
            start: "top center",
        }
    });

    /****************/
    /* GET PROJECTS */
    /****************/
    controller.getProjects();

});