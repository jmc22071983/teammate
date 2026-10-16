import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createHeader(block) {
  const [titleRow, subtitleRow, ctaRow] = [...block.children];
  if (!titleRow && !subtitleRow && !ctaRow) return null;

  const header = document.createElement('div');
  header.className = 'b-cards-header';

  const copy = document.createElement('div');
  copy.className = 'b-cards-header-copy';

  if (titleRow) {
    const title = titleRow.querySelector('h1, h2, h3, h4, h5, h6, p');
    if (title) {
      title.classList.add('b-cards-header-title');
      copy.append(title);
    }
  }

  if (subtitleRow) {
    const subtitle = subtitleRow.querySelector('p');
    if (subtitle) {
      subtitle.classList.add('b-cards-header-subtitle');
      copy.append(subtitle);
    }
  }

  const action = document.createElement('div');
  action.className = 'b-cards-header-action';
  if (ctaRow) {
    const link = ctaRow.querySelector('a');
    if (link) {
      link.classList.add('b-cards-header-link');
      action.append(link);
    }
  }

  header.append(copy, action);
  return header;
}

function decorateCard(row) {
  const li = document.createElement('li');
  li.className = 'b-cards-item';
  moveInstrumentation(row, li);

  while (row.firstElementChild) {
    li.append(row.firstElementChild);
  }

  const cells = [...li.children];
  const imageCell = cells[0];
  const categoryCell = cells[1];
  const contentCell = cells[2];
  const ctaCell = cells[3];

  if (imageCell) imageCell.className = 'b-cards-card-image';

  const body = document.createElement('div');
  body.className = 'b-cards-card-body';

  if (contentCell) {
    const textWrapper = document.createElement('div');
    textWrapper.className = 'b-cards-card-text';

    if (categoryCell) {
      const category = categoryCell.querySelector('p');
      if (category) {
        category.classList.add('b-cards-card-category');
        textWrapper.append(category);
      }
    }

    while (contentCell.firstElementChild) {
      textWrapper.append(contentCell.firstElementChild);
    }

    const paragraphs = [...textWrapper.querySelectorAll('p')].filter((paragraph) => !paragraph.classList.contains('b-cards-card-category'));
    if (paragraphs[0]) paragraphs[0].classList.add('b-cards-card-title');
    if (paragraphs[1]) paragraphs[1].classList.add('b-cards-card-description');

    body.append(textWrapper);
  }

  if (ctaCell) {
    ctaCell.className = 'b-cards-card-cta';
    const link = ctaCell.querySelector('a');
    if (link) link.classList.add('b-cards-card-link');
    body.append(ctaCell);
  }

  if (contentCell) contentCell.remove();
  if (categoryCell) categoryCell.remove();
  li.append(body);
  return li;
}

export default function decorate(block) {
  const rows = [...block.children];
  const headerRows = rows.slice(0, 3);
  const itemRows = rows.slice(3);

  const headerSource = document.createElement('div');
  headerRows.forEach((row) => headerSource.append(row));
  const header = createHeader(headerSource);

  const list = document.createElement('ul');
  itemRows.forEach((row) => list.append(decorateCard(row)));

  list.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  if (header) block.append(header);
  block.append(list);
}
