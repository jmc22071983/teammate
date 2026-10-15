import { moveInstrumentation } from '../../scripts/scripts.js';

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function createHeader(row) {
  const wrapper = document.createElement('div');
  wrapper.className = 'b-cards-header';

  const link = row.querySelector('a');
  const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
  const textNodes = [...row.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .filter(Boolean);

  const eyebrowText = textNodes[0]
    || [...row.querySelectorAll('p')]
      .map((p) => p.textContent.trim())
      .find((text) => text && text !== (link && link.textContent.trim()));

  if (eyebrowText) {
    const eyebrowEl = document.createElement('p');
    eyebrowEl.className = 'b-cards-eyebrow';
    eyebrowEl.textContent = eyebrowText;
    wrapper.append(eyebrowEl);
  }

  if (heading) {
    const titleEl = document.createElement('div');
    titleEl.className = 'b-cards-title';
    titleEl.innerHTML = heading.outerHTML;
    wrapper.append(titleEl);
  }

  if (link) {
    const ctaWrapper = document.createElement('p');
    ctaWrapper.className = 'b-cards-header-cta';
    ctaWrapper.append(link.cloneNode(true));
    wrapper.append(ctaWrapper);
  }

  return wrapper;
}

function createDecorativeArt(variant) {
  const art = document.createElement('div');
  art.className = 'b-cards-card-art';

  const orb = document.createElement('div');
  orb.className = 'b-cards-card-orb';
  art.append(orb);

  const icon = document.createElement('div');
  icon.className = 'b-cards-card-icon';
  icon.setAttribute('aria-hidden', 'true');

  if (variant === 'calabaza') {
    icon.textContent = '🎃';
  } else if (variant === 'fantasma') {
    icon.textContent = '👻';
  } else if (variant === 'murcielago') {
    icon.textContent = '🦇';
  } else if (variant === 'bruja') {
    icon.textContent = '🧙';
  } else {
    icon.textContent = '✨';
  }

  art.append(icon);
  return art;
}

function detectVariant(contentRow) {
  const title = contentRow.querySelector('h1, h2, h3, h4, h5, h6');
  const source = slugify(title ? title.textContent.trim() : contentRow.textContent.trim());

  if (source.includes('calabaza')) return 'calabaza';
  if (source.includes('fantasma')) return 'fantasma';
  if (source.includes('murcielago')) return 'murcielago';
  if (source.includes('bruja')) return 'bruja';
  return '';
}

function createCard(row) {
  const li = document.createElement('li');
  li.className = 'b-cards-card';
  moveInstrumentation(row, li);

  const [imageRow, contentRow] = [...row.children];
  const variant = contentRow ? detectVariant(contentRow) : '';

  if (variant) {
    li.classList.add(`is-${variant}`);
  }

  li.append(createDecorativeArt(variant));

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        li.dataset.assetImage = img.src;
      }
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
