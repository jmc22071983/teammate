function createButton(link, variant) {
  if (!link) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const button = document.createElement('a');
  button.href = link.href;
  button.title = link.title || link.textContent.trim();
  button.classList.add('button', variant);

  const text = document.createElement('span');
  text.className = 'button-text';
  text.textContent = link.textContent.trim();
  button.append(text);

  wrapper.append(button);
  return wrapper;
}

export default function decorate(block) {
  const [imageRow, contentRow] = [...block.children];

  if (imageRow) {
    imageRow.classList.add('hero-banner-5-background');
  }

  if (!contentRow) {
    return;
  }

  contentRow.classList.add('hero-banner-5-content');

  const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-banner-5-title');
  }

  const paragraphs = [...contentRow.querySelectorAll('p')];
  const buttonWrappers = [...contentRow.querySelectorAll('p.button-wrapper')];
  const buttonSet = new Set(buttonWrappers);
  const bodyParagraphs = paragraphs.filter((paragraph) => !buttonSet.has(paragraph));

  if (bodyParagraphs[0]) {
    bodyParagraphs[0].classList.add('hero-banner-5-copy');
  }

  const links = buttonWrappers
    .map((wrapper) => wrapper.querySelector('a'))
    .filter(Boolean);

  buttonWrappers.forEach((wrapper) => wrapper.remove());

  if (!links.length) {
    return;
  }

  const actions = document.createElement('div');
  actions.className = 'hero-banner-5-actions';

  const primaryButton = createButton(links[0], 'primary');
  if (primaryButton) {
    actions.append(primaryButton);
  }

  const secondaryButton = createButton(links[1], 'secondary');
  if (secondaryButton) {
    actions.append(secondaryButton);
  }

  contentRow.append(actions);
}
