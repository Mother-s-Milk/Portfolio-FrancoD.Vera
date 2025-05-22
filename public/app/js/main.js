import { service } from "./service.js";

const controller = {
    getProjects: () => {
        service.getProjects()
            .then(response => {
                console.log('Proyectos cargados: ', response);
                controller.renderProyects(response)
            })
            .catch(error => console.log('Error al cargar los proyectos: ', error))
    },
    renderProyects: (projects) => {
        let projectsMain = document.getElementById('projects-main');

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
                    case 'javascript':
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
                <article class="project-card" data-tipo="${element.type}">
                    <div class="project-card-image">
                        <img src="${element.img}" alt="${element.tittle}">
                    </div>
                    <h1>${element.tittle}</h1>
                    <p>${element.description}</p>
                    <div class="project-card-technologies">
                        ${technologies}
                    </div>
                    <div class="repository-links">
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
    function ajustarAlturaHero() {
        const nav = document.querySelector('.principal-header');
        const hero = document.querySelector('.hero');
    
        if (nav && hero) {
            const navHeight = nav.offsetHeight;
            hero.style.minHeight = `calc(100vh - ${navHeight}px)`;
        }
    }
    
    // Ejecutar al cargar y al cambiar tamaño
    window.addEventListener('load', ajustarAlturaHero);
    window.addEventListener('resize', ajustarAlturaHero);

    /**/
    // Animación de entrada para los botones
    gsap.from(".buttons-hero a", {
      y: 75,
      opacity: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top center",
      }
    });

    /*Boton y barra de navegacion responsive*/
    /*let btnMenu = document.getElementById('btn-menu');
    if (btnMenu) {
        btnMenu.onclick = () => {
            let principalNav = document.querySelector('.principal-nav');
            principalNav.classList.toggle('show-menu');
        }
    }*/

    /**/
    controller.getProjects();
    /**/

    const sidebar = document.querySelector(".principal-nav");
    const toggleButton = document.getElementById("btn-menu");

    toggleButton.addEventListener("click", () => {
        // Alternar entre los estados 'collapsed' y 'expanded'
        if (sidebar.classList.contains("collapsed")) {
            sidebar.classList.remove("collapsed");
        } else {
            sidebar.classList.add("collapsed");
        }
    });
});