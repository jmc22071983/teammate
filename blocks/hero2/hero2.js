export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    picture.parentElement.classList.add('hero2-picture');
  }
  const h1 = block.querySelector('h1');
  if (h1) {
    h1.classList.add('hero2-title');
  }
}
