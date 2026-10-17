(() => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));

  const cards = [...document.querySelectorAll('.product-card')];
  const filters = [...document.querySelectorAll('.filter-chip')];
  const groups = {
    shawl: ['shawl', 'stole', 'muffler', 'textile', 'dhatu', 'dhaathu', 'rejta'],
    cap: ['cap'],
    clothing: ['sadri', 'sock', 'pullan', 'accessor', 'clothing', 'dhatu', 'dhaathu', 'rejta', 'muffler'],
    frame: ['frame', 'scenery', 'gallery-shop']
  };
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    cards.forEach(card => {
      const title = (card.dataset.title + ' ' + card.querySelector('img').getAttribute('src')).toLowerCase();
      const visible = filter === 'all' || (groups[filter] || []).some(word => title.includes(word));
      card.classList.toggle('hidden', !visible);
    });
  }));

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  function showImage(src, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = caption || 'Product photograph';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  }
  function closeImage() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    showImage(button.dataset.image, button.dataset.caption || button.querySelector('img')?.alt || '');
  }));
  document.getElementById('lightboxClose').addEventListener('click', closeImage);
  document.getElementById('lightboxBackdrop').addEventListener('click', closeImage);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox.classList.contains('open')) closeImage(); });
  document.getElementById('year').textContent = new Date().getFullYear();
})();