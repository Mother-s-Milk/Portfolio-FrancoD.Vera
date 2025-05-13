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

    /**/
    const starsContainer = document.querySelector('.stars-container');
    const shootingStar = document.querySelector('.shooting-star');

    // Estrellas normales
    const numStars = 120;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      starsContainer.appendChild(star);
    }

    // Estrella fugaz ocasional
    /*function launchShootingStar() {
      shootingStar.style.opacity = 1;
      shootingStar.style.top = `${Math.random() * 20 + 10}%`;
      shootingStar.style.left = `${Math.random() * 20 + 10}%`;

      shootingStar.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: 'translate(300px, 100px)', opacity: 0 }
      ], {
        duration: 1200,
        easing: 'ease-out',
        fill: 'forwards'
      });

      setTimeout(() => {
        shootingStar.style.opacity = 0;
      }, 1300);
    }

    // Disparar cada 10-20 segundos aleatoriamente
    setInterval(() => {
      if (Math.random() > 0.5) launchShootingStar();
    }, 10000);*/

    /*******/
    /*Three*/
    /*******/
    // Escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 500;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // ========== Iluminación ==========
    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 50, 100);
    scene.add(light);

    // ========== Estrellas ==========
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 2000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // ========== Luna ==========
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('img/textura-luna.jpg');
    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(50, 64, 64),
        new THREE.MeshStandardMaterial({ map: moonTexture })
    );
    moon.position.set(0, 0, 0);
    scene.add(moon);

    // ========== Interacción ==========
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ========== Animación ==========
    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.y = scrollY * 0.001;

      camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();


    /*const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const loader = new THREE.TextureLoader();

    // ESTRELLAS
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starVertices = [];
    for (let i = 0; i < starCount; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    //camera.position.z = 100;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      starField.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animate();*/
});