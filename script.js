const buttons = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.article-card[data-category]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      card.hidden = selected !== 'Todos' && card.dataset.category !== selected;
    });
  });
});
