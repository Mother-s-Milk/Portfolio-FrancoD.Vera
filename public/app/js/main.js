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
                        <a class="btn-site" href="${element.site}" title="Ver sitio web" rel="noopener noreferrer">
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
    function adjustHeroHeight() {
        const principalHeader = document.querySelector('.main-header');
        const hero = document.querySelector('.hero');
        if (principalHeader && hero) {
            const navHeight = principalHeader.offsetHeight;
            hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
        }
    }
    
    // Ejecutar al cargar y al cambiar tamaño
    window.addEventListener('load', adjustHeroHeight);
    window.addEventListener('resize', adjustHeroHeight);
    
    /******************/
    /* FULLSCREEN NAV */
    /******************/
    const toggleButton = document.getElementById("btn-menu");
    const nav = document.getElementById("mobile-menu");

    toggleButton.addEventListener("click", () => {
        const isActive = nav.classList.contains("active");

	    toggleButton.setAttribute("aria-expanded", String(!isActive));

        if (isActive) {
            nav.classList.add("closing");
            setTimeout(() => {
                nav.classList.remove("active", "closing");
            }, 300);
        } else {
            nav.classList.add("active");
        }
    });

    /**********************************/
    /* Animation for the hero buttons */
    /**********************************/
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
    /* GET PROYECTS */
    /****************/
    controller.getProjects();

});