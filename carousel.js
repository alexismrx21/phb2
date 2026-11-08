// Carrousel de la page d'accueil
// Une barre par image : la barre de l'image affichée se remplit,
// et quand elle est pleine on passe à l'image suivante.
(function () {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel__slide');
  const barsContainer = carousel.querySelector('.carousel__dots');
  const DELAY = 3000; // durée d'affichage de chaque image (ms)
  let current = 0;

  carousel.style.setProperty('--carousel-delay', DELAY + 'ms');

  // Création d'une barre par image
  const bars = Array.from(slides, (_, i) => {
    const bar = document.createElement('button');
    bar.className = 'carousel__bar';
    bar.setAttribute('aria-label', 'Aller à l\'image ' + (i + 1));
    const fill = document.createElement('span');
    fill.className = 'carousel__fill';
    bar.appendChild(fill);
    bar.addEventListener('click', () => goTo(i));
    // Quand la barre active est pleine : image suivante
    fill.addEventListener('animationend', () => goTo(current + 1));
    barsContainer.appendChild(bar);
    return bar;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));

    bars.forEach((bar, i) => {
      bar.classList.remove('is-active');
      bar.classList.toggle('is-done', i < current);
    });

    // Relance l'animation de remplissage de la barre active
    void bars[current].offsetWidth;
    bars[current].classList.add('is-active');
  }

  goTo(0);
})();
