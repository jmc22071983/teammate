import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createHeader(block) {
  const firstRow = block.children[0];
  if (!firstRow) return null;

  const cells = [...firstRow.children];
  if (cells.length < 2) return null;

  const header = document.createElement('div');
  header.className = 'cards-header';

  const titleCell = cells[0];
  titleCell.classList.add('cards-header-copy');

  const actionCell = cells[1];
  actionCell.classList.add('cards-header-action');

  const actionLink = actionCell.querySelector('a');
  if (actionLink) {
    actionLink.classList.add('cards-header-link');
  }

  header.append(titleCell, actionCell);
  firstRow.remove();
  return header;
}

function decorateCard(row) {
  const li = document.createElement('li');
  moveInstrumentation(row, li);

  while (row.firstElementChild) {
    li.append(row.firstElementChild);
  }

  [...li.children].forEach((div) => {
    if (div.children.length === 1 && div.querySelector('picture')) {
      div.className = 'cards-card-image';
    } else {
      div.className = 'cards-card-body';
    }
  });

  const body = li.querySelector('.cards-card-body');
  if (body) {
    const paragraphs = [...body.querySelectorAll('p')];
    const title = paragraphs[0];
    const description = paragraphs[1];
    const ctaParagraph = paragraphs[2];

    if (title) title.classList.add('cards-card-title');
    if (description) description.classList.add('cards-card-description');

    if (ctaParagraph) {
      ctaParagraph.classList.add('cards-card-cta');
      const ctaLink = ctaParagraph.querySelector('a');
      if (ctaLink) {
        ctaLink.classList.add('cards-card-link');
      }
    }
  }

  return li;
}

export default function decorate(block) {
  const header = createHeader(block);
  const rows = [...block.children];
  const ul = document.createElement('ul');

  rows.forEach((row) => {
    ul.append(decorateCard(row));
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  if (header) block.append(header);
  block.append(ul);
}
