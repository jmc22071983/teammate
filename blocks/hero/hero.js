export default function decorate(block) {
  const image = block.querySelector('img');
  if (image) {
    image.setAttribute('alt', 'Hero banner desde Figma');
    image.style.objectFit = 'cover';
    image.style.width = '100%';
    image.style.height = '100%';
  }

  const text = block.querySelector('h1');
  if (text) {
    text.style.color = '#F5F1E5';
    text.style.fontFamily = 'Fraunces, serif';
    text.style.fontSize = '78px';
    text.style.lineHeight = '104%';
  }

  block.style.position = 'relative';
  block.style.padding = '40px 24px';
  block.style.minHeight = '300px';
  block.style.backgroundColor = '#000000';
}
