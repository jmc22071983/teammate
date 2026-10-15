export default function decorate(block) {
  const [title, subtitle, primaryButton, secondaryButton] = [...block.children];
  if (title) title.classList.add('b-hero1-title');
  if (subtitle) subtitle.classList.add('b-hero1-subtitle');
  if (primaryButton) primaryButton.classList.add('b-hero1-primary-button');
  if (secondaryButton) secondaryButton.classList.add('b-hero1-secondary-button');
}
