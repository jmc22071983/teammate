export default function decorate(block) {
  const rows = [...block.children];
  const [contentRow, imageRow] = rows;
  const contentElements = [...contentRow.children];

  const headline = contentElements[0]?.querySelector('div');
  const intro = contentElements[1]?.querySelector('div');
  const cta = contentElements[2]?.querySelector('a');
  const secondaryLink = contentElements[3]?.querySelector('a');
  const editorialNote = contentElements[4]?.querySelector('div');

  if (headline) headline.classList.add('headline');
  if (intro) intro.classList.add('intro');
  if (cta) cta.classList.add('cta');
  if (secondaryLink) secondaryLink.classList.add('secondary-link');
  if (editorialNote) editorialNote.classList.add('editorial-note');

  const image = imageRow.querySelector('picture');
  if (image) image.classList.add('image');
}