function createDecorativeMedia(iconText) {
  const media = document.createElement('div');
  media.className = 'b-cards-card-image';

  const surface = document.createElement('div');
  surface.className = 'b-cards-card-image-surface';

  if (iconText) {
    const icon = document.createElement('span');
    icon.className = 'b-cards-card-image-icon';
    icon.textContent = iconText;
    surface.append(icon);
  }

  media.append(surface);
  return media;
}

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

  const cells = [...row.children];
  const mediaCell = cells[0];
  const categoryCell = cells[1];
  const contentCell = cells[2];
  const ctaCell = cells[3];

  const iconText = mediaCell ? mediaCell.textContent.trim() : '';
  li.append(createDecorativeMedia(iconText));

  const body = document.createElement('div');
  body.className = 'b-cards-card-body';

  const textWrapper = document.createElement('div');
  textWrapper.className = 'b-cards-card-text';

  if (categoryCell) {
    const category = categoryCell.querySelector('p');
    if (category) {
      category.classList.add('b-cards-card-category');
      textWrapper.append(category);
    }
  }

  if (contentCell) {
    while (contentCell.firstElementChild) {
      textWrapper.append(contentCell.firstElementChild);
    }
  }

  const paragraphs = [...textWrapper.querySelectorAll('p')].filter((paragraph) => !paragraph.classList.contains('b-cards-card-category'));
  if (paragraphs[0]) paragraphs[0].classList.add('b-cards-card-title');
  if (paragraphs[1]) paragraphs[1].classList.add('b-cards-card-description');

  body.append(textWrapper);

  if (ctaCell) {
    ctaCell.className = 'b-cards-card-cta';
    const link = ctaCell.querySelector('a');
    if (link) link.classList.add('b-cards-card-link');
    body.append(ctaCell);
  }

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

  block.textContent = '';
  if (header) block.append(header);
  block.append(list);
}
