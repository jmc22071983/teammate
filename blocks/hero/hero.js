export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, textRow] = rows;

  if (imageRow) {
    imageRow.classList.add('hero-image');
  }

  if (textRow) {
    textRow.classList.add('hero-content');

    const heading = textRow.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.classList.add('hero-title');
    }

    const paragraphs = [...textRow.querySelectorAll('p')];
    const buttonWrappers = [...textRow.querySelectorAll('p.button-wrapper')];
    const buttonSet = new Set(buttonWrappers);
    const bodyParagraphs = paragraphs.filter((paragraph) => !buttonSet.has(paragraph));

    if (bodyParagraphs[0]) {
      bodyParagraphs[0].classList.add('hero-copy');
    }

    if (buttonWrappers.length) {
      const actions = document.createElement('div');
      actions.className = 'hero-actions';
      buttonWrappers.forEach((wrapper) => actions.append(wrapper));
      textRow.append(actions);
    }
  }
}
