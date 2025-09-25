import { service } from "./service.js";

export const controller = {
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

            let repoLink = "";
            if (element.repository && element.repository !== "private") {
            repoLink = `
                <a class="btn-github" href="${element.repository}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github-alt"></i>
                </a>
            `;
            }

            let newCard = `
                <article class="project-card" data-type="${element.type}">
                    <img class="project-img" src="${element.img}" alt="${element.title}">
                    <div class="project-card-content">
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
                            ${repoLink}
                        </div>
                    </div>
                </article>
            `;

            projectsMain.insertAdjacentHTML('beforeend', newCard);
        });
    }
}