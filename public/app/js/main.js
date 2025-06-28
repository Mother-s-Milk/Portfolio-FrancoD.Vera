import { service } from "./service.js";

const controller = {
    getProjects: () => {
        service.getProjects()
            .then(response => {
                console.log('Proyectos cargados: ', response);
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
                    <img class="project-card-img" src="${element.img}" alt="${element.title}">
                    <div class="project-card-content">
                        <div>
                            <h1>${element.title}</h1>
                            <p>${element.description}</p>
                            <div class="project-card-technologies">
                                ${technologies}
                            </div>
                        </div>
                        <div class="project-card-links">
                            <a class="btn-site" href="${element.site}" title="Ver sitio web" rel="noopener noreferrer">
                                <i class="fa-solid fa-link"></i>
                            </a>
                            <a class="btn-github" href="${element.repository}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-github-alt"></i>
                            </a>
                        </div>
                    </div>
                </article>
            `;

            projectsMain.insertAdjacentHTML('beforeend', newCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function adjustHeroHeight() {
        const principalHeader = document.querySelector('.principal-header');
        const hero = document.querySelector('.hero');
        if (principalHeader && hero) {
            const navHeight = principalHeader.offsetHeight;
            hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
        }
    }
    
    // Ejecutar al cargar y al cambiar tamaño
    window.addEventListener('load', adjustHeroHeight);
    window.addEventListener('resize', adjustHeroHeight);

    /*                                */
    /* Animation for the hero buttons */
    /*                                */
    gsap.from(".buttons-hero a", {
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

    /* */
    controller.getProjects();
    /* */

    /*     */
    /* NAV */
    /*     */
    const navbar = document.querySelector(".menu-desplegable");
    const toggleButton = document.getElementById("btn-menu");
    const links = document.querySelectorAll(".mobile-nav-link");

    toggleButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("show-menu");
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        toggleButton.setAttribute("aria-expanded", isOpen);
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show-menu");
            document.body.style.overflow = "auto";
            toggleButton.setAttribute("aria-expanded", false);
        });
    });


});