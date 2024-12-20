// Crear el lienzo (canvas) dentro del div de fondo
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.space-background').appendChild(canvas);

// Configuración inicial del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array para las estrellas
let stars = [];

// Función para generar las estrellas
function createStars() {
    stars = []; // Reinicia las estrellas existentes
    for (let i = 0; i < 100; i++) { // 200 estrellas
        stars.push({
            x: Math.random() * canvas.width, // Posición horizontal aleatoria
            y: Math.random() * canvas.height, // Posición vertical aleatoria
            radius: Math.random() * 1.5 + 0.5, // Tamaño de la estrella (más pequeñas o grandes)
            speed: Math.random() * 0.3 + 0.1, // Velocidad de desplazamiento
            opacity: Math.random() * 0.5 + 0.5, // Opacidad de la estrella
        });
    }
}

// Dibujar las estrellas en el lienzo
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, 0.3)`; // Color blanco con opacidad
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // Dibujar cada estrella
        ctx.fill();
    });
}

// Animar las estrellas
function animateStars() {
    stars.forEach(star => {
        star.y += star.speed; // Desplazar la estrella hacia abajo

        // Si la estrella pasa el fondo, reiniciarla arriba (simulando el viaje por el espacio)
        if (star.y > canvas.height) {
            star.y = 0; // Reiniciar en la parte superior
            star.x = Math.random() * canvas.width; // Nueva posición horizontal
            star.opacity = Math.random() * 0.5 + 0.5; // Nueva opacidad
        }
    });

    drawStars(); // Redibujar estrellas
    requestAnimationFrame(animateStars); // Llamada recursiva
}

// Ajustar el tamaño del lienzo al redimensionar la ventana
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars(); // Regenerar estrellas
});

// Inicializar la animación
createStars();
animateStars();




// Función para copiar el correo al portapapeles y mostrar el modal
function copyEmail(event) {
  event.preventDefault(); // Evita que el enlace realice alguna acción

  const email = "francoveradrms@gmail.com"; // Dirección de correo
  // Crea un elemento temporal de input
  const tempInput = document.createElement('input');
  // Establece el valor del input al correo
  tempInput.value = email;
  // Añade el input al DOM
  document.body.appendChild(tempInput);
  // Selecciona el contenido del input
  tempInput.select();
  // Copia el contenido al portapapeles
  document.execCommand('copy');
  // Elimina el input temporal del DOM
  document.body.removeChild(tempInput);

  // Obtener la posición del botón clickeado
  const button = event.target.closest('a'); // Encuentra el botón que fue clickeado
  const buttonRect = button.getBoundingClientRect(); // Obtener las coordenadas del botón

  // Muestra el modal
  const modal = document.getElementById("emailModal");
  modal.style.display = "block"; // Muestra el modal
  modal.style.left = `${buttonRect.left + window.scrollX}px`; // Posiciona el modal en el eje X
  modal.style.top = `${buttonRect.bottom + window.scrollY - 100}px`; // Posiciona el modal en el eje Y, justo debajo del botón

  // Hace visible el modal con animación
  setTimeout(function() {
    modal.style.opacity = 1; // Hace visible el modal
    modal.style.transform = "translateY(0)"; // Desliza el modal hacia arriba
  }, 10); // Necesitamos un pequeño retraso para activar la transición

  // Cierra el modal después de 3 segundos
  setTimeout(closeModal, 5000);
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("emailModal");
  modal.style.opacity = 0; // Desvanece el modal
  modal.style.transform = "translateY(30px)"; // Desliza el modal hacia abajo

  // Después de que la animación termine, ocultamos completamente el modal
  setTimeout(function() {
    modal.style.display = "none";
  }, 600); // Espera a que la animación de desvanecimiento termine
}
