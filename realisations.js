// Page Réalisations : livres de projets dans une bibliothèque, filtres
// et visionneuse où l'on tourne les pages.
(function () {
  // ===== Liste des projets =====
  // categorie : "hotellerie", "restauration" ou "immobilier"
  // lieu : facultatif (laisser '' s'il n'est pas connu)
  // images : une entrée par page du livre.
  //   - 'photo.jpg'               → une photo seule sur la page
  //   - ['photo1.jpg', 'photo2.jpg'] → deux photos l'une au-dessus de l'autre (idéal pour les photos en largeur)
  // couverture : photo de la couverture, reprise seule sur la page à côté de la description
  //   (ne pas la remettre dans images).
  // couverturePosition : facultatif, quelle partie de la photo garder sur la couverture
  //   (ex. 'center 85%' : on garde le bas, on coupe le haut).
  const PROJETS = [
    {
      titre: 'VF Architecture',
      lieu: '',
      categorie: 'immobilier',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/vf-architecture/couverture.jpg', // photo de couverture (n'apparaît pas dans le livre)
      images: [
        ['assets/realisations/vf-architecture/01.jpg', 'assets/realisations/vf-architecture/03.jpg'],
        ['assets/realisations/vf-architecture/04.jpg', 'assets/realisations/vf-architecture/05.jpg'],
        ['assets/realisations/vf-architecture/06.jpg', 'assets/realisations/vf-architecture/07.jpg'],
        ['assets/realisations/vf-architecture/09.jpg', 'assets/realisations/vf-architecture/11.jpg'],
        'assets/realisations/vf-architecture/08.jpg',
        'assets/realisations/vf-architecture/10.jpg',
        ['assets/realisations/vf-architecture/12.jpg', 'assets/realisations/vf-architecture/13.jpg'],
        ['assets/realisations/vf-architecture/14.jpg', 'assets/realisations/vf-architecture/15.jpg'],
      ],
    },
    {
      titre: 'Luteca',
      lieu: '',
      categorie: 'restauration',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/luteca/01.jpg',
      images: [
        'assets/realisations/luteca/03.jpg',
        'assets/realisations/luteca/02.jpg',
        'assets/realisations/luteca/04.jpg',
        'assets/realisations/luteca/05.jpg',
      ],
    },
    {
      titre: 'Projet 5', // NOM À CONFIRMER
      lieu: '',
      categorie: 'immobilier',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/projet-5/01.jpg',
      images: [
        ['assets/realisations/projet-5/02.jpg', 'assets/realisations/projet-5/03.jpg'],
        'assets/realisations/projet-5/04.jpg',
        'assets/realisations/projet-5/05.jpg',
        ['assets/realisations/projet-5/06.jpg', 'assets/realisations/projet-5/07.jpg'],
      ],
    },
    {
      titre: 'Norman',
      lieu: '',
      categorie: 'hotellerie',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/norman/05.jpg',
      images: [
        'assets/realisations/norman/02.jpg',
        ['assets/realisations/norman/03.jpg', 'assets/realisations/norman/04.jpg'],
        'assets/realisations/norman/01.jpg',
        'assets/realisations/norman/06.jpg',
      ],
    },
    {
      titre: 'Projet 3', // NOM À CONFIRMER
      lieu: '',
      categorie: 'hotellerie',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/projet-3/01.jpg',
      images: [
        'assets/realisations/projet-3/02.jpg',
        'assets/realisations/projet-3/03.jpg',
        'assets/realisations/projet-3/04.jpg',
        'assets/realisations/projet-3/05.jpg',
      ],
    },
    {
      titre: 'Projet 4', // NOM À CONFIRMER
      lieu: '',
      categorie: 'restauration',
      texte: 'Texte de présentation du projet à venir : le contexte, la demande du client et les pièces réalisées par PHB70.',
      couverture: 'assets/realisations/projet-4/01.jpg',
      images: [
        ['assets/realisations/projet-4/02.jpg', 'assets/realisations/projet-4/03.jpg'],
        'assets/realisations/projet-4/05.jpg',
        'assets/realisations/projet-4/04.jpg',
        'assets/realisations/projet-4/06.jpg',
      ],
    },
  ];

  const CATEGORIES = {
    hotellerie: 'Hôtellerie',
    restauration: 'Restauration',
    immobilier: 'Immobilier de prestige',
  };

  const esc = (str) => String(str).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ===== Couverture d'un livre (même dessin dans la bibliothèque et dans la visionneuse) =====
  // Tous les livres ont une couverture crème (aussi dans la visionneuse)
  function coverHTML(p) {
    return `
      <span class="cover cover--creme">
        <span class="cover__eyebrow">${esc(CATEGORIES[p.categorie])}</span>
        <span class="cover__photo"><img src="${esc(p.couverture || [].concat(p.images[0])[0])}" alt="" loading="lazy"${p.couverturePosition ? ` style="object-position: ${esc(p.couverturePosition)}"` : ''}></span>
        <span class="cover__title">${esc(p.titre)}</span>
        <span class="cover__place">${p.lieu ? esc(p.lieu) : '&nbsp;'}</span>
      </span>`;
  }

  // ===== Génération des livres =====
  document.querySelector('.books--cabinet').innerHTML = PROJETS.map((p, i) => `
      <div class="book-item" data-cat="${p.categorie}">
        <button class="book" type="button" data-index="${i}" aria-label="Ouvrir le livre : ${esc(p.titre)}">
          <span class="book__body">
            ${coverHTML(p)}
          </span>
        </button>
      </div>`).join('');

  // ===== Filtres par secteur =====
  const filterBtns = document.querySelectorAll('.filters__btn');
  const filterList = document.querySelector('.filters__list');
  const ink = document.querySelector('.filters__ink');

  // Trait qui glisse sous le secteur choisi
  function moveInk() {
    const active = filterList.querySelector('.filters__btn.is-active .filters__name');
    if (!active) return;
    const listBox = filterList.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    ink.style.width = `${box.width}px`;
    ink.style.transform = `translateX(${box.left - listBox.left + filterList.scrollLeft}px)`;
  }

  function applyFilter(cat) {
    filterBtns.forEach((b) => {
      const active = b.dataset.filter === cat;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active);
      if (active && filterList.scrollWidth > filterList.clientWidth) {
        b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    });
    moveInk();
    document.querySelectorAll('.book-item').forEach((item) => {
      item.hidden = cat !== 'tous' && item.dataset.cat !== cat;
    });
    layoutCabinet();
  }
  filterBtns.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  window.addEventListener('resize', moveInk);
  // une fois la police chargée, les largeurs de texte sont justes
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    moveInk();
    requestAnimationFrame(() => ink.classList.add('is-ready'));
  });

  // ===== Bibliothèque en noyer : étagères continues =====
  // Chaque livre porte son morceau d'étagère. On indique à chacun sa colonne
  // (pour que le veinage du bois continue d'un livre à l'autre) et, au dernier
  // livre, combien de cases vides il reste pour prolonger l'étagère jusqu'au bout.
  function layoutCabinet() {
    const cabinet = document.querySelector('.books--cabinet');
    const cols = getComputedStyle(cabinet).gridTemplateColumns.split(' ').length;
    const visible = [...cabinet.querySelectorAll('.book-item')].filter((it) => !it.hidden);
    const lastRow = Math.floor((visible.length - 1) / cols);
    visible.forEach((it, k) => {
      it.style.setProperty('--col', k % cols);
      // pas d'ombre sous la dernière étagère : c'est le bas du meuble
      it.style.setProperty('--shade', Math.floor(k / cols) === lastRow ? 0 : 1);
      // dernière rangée : pas d'étagère, les livres sont posés sur le bas du meuble
      it.classList.toggle('is-last-row', Math.floor(k / cols) === lastRow);
      it.style.setProperty('--fill', k === visible.length - 1 ? cols - 1 - (k % cols) : 0);
    });
  }
  window.addEventListener('resize', layoutCabinet);
  layoutCabinet(); // dès le chargement de la page

  // Filtre direct depuis un lien, ex. realisations.html?secteur=hotellerie
  const fromUrl = new URLSearchParams(location.search).get('secteur');
  if (fromUrl && CATEGORIES[fromUrl]) applyFilter(fromUrl);

  // ===== Visionneuse : livre en grand, pages qui se tournent =====
  const viewer = document.getElementById('viewer');
  const book = viewer.querySelector('.flipbook');
  const titleEl = viewer.querySelector('.viewer__title');
  const countEl = viewer.querySelector('.viewer__count');
  const prevBtn = viewer.querySelector('.viewer__nav--prev');
  const nextBtn = viewer.querySelector('.viewer__nav--next');
  const closeBtn = viewer.querySelector('.viewer__close');
  let leaves = [];
  let current = 0; // nombre de feuilles déjà tournées
  let lastFocus = null;
  let sourceBook = null; // livre cliqué dans la bibliothèque (masqué pendant que le livre est ouvert)
  let autoTurn = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OPEN_MS = 750;   // durée de l'agrandissement du livre
  const VIEWER_BG = 'rgba(36, 34, 31, 0.97)';

  // Contenu de chaque page du livre
  function buildPages(p) {
    const pages = [];
    pages.push(`<div class="page page--cover">${coverHTML(p)}</div>`);
    pages.push(`
      <div class="page page--intro">
        <p class="page__eyebrow">${esc(CATEGORIES[p.categorie])}</p>
        <h2 class="page__title">${esc(p.titre)}</h2>
        ${p.lieu ? `<p class="page__place">${esc(p.lieu)}</p>` : ''}
        <span class="page__line" aria-hidden="true"></span>
        <p class="page__text">${esc(p.texte)}</p>
      </div>`);
    // Page de droite, face à la description : la photo de couverture, seule
    const coverSrc = p.couverture || [].concat(p.images[0])[0];
    pages.push(`<div class="page page--photo"><img src="${esc(coverSrc)}" alt="" loading="lazy"></div>`);
    p.images.forEach((entry) => {
      const srcs = [].concat(entry); // une photo ou deux photos sur la page
      const imgs = srcs.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join('');
      pages.push(`<div class="page page--photo${srcs.length > 1 ? ' page--photo-2' : ''}">${imgs}</div>`);
    });
    // Nombre de pages pair, puis 4e de couverture
    if (pages.length % 2 === 0) pages.push('<div class="page page--blank"></div>');
    pages.push('<div class="page page--back"><img src="assets/logo.png" alt="PHB70"></div>');
    // Numéros de page (hors couvertures)
    // (chaque page est un seul <div> : on ajoute le numéro juste avant sa fermeture)
    return pages.map((html, i) => {
      if (i === 0 || i === pages.length - 1 || html.includes('page--blank')) return html;
      const h = html.trim();
      return `${h.slice(0, -'</div>'.length)}<span class="page__num">${i}</span></div>`;
    });
  }

  function render() {
    const n = leaves.length;
    leaves.forEach((leaf, i) => {
      const flipped = i < current;
      leaf.classList.toggle('is-flipped', flipped);
      leaf.style.zIndex = flipped ? i + 1 : n - i;
    });
    // Livre fermé : on le centre sur la couverture (ou sur la 4e de couverture)
    book.classList.toggle('is-closed-front', current === 0);
    book.classList.toggle('is-closed-back', current === n);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === n;
    const total = n * 2;
    countEl.textContent = current === 0 ? 'Couverture'
      : current === n ? 'Fin'
      : `Pages ${current * 2 - 1}–${current * 2} / ${total - 2}`;
  }

  function turn(dir) {
    const n = leaves.length;
    const target = current + dir;
    if (target < 0 || target > n) return;
    // La feuille qui tourne passe au-dessus des autres pendant l'animation
    const leaf = leaves[dir > 0 ? current : current - 1];
    current = target;
    render();
    leaf.style.zIndex = n + 2;
    clearTimeout(leaf._t);
    leaf._t = setTimeout(render, 900);
  }

  // Ouverture : le livre part de sa place dans la bibliothèque et s'agrandit
  // jusqu'au centre de l'écran, puis s'ouvre tout seul sur la première double page.
  function open(index, srcEl) {
    const p = PROJETS[index];
    const pages = buildPages(p);
    book.innerHTML = '';
    leaves = [];
    for (let i = 0; i < pages.length; i += 2) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.innerHTML = `
        <div class="leaf__face leaf__front">${pages[i]}</div>
        <div class="leaf__face leaf__back">${pages[i + 1]}</div>`;
      // Clic sur une page de droite : on avance ; de gauche : on recule
      leaf.querySelector('.leaf__front').addEventListener('click', () => turn(1));
      leaf.querySelector('.leaf__back').addEventListener('click', () => turn(-1));
      book.appendChild(leaf);
      leaves.push(leaf);
    }
    current = 0;
    titleEl.textContent = `${p.titre} — ${CATEGORIES[p.categorie]}`;

    // Livre fermé, sans animation de position (il peut rester l'état du livre précédent)
    book.classList.add('no-anim');
    render();
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    void book.offsetWidth; // applique l'état fermé tout de suite
    book.classList.remove('no-anim');
    closeBtn.focus({ preventScroll: true });

    clearTimeout(autoTurn);
    const startTurn = () => { autoTurn = setTimeout(() => { if (current === 0) turn(1); }, 250); };

    const srcCover = srcEl && srcEl.querySelector('.cover');
    if (reduceMotion || !srcCover) {
      startTurn();
      return;
    }

    // Où se trouve le livre cliqué, et où se trouvera la couverture en grand
    const from = srcCover.getBoundingClientRect();
    const to = leaves[0].querySelector('.leaf__front').getBoundingClientRect();
    const stage = viewer.querySelector('.viewer__stage');
    const stageRect = stage.getBoundingClientRect();
    const scale = from.width / to.width;
    const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
    const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
    stage.style.transformOrigin = `${to.left + to.width / 2 - stageRect.left}px ${to.top + to.height / 2 - stageRect.top}px`;

    sourceBook = srcEl;
    sourceBook.style.visibility = 'hidden'; // le livre "sort" de la bibliothèque

    const ease = 'cubic-bezier(0.22, 0.8, 0.25, 1)';
    stage.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${scale})` }, { transform: 'none' }],
      { duration: OPEN_MS, easing: ease }
    );
    // une fois le livre arrivé au centre, il s'ouvre (minuterie : plus fiable que la fin d'animation)
    autoTurn = setTimeout(startTurn, OPEN_MS);
    viewer.animate(
      [{ backgroundColor: 'rgba(36, 34, 31, 0)' }, { backgroundColor: VIEWER_BG }],
      { duration: OPEN_MS, easing: 'ease' }
    );
    viewer.querySelectorAll('.viewer__top, .viewer__controls').forEach((el) => {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: OPEN_MS - 200, fill: 'backwards' });
    });
  }

  // Fermeture : fondu rapide, puis le livre reprend sa place dans la bibliothèque
  function close() {
    clearTimeout(autoTurn);
    const done = () => {
      viewer.hidden = true;
      document.body.style.overflow = '';
      if (sourceBook) sourceBook.style.visibility = '';
      sourceBook = null;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (reduceMotion) return done();
    viewer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' });
    setTimeout(() => {
      done();
      viewer.getAnimations().forEach((a) => a.cancel()); // remet l'opacité pour la prochaine ouverture
    }, 300);
  }

  document.querySelectorAll('.book').forEach((b) => {
    b.addEventListener('click', () => open(Number(b.dataset.index), b));
  });
  prevBtn.addEventListener('click', () => turn(-1));
  nextBtn.addEventListener('click', () => turn(1));
  closeBtn.addEventListener('click', close);
  // Clic sur le fond sombre : on ferme
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target.classList.contains('viewer__stage')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') turn(1);
    if (e.key === 'ArrowLeft') turn(-1);
    // Garde le focus clavier dans la visionneuse
    if (e.key === 'Tab') {
      const items = [closeBtn, prevBtn, nextBtn].filter((el) => !el.disabled);
      const idx = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(idx + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
})();
