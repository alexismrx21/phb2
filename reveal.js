// Apparition des cartes au scroll (secteurs d'expertise + agences)
(function () {
  const cards = document.querySelectorAll('.expertises__grid .card, .agences__list .agence');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  // Respecte le réglage "réduire les animations" du système
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach((card) => card.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // l'animation ne se joue qu'une fois
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => observer.observe(card));
})();
