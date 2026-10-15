export default function decorate(block) {
  const [title, subtitle, primaryButton, secondaryButton] = [...block.children];
  if (title) title.classList.add('b-hero4-title');
  if (subtitle) subtitle.classList.add('b-hero4-subtitle');
  if (primaryButton) primaryButton.classList.add('b-hero4-primary-button');
  if (secondaryButton) secondaryButton.classList.add('b-hero4-secondary-button');
}
