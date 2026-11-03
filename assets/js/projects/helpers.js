import { TECH_ICONS, TYPE_LABELS } from "./constants.js";
// ── Helpers ───────────────────────────────────────────
function buildTechTag(tech) {
    const key = tech.toLowerCase();
    const meta = TECH_ICONS[key] || { family: 'fa-solid', icon: 'fa-circle-question' };
    return `<span class="tag-${key}">
    <i class="${meta.family} ${meta.icon}" aria-hidden="true"></i>${tech.toUpperCase()}
  </span>`;
}

function buildRepoLink(repo) {
    if (!repo || repo === 'private') return '';
    return `<a class="card__action btn-github" href="${repo}" title="Ver repositorio" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github-alt" aria-hidden="true"></i>
    </a>`;
}

function buildSiteLink(site, title) {
    if (!site || site === '#' || site === '') return '';
    return `<a class="card__action btn-site" href="${site}" title="Ver sitio de ${title}" target="_blank" rel="noopener noreferrer">
        <i class="fa-solid fa-link" aria-hidden="true"></i>
    </a>`;
}

export function buildCard(project) {
    const techs = project.technologies.map(buildTechTag).join('');
    const repo = buildRepoLink(project.repository);
    const site = buildSiteLink(project.site, project.title);
    const badge = TYPE_LABELS[project.type] ?? project.type;

    const links = (site || repo)
        ? `<div class="card__actions">${site}${repo}</div>`
        : '';

    return `<article class="project__card" data-type="${project.type}">
        <img class="project__img" src="assets/img/${project.img}" alt="Captura del proyecto ${project.title}" loading="lazy">
        <div class="card__info">
            <span class="project-type-badge badge-${project.type}">${badge}</span>
            <div class="card__heading">
                <h3 class="card__title">${project.title}</h3>
                <p class="card__desc">${project.description}</p>
            </div>
            <div class="card__technologies">${techs}</div>
            ${links}
        </div>
        </div>
    </article>`;
}