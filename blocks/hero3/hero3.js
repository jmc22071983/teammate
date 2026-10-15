export default function decorate(block) {
  const rows = [...block.children];
  const [eyebrowRow, headlineRow, introRow, ctaRow, secondaryLinkRow, editorialNoteRow, imageRow, captionRow] = rows;

  const eyebrow = eyebrowRow.querySelector('div');
  eyebrow.classList.add('eyebrow');

  const headline = headlineRow.querySelector('div');
  headline.classList.add('headline');

  const intro = introRow.querySelector('div');
  intro.classList.add('intro');

  const cta = ctaRow.querySelector('div');
  cta.classList.add('cta');

  const secondaryLink = secondaryLinkRow.querySelector('div');
  secondaryLink.classList.add('secondary-link');

  const editorialNote = editorialNoteRow.querySelector('div');
  editorialNote.classList.add('editorial-note');

  const image = imageRow.querySelector('picture');
  image.classList.add('image');

  const caption = captionRow.querySelector('div');
  caption.classList.add('image-caption');
}
