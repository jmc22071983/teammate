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
    imageRow.classList.add('banner-image');
  }

  if (!contentRow) return;

  contentRow.classList.add('banner-content');

  const contentChildren = [...contentRow.children];
  const textRow = contentChildren[0];
  const primaryRow = contentChildren[1];
  const secondaryRow = contentChildren[2];

  if (textRow) {
    textRow.classList.add('banner-text');

    const heading = textRow.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('banner-title');
    }

    const paragraphs = [...textRow.querySelectorAll('p')];
    if (paragraphs[0]) {
      paragraphs[0].classList.add('banner-copy');
    }
  }

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

  const actions = document.createElement('div');
  actions.className = 'banner-actions';

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
