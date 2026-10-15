export default function decorate(block) {
  const rows = [...block.children];
  const [contentRow, imageRow] = rows;

  if (contentRow) {
    const [headline, intro, cta, secondaryLink, note] = [...contentRow.children];
    if (headline) headline.classList.add('headline');
    if (intro) intro.classList.add('intro');
    if (cta) cta.classList.add('cta');
    if (secondaryLink) secondaryLink.classList.add('secondary-link');
    if (note) note.classList.add('note');
  }

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) picture.classList.add('image');
  }
}
