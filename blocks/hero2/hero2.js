export default function decorate(block) {
  const title = block.querySelector('.title');
  const intro = block.querySelector('.intro');
  if (title) {
    title.style.color = 'var(--highlight-color)';
  }
  if (intro) {
    intro.style.color = 'var(--secondary-text-color)';
  }
}