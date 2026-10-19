import { moveInstrumentation } from '../../scripts/scripts.js';

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

  if (!contentRow) return;

  const content = document.createElement('div');
  content.className = 'hero-banner-5-content';
  moveInstrumentation(contentRow, content);

  const heading = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('hero-banner-5-title');
    content.append(heading);
  }

  const paragraphs = [...contentRow.querySelectorAll(':scope > p')];
  const ctaParagraphs = paragraphs.filter((paragraph) => paragraph.classList.contains('button-wrapper') || paragraph.querySelector('a[href]'));
  const copyParagraphs = paragraphs.filter((paragraph) => !ctaParagraphs.includes(paragraph));

  if (copyParagraphs[0]) {
    copyParagraphs[0].classList.add('hero-banner-5-copy');
    content.append(copyParagraphs[0]);
  }

  const links = ctaParagraphs
    .map((paragraph) => paragraph.querySelector('a[href]'))
    .filter(Boolean);

  if (links.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-banner-5-actions';

    const primaryButton = createButton(links[0], 'primary');
    if (primaryButton) actions.append(primaryButton);

    const secondaryButton = createButton(links[1], 'secondary');
    if (secondaryButton) actions.append(secondaryButton);

    if (actions.children.length) {
      content.append(actions);
    }
  }

  contentRow.replaceWith(content);
}
