export default function decorate(block) {
  const [titleRow, subtitleRow, primaryCtaRow, secondaryCtaRow] = [...block.children];

  const title = titleRow?.textContent || '';
  const subtitle = subtitleRow?.textContent || '';
  const primaryCta = primaryCtaRow?.querySelector('a');
  const secondaryCta = secondaryCtaRow?.querySelector('a');

  block.innerHTML = '';

  const titleElement = document.createElement('h1');
  titleElement.textContent = title;
  block.appendChild(titleElement);

  const subtitleElement = document.createElement('p');
  subtitleElement.textContent = subtitle;
  block.appendChild(subtitleElement);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons';

  if (primaryCta) {
    primaryCta.className = 'button-primary';
    buttonsContainer.appendChild(primaryCta);
  }

  if (secondaryCta) {
    secondaryCta.className = 'button-secondary';
    buttonsContainer.appendChild(secondaryCta);
  }

  block.appendChild(buttonsContainer);
}