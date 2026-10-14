export default function decorate(block) {
  const image = block.querySelector('img');
  const text = block.querySelector('h1');
  const intro = block.querySelector('p');

  if (image) {
    image.style.objectFit = 'cover';
    image.style.width = '100%';
    image.style.height = '100%';
  }

  if (text) {
    text.style.color = 'var(--background-color)';
    text.style.fontFamily = 'Fraunces';
    text.style.fontWeight = '600';
    text.style.fontSize = '78px';
    text.style.lineHeight = '104%';
  }

  if (intro) {
    intro.style.color = 'rgba(174, 189, 176, 1)';
    intro.style.fontFamily = 'Inter';
    intro.style.fontWeight = '400';
    intro.style.fontSize = '18px';
    intro.style.lineHeight = '150%';
  }
}