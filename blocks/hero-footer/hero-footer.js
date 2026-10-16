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
  const [imageRow, contentRow] = [...block.children];

  if (imageRow) {
    imageRow.classList.add('hero-footer-image');
  }

  if (!contentRow) return;

  contentRow.classList.add('hero-footer-content');

  const contentChildren = [...contentRow.children];
  const titleRow = contentChildren[0];
  const bodyRow = contentChildren[1];
  const primaryRow = contentChildren[2];
  const secondaryRow = contentChildren[3];

  if (titleRow) {
    titleRow.classList.add('hero-footer-title-row');
    const heading = titleRow.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (heading) heading.classList.add('hero-footer-title');
  }

  if (bodyRow) {
    bodyRow.classList.add('hero-footer-body-row');
    const body = bodyRow.querySelector('p, h1, h2, h3, h4, h5, h6');
    if (body) body.classList.add('hero-footer-body');
  }

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

  const actions = document.createElement('div');
  actions.className = 'hero-footer-actions';

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
