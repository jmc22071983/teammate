export default function decorate(block) {
  const [titleRow, subtitleRow, primaryCtaRow, secondaryCtaRow] = [...block.children];
  const content = document.createElement('div');
  content.className = 'b-hero-content';

  if (titleRow) {
    const title = document.createElement('h1');
    title.textContent = titleRow.textContent;
    content.appendChild(title);
  }

  if (subtitleRow) {
    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleRow.textContent;
    content.appendChild(subtitle);
  }

  const buttons = document.createElement('div');
  buttons.className = 'b-hero-buttons';

  if (primaryCtaRow) {
    const primaryLink = primaryCtaRow.querySelector('a');

    if (primaryLink) {
      const link = document.createElement('a');
      link.href = primaryLink.href;
      link.textContent = primaryLink.textContent;
      link.className = 'cta';
      buttons.appendChild(link);
    }
  }

  if (secondaryCtaRow) {
    const secondaryLink = secondaryCtaRow.querySelector('a');

    if (secondaryLink) {
      const link = document.createElement('a');
      link.href = secondaryLink.href;
      link.textContent = secondaryLink.textContent;
      link.className = 'secondary-cta';
      buttons.appendChild(link);
    }
  }

  if (buttons.children.length) {
    content.appendChild(buttons);
  }

  block.textContent = '';
  block.appendChild(content);
}
