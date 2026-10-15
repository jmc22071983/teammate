export default function decorate(block) {
  const rows = [...block.children];
  const [imageRow, headlineRow, introRow, ctaRow, secondaryLinkRow, editorialNoteRow] = rows;

  // Image
  const image = imageRow.querySelector('img');
  if (image) {
    image.alt = imageRow.querySelector('div').textContent;
  }

  // Headline
  const headline = headlineRow.querySelector('div');
  headline.classList.add('headline');

  // Introduction
  const intro = introRow.querySelector('div');
  intro.classList.add('intro');

  // Call to Action
  const cta = ctaRow.querySelector('a');
  cta.classList.add('cta');

  // Secondary Link
  const secondaryLink = secondaryLinkRow.querySelector('a');
  secondaryLink.classList.add('secondary-link');

  // Editorial Note
  const editorialNote = editorialNoteRow.querySelector('div');
  editorialNote.classList.add('editorial-note');
}
