export default function decorate(block) {
  const [title, subtitle, cta, secondaryCta] = [...block.children];

  if (title) {
    const h1 = document.createElement('h1');
    h1.textContent = title.textContent;
    block.appendChild(h1);
  }

  if (subtitle) {
    const h2 = document.createElement('h2');
    h2.textContent = subtitle.textContent;
    block.appendChild(h2);
  }

  if (cta) {
    const primaryLink = document.createElement('a');
    primaryLink.href = cta.querySelector('a').href;
    primaryLink.textContent = cta.querySelector('a').textContent;
    primaryLink.className = 'cta';
    block.appendChild(primaryLink);
  }

  if (secondaryCta) {
    const secondaryLink = document.createElement('a');
    secondaryLink.href = secondaryCta.querySelector('a').href;
    secondaryLink.textContent = secondaryCta.querySelector('a').textContent;
    secondaryLink.className = 'secondary-cta';
    block.appendChild(secondaryLink);
  }
}