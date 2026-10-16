function createButton(link) {
  if (!link) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const button = document.createElement('a');
  button.href = link.href;
  button.textContent = link.textContent.trim();
  button.title = link.title || link.textContent.trim();
  button.className = link.classList.contains('secondary') ? 'button secondary' : 'button primary';

  wrapper.append(button);
  return wrapper;
}

export default function decorate(block) {
  const [imageRow, contentRow] = [...block.children];
  const image = imageRow ? imageRow.querySelector('picture, img') : null;

  if (imageRow) {
    imageRow.classList.add('hero-banner-background');
  }

  if (contentRow) {
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

    buttonWrappers.forEach((wrapper) => wrapper.remove());

    if (links.length) {
      const actions = document.createElement('div');
      actions.className = 'hero-banner-actions';
      links.forEach((link, index) => {
        if (index === 1) {
          link.classList.add('secondary');
        }
        const button = createButton(link);
        if (button) actions.append(button);
      });
      contentRow.append(actions);
    }
  }

  if (image) {
    block.classList.add('has-background-image');
  }
}
