function createAsset(src, alt, className) {
  if (!src) return null;

  const wrapper = document.createElement('div');
  wrapper.className = className;

  const image = document.createElement('img');
  image.src = src;
  image.alt = alt || '';
  image.loading = 'eager';

  wrapper.append(image);
  return wrapper;
}

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
  const [
    cardRow,
    moonRow,
    pumpkinRow,
    batPrimaryRow,
    batSecondaryRow,
    contentRow,
    primaryRow,
    secondaryRow,
  ] = [...block.children];

  const cardImage = cardRow ? cardRow.querySelector('picture img') : null;
  const moonImage = moonRow ? moonRow.querySelector('picture img') : null;
  const pumpkinImage = pumpkinRow ? pumpkinRow.querySelector('picture img') : null;
  const batPrimaryImage = batPrimaryRow ? batPrimaryRow.querySelector('picture img') : null;
  const batSecondaryImage = batSecondaryRow ? batSecondaryRow.querySelector('picture img') : null;

  const stage = document.createElement('div');
  stage.className = 'b-hero-stage';

  const moon = createAsset(moonImage ? moonImage.src : '', moonImage ? moonImage.alt : '', 'b-hero-moon');
  const pumpkin = createAsset(pumpkinImage ? pumpkinImage.src : '', pumpkinImage ? pumpkinImage.alt : '', 'b-hero-pumpkin');
  const batPrimary = createAsset(batPrimaryImage ? batPrimaryImage.src : '', batPrimaryImage ? batPrimaryImage.alt : '', 'b-hero-bat-primary');
  const batSecondary = createAsset(batSecondaryImage ? batSecondaryImage.src : '', batSecondaryImage ? batSecondaryImage.alt : '', 'b-hero-bat-secondary');
  const card = createAsset(cardImage ? cardImage.src : '', cardImage ? cardImage.alt : '', 'b-hero-card');

  [moon, pumpkin, batPrimary, batSecondary, card].forEach((asset) => {
    if (asset) stage.append(asset);
  });

  const content = document.createElement('div');
  content.className = 'b-hero-content';

  if (contentRow) {
    const textWrapper = document.createElement('div');
    textWrapper.className = 'b-hero-text';

    while (contentRow.firstElementChild) {
      textWrapper.append(contentRow.firstElementChild);
    }

    const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) heading.classList.add('b-hero-title');

    const paragraphs = [...textWrapper.querySelectorAll('p')];
    if (paragraphs[0]) paragraphs[0].classList.add('b-hero-copy');

    content.append(textWrapper);
  }

  const actions = document.createElement('div');
  actions.className = 'b-hero-actions';

  const primaryLink = primaryRow ? primaryRow.querySelector('a') : null;
  const secondaryLink = secondaryRow ? secondaryRow.querySelector('a') : null;

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
  if (actions.children.length) content.append(actions);

  block.textContent = '';
  block.append(stage, content);
}
