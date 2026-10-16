function createButton(link, variant) {
  if (!link) return null;

  const href = link.getAttribute('href');
  const text = link.textContent.trim();
  if (!href || !text) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.className = `button ${variant}`;
  anchor.textContent = text;

  wrapper.append(anchor);
  return wrapper;
}

export default function decorate(block) {
  const [imageRow, contentRow] = [...block.children];

  if (imageRow) {
    imageRow.classList.add('hero-footer-image');

    const picture = imageRow.querySelector('picture');
    const image = picture ? picture.querySelector('img') : null;

    if (image) {
      block.style.backgroundImage = `linear-gradient(90deg, rgb(18 7 31 / 92%) 0%, rgb(18 7 31 / 35%) 100%), url('${image.currentSrc || image.src}')`;
      block.style.backgroundPosition = 'center';
      block.style.backgroundRepeat = 'no-repeat';
      block.style.backgroundSize = 'cover';
      block.setAttribute('aria-label', image.alt || '');
    }
  }

  if (!contentRow) return;

  contentRow.classList.add('hero-footer-content');

  const contentChildren = [...contentRow.children];
  const textRow = contentChildren[0];
  const primaryRow = contentChildren[1];
  const secondaryRow = contentChildren[2];

  if (textRow) {
    textRow.classList.add('hero-footer-text');

    const heading = textRow.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) heading.classList.add('hero-footer-title');

    const paragraphs = [...textRow.querySelectorAll('p')];
    if (paragraphs[0]) paragraphs[0].classList.add('hero-footer-copy');
  }

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

  const actions = document.createElement('div');
  actions.className = 'hero-footer-actions';

  const primaryButton = createButton(primaryLink, 'primary');
  const secondaryButton = createButton(secondaryLink, 'secondary');

  if (primaryButton) actions.append(primaryButton);
  if (secondaryButton) actions.append(secondaryButton);

  if (actions.children.length) contentRow.append(actions);

  if (primaryRow) primaryRow.remove();
  if (secondaryRow) secondaryRow.remove();
}
