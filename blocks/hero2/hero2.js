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

  const title = block.querySelector('h1');
  if (title) {
    title.style.color = '#F5F1E5';
    title.style.fontFamily = 'Fraunces, serif';
    title.style.fontSize = '78px';
    title.style.lineHeight = '104%';
  }

  const subtitle = document.createElement('p');
  subtitle.textContent = 'HALLOWEEN · UN FUTURO SIN SUSTOS';
  subtitle.style.color = '#C6EEC6';
  subtitle.style.fontFamily = 'Inter, sans-serif';
  subtitle.style.fontSize = '12px';
  subtitle.style.lineHeight = '14px';
  block.appendChild(subtitle);

  const description = document.createElement('p');
  description.textContent = 'Lo que asusta es seguir como siempre. Descubre cómo el sol y el viento pueden darle una nueva vida a tu energía, incluso en la noche más misteriosa del año.';
  description.style.color = '#AEBCB0';
  description.style.fontFamily = 'Inter, sans-serif';
  description.style.fontSize = '17px';
  description.style.lineHeight = '28px';
  block.appendChild(description);

  block.style.position = 'relative';
  block.style.padding = '40px 24px';
  block.style.minHeight = '662px';
  block.style.backgroundColor = '#000000';
}
// Ajuste menor: comentario añadido para forzar el push