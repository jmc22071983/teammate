export default function decorate(block) {
  const image = block.querySelector('img');
  if (image) {
    const picture = document.createElement('picture');
    picture.style.position = 'absolute';
    picture.style.zIndex = '-1';
    picture.style.inset = '0';
    picture.style.objectFit = 'cover';
    picture.style.width = '100%';
    picture.style.height = '100%';
    picture.appendChild(image);
    block.prepend(picture);
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
