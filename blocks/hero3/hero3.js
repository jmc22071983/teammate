export default function decorate(block) {
  const [title, subtitle, cta, secondaryCta] = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero3-content';

  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title.textContent;
    content.appendChild(h1);
  }

  if (subtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = subtitle.textContent;
    content.appendChild(h2);
  }

  const buttons = document.createElement('div');
  buttons.className = 'hero3-buttons';

  if (cta) {
    const primaryLink = document.createElement('a');
    primaryLink.href = cta.querySelector('a').href;
    primaryLink.textContent = cta.querySelector('a').textContent;
    primaryLink.className = 'cta';
    buttons.appendChild(primaryLink);
  }

  if (secondaryCta) {
    const secondaryLink = document.createElement('a');
    secondaryLink.href = secondaryCta.querySelector('a').href;
    secondaryLink.textContent = secondaryCta.querySelector('a').textContent;
    secondaryLink.className = 'secondary-cta';
    buttons.appendChild(secondaryLink);
  }

  if (buttons.children.length) {
    content.appendChild(buttons);
  }

  block.textContent = '';
  block.appendChild(content);
}
