import { service } from "./service.js";
import { VISIBLE_INITIAL, LOAD_MORE_STEP } from "./constants.js";
import { buildCard } from "./helpers.js";

let allProjects = [];
let activeFilter = 'all';
let visibleCount = VISIBLE_INITIAL;

export const controller = {
    init: () => {
        service.getProjects()
            .then(projects => {
                allProjects = projects;
                controller.renderProjects();
                controller.initListeners();
            })
            .catch(error => console.error('Error al cargar los proyectos: ', error));
    },

    renderProjects: () => {
        const container = document.getElementById('projectsCards');
        const btnMore = document.getElementById('btnShowMore');

        const filtered = activeFilter === 'all'
            ? allProjects
            : allProjects.filter(p => p.type === activeFilter);

        const visible = filtered.slice(0, visibleCount);
        container.innerHTML = visible.map(buildCard).join('');

        const hayMas = visibleCount < filtered.length;
        const estaExpandido = visibleCount > VISIBLE_INITIAL;

        if (!hayMas && !estaExpandido) {
            // Menos de VISIBLE_INITIAL proyectos en total: ocultar botón
            btnMore.classList.add('hidden');
        } else {
            btnMore.classList.remove('hidden');
            btnMore.classList.toggle('expanded', !hayMas);
            btnMore.innerHTML = hayMas
                ? 'Ver más proyectos <i class="fa-solid fa-chevron-down"></i>'
                : 'Ver menos <i class="fa-solid fa-chevron-up"></i>';
        }
    },

    initListeners: () => {
        document.querySelectorAll('.project__filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.project__filter')
                    .forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                activeFilter = btn.dataset.filter;
                visibleCount = VISIBLE_INITIAL;
                controller.renderProjects();
            });
        });

        document.getElementById('btnShowMore').addEventListener('click', () => {
            const filtered = activeFilter === 'all'
                ? allProjects
                : allProjects.filter(p => p.type === activeFilter);

            if (visibleCount >= filtered.length) {
                visibleCount = VISIBLE_INITIAL;  // colapsa
            } else {
                visibleCount += LOAD_MORE_STEP;  // expande
            }

            controller.renderProjects();
        });
    }
};