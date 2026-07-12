// Menú móvil
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contador animado de resultados (Óptica Rois)
const resultados = document.querySelectorAll('.resultado');
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const numEl = el.querySelector('.resultado__num');
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    numEl.textContent = value.toLocaleString('es-CL') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window && resultados.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  resultados.forEach(el => observer.observe(el));
}

// Filtro de trabajos publicados
const filtros = document.querySelectorAll('.filtro');
const despachos = document.querySelectorAll('.despacho');

filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    despachos.forEach(card => {
      const match = filter === 'todos' || card.dataset.cat === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});
