const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const filterButtons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-card');
const gallery = document.querySelector('[data-gallery]');
const filterBar = document.querySelector('[data-filter-bar]');
const seeAllButton = document.querySelector('[data-see-all]');
const pagination = document.querySelector('[data-pagination]');
const previousPageButton = document.querySelector('[data-page-prev]');
const nextPageButton = document.querySelector('[data-page-next]');
const pageStatus = document.querySelector('[data-page-status]');
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

const projectsPerPage = 8;
let activeFilter = 'all';
let currentPage = 1;
let showingAllProjects = false;

const renderProjects = () => {
  const filteredCards = [...cards].filter(
    (card) => activeFilter === 'all' || card.dataset.category === activeFilter,
  );
  const pageCount = Math.max(1, Math.ceil(filteredCards.length / projectsPerPage));
  currentPage = Math.min(currentPage, pageCount);
  const visiblePage = filteredCards.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage,
  );

  cards.forEach((card) => {
    const visible = showingAllProjects
      ? visiblePage.includes(card)
      : card.hasAttribute('data-highlight');
    card.classList.toggle('is-hidden', !visible);
  });

  gallery.classList.toggle('is-highlights', !showingAllProjects);
  filterBar.hidden = !showingAllProjects;
  seeAllButton.hidden = showingAllProjects;
  pagination.hidden = !showingAllProjects || pageCount <= 1;
  pageStatus.textContent = `Page ${currentPage} of ${pageCount}`;
  previousPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === pageCount;
};

const showProjectPage = (page) => {
  currentPage = page;
  renderProjects();
  gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    currentPage = 1;
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    renderProjects();
  });
});

seeAllButton.addEventListener('click', () => {
  showingAllProjects = true;
  currentPage = 1;
  renderProjects();
});

previousPageButton.addEventListener('click', () => showProjectPage(currentPage - 1));
nextPageButton.addEventListener('click', () => showProjectPage(currentPage + 1));

renderProjects();

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
