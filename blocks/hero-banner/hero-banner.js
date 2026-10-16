function createButton(href, text, variant) {
  if (!href || !text) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const link = document.createElement('a');
  link.href = href;
  link.className = `button ${variant}`;
  link.textContent = text;

  wrapper.append(link);
  return wrapper;
}

export default function decorate(block) {
  const [contentRow, primaryRow, secondaryRow] = [...block.children];

  if (!contentRow) return;

  block.classList.add('hero-banner-ready');
  contentRow.classList.add('hero-banner-content');

  const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-banner-title');
  }

  const paragraphs = [...contentRow.querySelectorAll('p')];
  if (paragraphs[0]) {
    paragraphs[0].classList.add('hero-banner-copy');
  }

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

  const actions = document.createElement('div');
  actions.className = 'hero-banner-actions';

  const primaryButton = createButton(
    primaryLink ? primaryLink.href : '',
    primaryLink ? primaryLink.textContent.trim() : '',
    'primary',
  );
  const secondaryButton = createButton(
    secondaryLink ? secondaryLink.href : '',
    secondaryLink ? secondaryLink.textContent.trim() : '',
    'secondary',
  );

  if (primaryButton) actions.append(primaryButton);
  if (secondaryButton) actions.append(secondaryButton);
  if (actions.children.length) contentRow.append(actions);

  if (primaryRow) primaryRow.remove();
  if (secondaryRow) secondaryRow.remove();
}
