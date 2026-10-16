function createButton(link, variant) {
  if (!link) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const button = document.createElement('a');
  button.href = link.href;
  button.textContent = link.textContent.trim();
  button.title = link.title || link.textContent.trim();
  button.className = `button ${variant}`;

  wrapper.append(button);
  return wrapper;
}

export default function decorate(block) {
  const [imageRow, contentRow, primaryRow, secondaryRow] = [...block.children];
  const image = imageRow ? imageRow.querySelector('picture, img') : null;

  if (imageRow) {
    imageRow.classList.add('hero-footer-background');
  }

  if (contentRow) {
    contentRow.classList.add('hero-footer-content');

    const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('hero-footer-title');
    }

    const paragraphs = [...contentRow.querySelectorAll('p')];
    if (paragraphs[0]) {
      paragraphs[0].classList.add('hero-footer-copy');
    }
  }

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

  if (contentRow && (primaryLink || secondaryLink)) {
    const actions = document.createElement('div');
    actions.className = 'hero-footer-actions';

    const primaryButton = createButton(primaryLink, 'primary');
    const secondaryButton = createButton(secondaryLink, 'secondary');

    if (primaryButton) actions.append(primaryButton);
    if (secondaryButton) actions.append(secondaryButton);

    contentRow.append(actions);
  }

  if (primaryRow) primaryRow.remove();
  if (secondaryRow) secondaryRow.remove();

  if (image) {
    block.classList.add('has-background-image');
  }
}
