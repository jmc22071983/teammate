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

// A Crosswalk component instance (header or card) is authored as ONE row whose single
// child div holds all its filled-in fields as sibling elements (empty fields produce no
// element at all), so fields must be classified by content, not by a fixed position.
function fieldsOf(row) {
  if (!row) return [];
  const wrapper = row.children[0] || row;
  return [...wrapper.children];
}

function createHeader(row) {
  const fields = fieldsOf(row);
  const ctaField = fields.find((el) => el.querySelector('a'));
  const [titleField, subtitleField] = fields.filter((el) => el !== ctaField);
  if (!titleField && !subtitleField && !ctaField) return null;

  const header = document.createElement('div');
  header.className = 'b-cards-header';

  const copy = document.createElement('div');
  copy.className = 'b-cards-header-copy';

  if (titleField) {
    titleField.classList.add('b-cards-header-title');
    copy.append(titleField);
  }

  if (subtitleField) {
    subtitleField.classList.add('b-cards-header-subtitle');
    copy.append(subtitleField);
  }

  header.append(copy);

  if (ctaField) {
    const link = enhanceLink(ctaField.querySelector('a'), 'b-cards-header-link');
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
  const item = document.createElement('li');
  item.className = 'b-cards-item';
  moveInstrumentation(row, item);

  const fields = fieldsOf(row);
  const imageField = fields.find((el) => el.querySelector('picture, img'));
  const ctaField = fields.find((el) => el !== imageField && el.querySelector('a'));
  const [iconField, titleField, categoryField, ...textFields] = fields.filter(
    (el) => el !== imageField && el !== ctaField,
  );

  const image = imageField ? imageField.querySelector('img') : null;
  const iconText = iconField ? iconField.textContent.trim() : '';
  item.append(createMedia(iconText, image ? image.src : '', image ? image.alt : ''));

  const body = document.createElement('div');
  body.className = 'b-cards-card-body';

  if (titleField) {
    titleField.classList.add('b-cards-card-title');
    body.append(titleField);
  }

  if (categoryField) {
    categoryField.classList.add('b-cards-card-category');
    body.append(categoryField);
  }

  if (textFields.length) {
    const description = document.createElement('div');
    description.className = 'b-cards-card-description';
    textFields.forEach((field) => {
      while (field.firstChild) description.append(field.firstChild);
    });
    body.append(description);
  }

  if (ctaField) {
    const link = enhanceLink(ctaField.querySelector('a'), 'b-cards-card-link');
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
  const [headerRow, ...itemRows] = rows;
  const header = createHeader(headerRow);

  const list = document.createElement('ul');
  itemRows.forEach((row) => list.append(decorateCard(row)));

  block.textContent = '';
  if (header) block.append(header);
  block.append(list);
}
