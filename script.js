const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxVideo = document.querySelector('[data-lightbox-video]');
const lightboxTitle = document.querySelector('[data-lightbox-title]');

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  nav.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    cards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const isVideo = Boolean(card.dataset.video);
    lightbox.classList.toggle('is-video', isVideo);

    if (isVideo) {
      lightboxVideo.src = card.dataset.video;
      lightboxVideo.load();
    } else {
      lightboxImage.src = card.dataset.image;
      lightboxImage.alt = card.querySelector('img').alt;
    }

    lightboxTitle.textContent = card.dataset.title;
    lightbox.showModal();

    if (isVideo) lightboxVideo.play().catch(() => {});
  });
});

const closeLightbox = () => lightbox.close();

document.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightbox.addEventListener('close', () => {
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.load();
  lightboxImage.removeAttribute('src');
  lightbox.classList.remove('is-video');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  observer.observe(element);
});
