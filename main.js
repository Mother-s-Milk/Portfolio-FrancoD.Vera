/*import { setupCanvasStars } from './canvas-stars.js';
import { setupCopyEmail } from './copy-email.js';
import { setupBlobs } from './blobs-animation.js';
import { setupHeroAnimation } from './hero-animation.js';*/

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
    /*setupCanvasStars();    // Asegúrate de que esta función esté definida
    setupCopyEmail();      // Asegúrate de que esta función esté definida
    setupBlobs();          // Asegúrate de que esta función esté definida
    setupHeroAnimation();  // Asegúrate de que esta función esté definida
  
    anime({
      targets: '.skill-bubble',
      translateY: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    });
  
    // Movimiento flotante de burbujas
    function floatSkills() {
      anime({
        targets: '.skill-bubble',
        translateY: [
          { value: '-10', duration: 2000 },
          { value: '10', duration: 2000 }
        ],
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  
    floatSkills(); // Llamada a la animación de flotación de burbujas
  
    // 1. Crear escena, cámara y renderer de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('skills-canvas').appendChild(renderer.domElement);
  
    camera.position.z = 20;
  
    // 2. Crear array de skills
    const skills = [
      'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'React', 'Node.js', 'Git',
      'Sass', 'MongoDB', 'TypeScript', 'Next.js', 'Docker'
    ];
  
    const skillMeshes = [];
  
    const createSkillText = (text) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 256;
      context.fillStyle = '#ffffff';
      context.font = 'bold 48px sans-serif';
      context.textAlign = 'center';
      context.fillText(text, canvas.width / 2, canvas.height / 2 + 16);
  
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(4, 2, 1); // Tamaño del texto
  
      return sprite;
    };
  
    // 3. Crear cada skill en posiciones aleatorias
    skills.forEach(skill => {
      const skillMesh = createSkillText(skill);
      skillMesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      scene.add(skillMesh);
      skillMeshes.push(skillMesh);
    });
  
    // 4. Animar entrada con anime.js
    anime({
      targets: skillMeshes,
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: 2000,
      easing: 'easeOutElastic(1, .5)'
    });
  
    // 5. Rotar la escena lentamente
    function animate() {
      requestAnimationFrame(animate);
  
      // Animación de rotación de la escena
      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;
  
      renderer.render(scene, camera);
    }
  
    animate(); // Iniciar animación de la escena

    // 6. Responsive
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });*/

});