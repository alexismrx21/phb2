// Header du site (toutes les pages) :
// - page d'accueil : transparent sur le carrousel, voile crème flou dès qu'on scrolle
// - autres pages (data-solid) : voile crème flou dès le départ
// - se cache quand on descend, réapparaît quand on remonte
// Au rechargement, on revient toujours tout en haut de la page
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

(function () {
  const header = document.querySelector('.header--transparent');
  if (!header) return;

  const solid = header.hasAttribute('data-solid');
  const TOLERANCE = 5; // ignore les tout petits mouvements
  let lastY = window.scrollY;

  // Sur les pages sans carrousel, on décale le contenu
  // pour qu'il ne passe pas sous le header fixe
  function setOffset() {
    if (solid) document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  function update() {
    const y = window.scrollY;

    header.classList.toggle('is-scrolled', solid || y > 10);

    if (Math.abs(y - lastY) > TOLERANCE) {
      // On descend (et on a dépassé la hauteur du header) : on cache
      // On remonte : on affiche
      header.classList.toggle('is-hidden', y > lastY && y > header.offsetHeight);
      lastY = y;
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', setOffset);
  setOffset();
  update();
})();
