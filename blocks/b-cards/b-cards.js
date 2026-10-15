import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createHeader(row) {
  const wrapper = document.createElement('div');
  wrapper.className = 'b-cards-header';

  const [eyebrow, title, cta] = [...row.children];

  if (eyebrow && eyebrow.textContent.trim()) {
    const eyebrowEl = document.createElement('p');
    eyebrowEl.className = 'b-cards-eyebrow';
    eyebrowEl.textContent = eyebrow.textContent.trim();
    wrapper.append(eyebrowEl);
  }

  if (title) {
    const titleEl = document.createElement('div');
    titleEl.className = 'b-cards-title';
    titleEl.innerHTML = title.innerHTML;
    wrapper.append(titleEl);
  }

  if (cta) {
    const link = cta.querySelector('a');
    if (link) {
      const ctaWrapper = document.createElement('p');
      ctaWrapper.className = 'b-cards-header-cta';
      ctaWrapper.append(link.cloneNode(true));
      wrapper.append(ctaWrapper);
    }
  }

  return wrapper;
}

function createCard(row) {
  const li = document.createElement('li');
  li.className = 'b-cards-card';
  moveInstrumentation(row, li);

  const [imageRow, contentRow] = [...row.children];

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'b-cards-card-image';
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
      li.append(imageWrapper);
    }
  }

  if (contentRow) {
    const body = document.createElement('div');
    body.className = 'b-cards-card-body';

    const [tag, heading, description, cta] = [...contentRow.children];

    if (tag && tag.textContent.trim()) {
      const tagEl = document.createElement('p');
      tagEl.className = 'b-cards-card-tag';
      tagEl.textContent = tag.textContent.trim();
      body.append(tagEl);
    }

    if (heading && heading.textContent.trim()) {
      const headingEl = document.createElement('h3');
      headingEl.className = 'b-cards-card-title';
      headingEl.textContent = heading.textContent.trim();
      body.append(headingEl);
    }

    if (description) {
      const descriptionEl = document.createElement('div');
      descriptionEl.className = 'b-cards-card-description';
      descriptionEl.innerHTML = description.innerHTML;
      body.append(descriptionEl);
    }

    if (cta) {
      const link = cta.querySelector('a');
      if (link) {
        const ctaWrapper = document.createElement('p');
        ctaWrapper.className = 'b-cards-card-cta';
        ctaWrapper.append(link.cloneNode(true));
        body.append(ctaWrapper);
      }
    }

    li.append(body);
  }

  return li;
}

export default function decorate(block) {
  const rows = [...block.children];
  const [headerRow, ...cardRows] = rows;
  const fragment = document.createDocumentFragment();

  if (headerRow) {
    fragment.append(createHeader(headerRow));
  }

  const list = document.createElement('ul');
  cardRows.forEach((row) => {
    list.append(createCard(row));
  });
  fragment.append(list);

  block.replaceChildren(fragment);
}
