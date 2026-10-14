export default function decorate(block) {
  const picture = block.querySelector('picture');
  if (picture) {
    picture.parentElement.classList.add('hero2-picture');
    picture.setAttribute('data-aue-resource', 'image');
    picture.setAttribute('data-aue-prop', 'image');
  }
  const h1 = block.querySelector('h1');
  if (h1) {
    h1.classList.add('hero2-title');
    h1.setAttribute('data-aue-resource', 'text');
    h1.setAttribute('data-aue-prop', 'text');
  }
}
