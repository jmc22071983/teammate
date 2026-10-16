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
    imageRow.classList.add('hero-banner-image');

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

  contentRow.classList.add('hero-banner-content');

  const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-banner-title');
  }

  const paragraphs = [...contentRow.querySelectorAll('p')];
  const buttonWrappers = [...contentRow.querySelectorAll('p.button-wrapper')];
  const buttonSet = new Set(buttonWrappers);
  const bodyParagraphs = paragraphs.filter((paragraph) => !buttonSet.has(paragraph));

  if (bodyParagraphs[0]) {
    bodyParagraphs[0].classList.add('hero-banner-copy');
  }

  const links = buttonWrappers
    .map((wrapper) => wrapper.querySelector('a'))
    .filter(Boolean);

  if (links.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-banner-actions';

    const primaryButton = createButton(links[0], 'primary');
    const secondaryButton = createButton(links[1], 'secondary');

    if (primaryButton) actions.append(primaryButton);
    if (secondaryButton) actions.append(secondaryButton);

    if (actions.children.length) {
      buttonWrappers.forEach((wrapper) => wrapper.remove());
      contentRow.append(actions);
    }
  }
}
