export default function decorate(block) {
  const [headline, intro, cta, secondaryLink, note] = [...block.children];
  if (headline) headline.classList.add('hero4-headline');
  if (intro) intro.classList.add('hero4-intro');
  if (cta) cta.classList.add('hero4-cta');
  if (secondaryLink) secondaryLink.classList.add('hero4-secondary');
  if (note) note.classList.add('hero4-note');
}
