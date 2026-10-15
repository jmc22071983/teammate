export default function decorate(block) {
  const [imageRow, contentRow] = [...block.children];

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) picture.classList.add('image');
  }

  if (contentRow) {
    const [headline, intro, cta, secondaryLink, note] = [...contentRow.children];
    if (headline) headline.classList.add('headline');
    if (intro) intro.classList.add('intro');
    if (cta) cta.classList.add('cta');
    if (secondaryLink) secondaryLink.classList.add('secondary-link');
    if (note) note.classList.add('note');
  }
}
