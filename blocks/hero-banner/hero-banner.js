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
    imageRow.classList.add('hero-banner-image');
  }

  if (!contentRow) return;

  contentRow.classList.add('hero-banner-content');

  const contentChildren = [...contentRow.children];
  const titleRow = contentChildren[0];
  const subtitleRow = contentChildren[1];
  const primaryRow = contentChildren[2];
  const secondaryRow = contentChildren[3];

  if (titleRow) {
    titleRow.classList.add('hero-banner-title-row');
    const heading = titleRow.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (heading) heading.classList.add('hero-banner-title');
  }

  if (subtitleRow) {
    subtitleRow.classList.add('hero-banner-subtitle-row');
    const subtitle = subtitleRow.querySelector('p, h1, h2, h3, h4, h5, h6');
    if (subtitle) subtitle.classList.add('hero-banner-subtitle');
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
