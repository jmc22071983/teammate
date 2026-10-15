export default function decorate(block) {
  const [, eyebrowRow, contentRow, metaRow] = [...block.children];

  const eyebrow = eyebrowRow?.querySelector('div');
  eyebrow?.classList.add('eyebrow');

  const [headline, intro, cta, secondaryLink] = contentRow
    ? [...contentRow.children]
    : [];
  headline?.classList.add('headline');
  intro?.classList.add('intro');
  cta?.classList.add('cta');
  secondaryLink?.classList.add('secondary-link');

  const [editorialNote, caption] = metaRow ? [...metaRow.children] : [];
  editorialNote?.classList.add('editorial-note');
  caption?.classList.add('image-caption');
}
