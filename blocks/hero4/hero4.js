export default function decorate(block) {
  const rows = [...block.children];
  const [eyebrowRow, headlineRow, introRow, ctaRow] = rows;

  if (eyebrowRow) {
    const eyebrow = document.createElement('div');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = eyebrowRow.textContent;
    block.appendChild(eyebrow);
  }

  if (headlineRow) {
    const headline = document.createElement('h1');
    headline.textContent = headlineRow.textContent;
    block.appendChild(headline);
  }

  if (introRow) {
    const intro = document.createElement('p');
    intro.className = 'intro';
    intro.textContent = introRow.textContent;
    block.appendChild(intro);
  }

  if (ctaRow) {
    const cta = document.createElement('div');
    cta.className = 'cta';
    const link = document.createElement('a');
    link.href = ctaRow.querySelector('a').href;
    link.textContent = ctaRow.querySelector('a').textContent;
    cta.appendChild(link);
    block.appendChild(cta);
  }
}