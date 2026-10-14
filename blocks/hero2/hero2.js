export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      img.alt = block.dataset.alt || '';
    }
  }

  const text = block.querySelector('h1');
  if (text) {
    text.textContent = block.dataset.text || '';
  }
}