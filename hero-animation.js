// hero-animation.js

export function setupHeroAnimation() {
    anime({
      targets: '#hero-title',
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeOutElastic(1, .8)'
    });
  }
  