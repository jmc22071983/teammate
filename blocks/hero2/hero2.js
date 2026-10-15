export default function decorate(block) {
  const rows = [...block.children];
  const [contentRow, imageRow] = rows;
  const contentElements = [...contentRow.children];

  const [headline, intro, cta, secondaryLink, editorialNote] = contentElements;

  if (headline) headline.classList.add('headline');
  if (intro) intro.classList.add('intro');
  if (cta) cta.classList.add('cta');
  if (secondaryLink) secondaryLink.classList.add('secondary-link');
  if (editorialNote) editorialNote.classList.add('editorial-note');

  const image = imageRow.querySelector('picture');
  if (image) image.classList.add('image');
}
