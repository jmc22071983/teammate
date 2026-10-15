export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, textRow] = rows;

  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      block.prepend(picture);
    }
  }

  if (textRow) {
    const textContent = textRow.querySelector('div');
    if (textContent) {
      textContent.classList.add('b-hero3-text');
    }
  }
}