const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach(item => item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`));
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('is-visible'));

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (finePointer.matches && !reduceMotion.matches) {
  const bindTilt = (element, prefix, max = 2.5) => {
    element.addEventListener('pointermove', event => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      element.style.setProperty(`--${prefix}-tilt-x`, `${(x * max * 2).toFixed(2)}deg`);
      element.style.setProperty(`--${prefix}-tilt-y`, `${(-y * max * 2).toFixed(2)}deg`);
    });
    element.addEventListener('pointerleave', () => {
      element.style.removeProperty(`--${prefix}-tilt-x`);
      element.style.removeProperty(`--${prefix}-tilt-y`);
    });
  };
  document.querySelectorAll('.project-card').forEach(card => bindTilt(card, 'card', 1.4));
  const portrait = document.querySelector('.hero-visual');
  if (portrait) bindTilt(portrait, 'portrait', 1.7);
}
