export default function decorate(block) {
  const [content, image] = [...block.children];
  content.classList.add('hero3-container');
  image.classList.add('hero3-image');
  const [headline, intro, cta, note] = [...content.children];
  headline.classList.add('hero3-headline');
  intro.classList.add('hero3-intro');
  cta.classList.add('hero3-cta');
  note.classList.add('hero3-note');
}
