import { moveInstrumentation } from '../../scripts/scripts.js';

function createArrow() {
  const arrow = document.createElement('span');
  arrow.className = 'b-cards-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  return arrow;
}

function enhanceLink(link, className) {
  if (!link) return null;
  link.classList.add(className);
  link.append(createArrow());
  return link;
}

function createHeader(rows) {
  const [titleRow, subtitleRow, ctaRow] = rows;
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

  header.append(copy);

  if (ctaRow) {
    const link = enhanceLink(ctaRow.querySelector('a'), 'b-cards-header-link');
    if (link) {
      const action = document.createElement('div');
      action.className = 'b-cards-header-action';
      action.append(link);
      header.append(action);
    }
  }

  return header;
}

function createMedia(iconText, imageSrc, imageAlt) {
  const media = document.createElement('div');
  media.className = 'b-cards-card-media';

  const surface = document.createElement('div');
  surface.className = 'b-cards-card-media-surface';

  if (imageSrc) {
    const image = document.createElement('img');
    image.className = 'b-cards-card-media-image';
    image.src = imageSrc;
    image.alt = imageAlt || '';
    image.loading = 'lazy';
    surface.append(image);
  } else if (iconText) {
    const icon = document.createElement('span');
    icon.className = 'b-cards-card-media-icon';
    icon.textContent = iconText;
    surface.append(icon);
  }

  media.append(surface);
  return media;
}

function decorateCard(row) {
  const [iconRow, imageRow, , titleRow, categoryRow, textRow, ctaRow] = [...row.children];
  const item = document.createElement('li');
  item.className = 'b-cards-item';
  moveInstrumentation(row, item);

  const iconText = iconRow ? iconRow.textContent.trim() : '';
  const image = imageRow ? imageRow.querySelector('picture img') : null;
  item.append(createMedia(iconText, image ? image.src : '', image ? image.alt : ''));

  const body = document.createElement('div');
  body.className = 'b-cards-card-body';

  if (titleRow) {
    const title = titleRow.querySelector('p, h1, h2, h3, h4, h5, h6');
    if (title) {
      title.classList.add('b-cards-card-title');
      body.append(title);
    }
  }

  if (categoryRow) {
    const category = categoryRow.querySelector('p');
    if (category) {
      category.classList.add('b-cards-card-category');
      body.append(category);
    }
  }

  if (textRow) {
    const description = document.createElement('div');
    description.className = 'b-cards-card-description';
    while (textRow.firstElementChild) {
      description.append(textRow.firstElementChild);
    }
    body.append(description);
  }

  if (ctaRow) {
    const link = enhanceLink(ctaRow.querySelector('a'), 'b-cards-card-link');
    if (link) {
      const action = document.createElement('div');
      action.className = 'b-cards-card-cta';
      action.append(link);
      body.append(action);
    }
  }

  item.append(body);
  return item;
}

export default function decorate(block) {
  const rows = [...block.children];
  const header = createHeader(rows.slice(0, 3));
  const items = rows.slice(3);

  const list = document.createElement('ul');
  items.forEach((row) => list.append(decorateCard(row)));

  block.textContent = '';
  if (header) block.append(header);
  block.append(list);
}
