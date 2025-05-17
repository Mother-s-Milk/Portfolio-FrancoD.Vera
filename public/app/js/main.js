import { mainService } from "./mainService.js";

const mainController = {
    proyectos: [],
    front: [],
    back: [],
    fullstack: [],
    obtenerProyectos: () => {
        mainService.obtenerProyectos()
            .then(response => {
                console.log('Response: ', response);
                mainController.mostrarProyectos(response);
            })
            .catch(error => {
                console.log('Error: ', error);
            })
    },
    mostrarProyectos: (proyectos) => {
        //console.log(proyectos);
        let mainProyectos = document.getElementById('main-proyectos');

        proyectos.forEach(element => {
            // Generar las tecnologías de forma dinámica
            let tecnologiasHTML = '';
            element.tecnologias.forEach(tec => {
                let iconClass = '';
                let iconFamily = '';

                switch (tec.toLowerCase()) {
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
                        iconClass = 'fa-circle-question'; // ícono genérico de "desconocido"
                }

                tecnologiasHTML += `
                    <span class="tag-${tec.toLowerCase()}">
                        <i class="${iconFamily} ${iconClass}"></i>${tec}
                    </span>
                `;
            });
            console.log(element);
            let nuevaTarjeta = `
                <article class="tarjeta-proyecto" data-tipo="${element.tipo}">
                    <div class="tarjeta-proyecto-imagen">
                        <img src="${element.imagen}" alt="${element.titulo}">
                    </div>
                    <h1>${element.titulo}</h1>
                    <p>${element.descripcion}</p>
                    <div class="tarjeta-proyecto-tecnologias">
                        ${tecnologiasHTML}
                    </div>
                    <div class="links-repositorio">
                        <a class="btn-sitio" href="${element.sitio}" title="Ver sitio web" rel="noopener noreferrer">
                            <i class="fa-solid fa-link"></i>
                        </a>
                        <a class="btn-github" href="${element.repositorio}" target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-github-alt"></i>
                        </a>
                    </div>
                </article>
            `;

            mainProyectos.insertAdjacentHTML('beforeend', nuevaTarjeta);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function ajustarAlturaHero() {
        const nav = document.querySelector('.principal-nav');
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
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top center",
      }
    });

    /*Boton y barra de navegacion responsive*/
    let btnMenu = document.getElementById('btn-menu');
    if (btnMenu) {
        btnMenu.onclick = () => {
            let principalNav = document.querySelector('.principal-nav');
            principalNav.classList.toggle('show-menu');
        }
    }

    /**/
    mainController.obtenerProyectos();
});