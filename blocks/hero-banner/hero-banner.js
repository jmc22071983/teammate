function createButton(href, text, variant) {
  if (!href || !text) return null;

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';

  const link = document.createElement('a');
  link.href = href;
  link.className = `button ${variant}`;
  link.textContent = text;

  wrapper.append(link);
  return wrapper;
}

export default function decorate(block) {
  const [backgroundRow, contentRow] = [...block.children];

  if (backgroundRow) {
    backgroundRow.classList.add('hero-banner-background');
  }

  if (!contentRow) return;

  contentRow.classList.add('hero-banner-content');

  const contentChildren = [...contentRow.children];
  const titleRow = contentChildren[0];
  const subtitleRow = contentChildren[1];
  const actionsRow = contentChildren[2];

  if (titleRow) {
    const heading = titleRow.querySelector('h1, h2, h3, h4, h5, h6') || titleRow.querySelector('p');
    if (heading) {
      heading.classList.add('hero-banner-title');
    }
  }

  if (subtitleRow) {
    const copy = subtitleRow.querySelector('p') || subtitleRow;
    copy.classList.add('hero-banner-copy');
  }

  const actions = document.createElement('div');
  actions.className = 'hero-banner-actions';

  if (actionsRow) {
    const links = [...actionsRow.querySelectorAll('a')];
    const primaryLink = links[0];
    const secondaryLink = links[1];

    const primaryButton = createButton(
      primaryLink ? primaryLink.href : '',
      primaryLink ? primaryLink.textContent.trim() : '',
      'primary',
    );
    const secondaryButton = createButton(
      secondaryLink ? secondaryLink.href : '',
      secondaryLink ? secondaryLink.textContent.trim() : '',
      'secondary',
    );

    if (primaryButton) actions.append(primaryButton);
    if (secondaryButton) actions.append(secondaryButton);
  }

  if (actions.children.length) {
    contentRow.append(actions);
  }

  if (actionsRow) {
    actionsRow.remove();
  }
}
