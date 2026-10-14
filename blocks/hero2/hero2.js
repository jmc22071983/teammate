export default function decorate(block) {
  const title = document.createElement('h1');
  title.className = 'hero2-title';
  title.textContent = 'La energía del futuro no da miedo.';

  const description = document.createElement('p');
  description.className = 'hero2-description';
  description.textContent = 'Descubre cómo el sol y el viento pueden darle una nueva vida a tu energía.';

  const button = document.createElement('button');
  button.className = 'hero2-button';
  button.textContent = 'Activa el cambio';

  block.append(title, description, button);
}