export default function decorate(block) {
  const rows = [...block.children];
  const [contentRow, imageRow] = rows;

  if (contentRow) {
    contentRow.classList.add('content');
    const [subheadline, headline, intro, ctaRow, editorialNote] = [...contentRow.children];
    if (subheadline) subheadline.classList.add('subheadline');
    if (headline) headline.classList.add('headline');
    if (intro) intro.classList.add('intro');
    if (ctaRow) {
      ctaRow.classList.add('cta');
      const [primaryCta, secondaryCta] = [...ctaRow.children];
      if (primaryCta) primaryCta.classList.add('primary');
      if (secondaryCta) secondaryCta.classList.add('secondary');
    }
    if (editorialNote) editorialNote.classList.add('editorial-note');
  }

  if (imageRow) {
    imageRow.classList.add('image');
    const [image, caption] = [...imageRow.children];
    if (caption) caption.classList.add('caption');
  }
}
