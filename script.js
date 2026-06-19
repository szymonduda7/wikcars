// Mobilne menu
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});

// Zamknij menu po kliknięciu w link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Rok w stopce
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Galeria — karuzela ===== */
// Zdjęcia przeplatane: raz wnętrze/tapicerka, raz auto z zewnątrz
const galleryImages = [
  { src: 'images/10.webp', alt: 'Wyczyszczona tapicerka tylnej kanapy' },
  { src: 'images/1.webp',  alt: 'Dacia Duster po myciu — widok z zewnątrz' },
  { src: 'images/11.webp', alt: 'Czyste wnętrze Renault Megane' },
  { src: 'images/2.webp',  alt: 'Mercedes klasy C po czyszczeniu — z zewnątrz' },
  { src: 'images/12.webp', alt: 'Odświeżone wnętrze Fiata Punto' },
  { src: 'images/3.webp',  alt: 'BMW serii 3 po detailingu — z zewnątrz' },
  { src: 'images/13.webp', alt: 'Tapicerka skórzana — tylna kanapa Mercedesa' },
  { src: 'images/4.webp',  alt: 'Volkswagen Golf po myciu — z zewnątrz' },
  { src: 'images/14.webp', alt: 'Wyczyszczone wnętrze i fotele Mercedesa' },
  { src: 'images/5.webp',  alt: 'BMW X5 po czyszczeniu — z zewnątrz' },
  { src: 'images/15.webp', alt: 'Skórzana tapicerka BMW — tylna kanapa' },
  { src: 'images/6.webp',  alt: 'Skoda Scala po detailingu — z zewnątrz' },
  { src: 'images/16.webp', alt: 'Czysty kokpit i wnętrze Skody' },
  { src: 'images/8.webp',  alt: 'Ford Ka po myciu — z zewnątrz' },
  { src: 'images/7.webp',  alt: 'Wypolerowany reflektor — efekt po renowacji' },
  { src: 'images/9.webp',  alt: 'Mercedes klasy A po czyszczeniu — z zewnątrz' },
];

(function initCarousel() {
  const slidesEl = document.getElementById('carSlides');
  const thumbsEl = document.getElementById('carThumbs');
  const counterEl = document.getElementById('carCounter');
  const prevBtn = document.getElementById('carPrev');
  const nextBtn = document.getElementById('carNext');
  if (!slidesEl || !thumbsEl) return;

  let current = 0;
  const total = galleryImages.length;

  galleryImages.forEach((img, i) => {
    const slide = document.createElement('img');
    slide.className = 'car-slide';
    slide.src = img.src;
    slide.alt = img.alt;
    slide.loading = i === 0 ? 'eager' : 'lazy';
    if (i === 0) slide.classList.add('active');
    slidesEl.appendChild(slide);

    const thumb = document.createElement('button');
    thumb.className = 'car-thumb' + (i === 0 ? ' active' : '');
    thumb.setAttribute('aria-label', 'Pokaż zdjęcie ' + (i + 1));
    const tImg = document.createElement('img');
    tImg.src = img.src;
    tImg.alt = '';
    tImg.loading = 'lazy';
    thumb.appendChild(tImg);
    thumb.addEventListener('click', () => goTo(i));
    thumbsEl.appendChild(thumb);
  });

  const slides = slidesEl.querySelectorAll('.car-slide');
  const thumbs = thumbsEl.querySelectorAll('.car-thumb');

  function goTo(i) {
    current = (i + total) % total;
    slides.forEach((s, n) => s.classList.toggle('active', n === current));
    thumbs.forEach((t, n) => t.classList.toggle('active', n === current));
    counterEl.textContent = (current + 1) + ' / ' + total;
    const active = thumbs[current];
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Przesuwanie palcem (swipe) na mobile
  let startX = null;
  slidesEl.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slidesEl.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
