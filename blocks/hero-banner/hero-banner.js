function createButton(link) {
  if (!link) return null;

  link.classList.add('button');
  return link.closest('p') || link;
}

export default function decorate(block) {
  const [contentRow] = [...block.children];

  if (!contentRow) return;

  contentRow.classList.add('hero-banner-content');

  const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-banner-title');
  }

  const paragraphs = [...contentRow.querySelectorAll('p')];
  const buttonWrappers = paragraphs.filter((paragraph) => paragraph.querySelector('a'));
  const bodyParagraphs = paragraphs.filter((paragraph) => !paragraph.querySelector('a'));

  if (bodyParagraphs[0]) {
    bodyParagraphs[0].classList.add('hero-banner-copy');
  }

  if (buttonWrappers.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-banner-actions';

    buttonWrappers.forEach((wrapper, index) => {
      const link = wrapper.querySelector('a');
      const button = createButton(link);

      if (button) {
        const anchor = button.matches('a') ? button : button.querySelector('a');
        if (anchor) {
          anchor.classList.add(index === 0 ? 'primary' : 'secondary');
        }

        actions.append(button);
      }
    });

    contentRow.append(actions);
  }
}
