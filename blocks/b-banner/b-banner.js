export default function decorate(block) {
  const [title, description, primaryCta, secondaryCta] = [...block.children];
  const content = document.createElement('div');
  content.className = 'b-banner-content';

  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title.textContent;
    content.appendChild(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent;
    content.appendChild(p);
  }

  const buttons = document.createElement('div');
  buttons.className = 'b-banner-buttons';

  if (primaryCta) {
    const link = primaryCta.querySelector('a');
    if (link) {
      const primaryLink = document.createElement('a');
      primaryLink.href = link.href;
      primaryLink.textContent = link.textContent;
      primaryLink.className = 'cta';
      buttons.appendChild(primaryLink);
    }
  }

  if (secondaryCta) {
    const link = secondaryCta.querySelector('a');
    if (link) {
      const secondaryLink = document.createElement('a');
      secondaryLink.href = link.href;
      secondaryLink.textContent = link.textContent;
      secondaryLink.className = 'secondary-cta';
      buttons.appendChild(secondaryLink);
    }
  }

  if (buttons.children.length) {
    content.appendChild(buttons);
  }

  block.textContent = '';
  block.appendChild(content);
}
