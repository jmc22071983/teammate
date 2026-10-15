import { decorateBlock } from '../../scripts/aem.js';

export default function decorate(block) {
  const title = document.createElement('h1');
  title.className = 'b-hero-title';
  title.textContent = block.dataset.title || 'Título por defecto';
  block.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'b-hero-subtitle';
  subtitle.textContent = block.dataset.subtitle || 'Subtítulo por defecto';
  block.appendChild(subtitle);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'b-hero-buttons';

  const primaryButton = document.createElement('button');
  primaryButton.className = 'b-hero-button b-hero-button-primary';
  primaryButton.textContent = block.dataset.primaryButtonText || 'Botón Primario';
  buttonsContainer.appendChild(primaryButton);

  const secondaryButton = document.createElement('button');
  secondaryButton.className = 'b-hero-button b-hero-button-secondary';
  secondaryButton.textContent = block.dataset.secondaryButtonText || 'Botón Secundario';
  buttonsContainer.appendChild(secondaryButton);

  block.appendChild(buttonsContainer);
  decorateBlock(block);
}