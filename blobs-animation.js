// blobs-animation.js

export function setupBlobs() {
    const blobs = document.querySelectorAll('.blob');
  
    blobs.forEach((blob) => {
      animateBlob(blob);
    });
  
    function animateBlob(el) {
      gsap.to(el, {
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-150, 150),
        duration: gsap.utils.random(4, 8),
        ease: "sine.inOut",
        onComplete: () => animateBlob(el)
      });
    }
  }
  