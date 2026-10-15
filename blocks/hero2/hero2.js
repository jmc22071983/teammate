export default function decorate(block) {
  const headline = document.createElement('h1');
  headline.textContent = block.dataset.headline;
  block.appendChild(headline);

  const subheadline = document.createElement('h2');
  subheadline.textContent = block.dataset.subheadline;
  block.appendChild(subheadline);

  const cta = document.createElement('a');
  cta.textContent = block.dataset.ctaText;
  cta.href = block.dataset.ctaLink;
  block.appendChild(cta);
}