export default function decorate(block) {
  // El modelo (_hero3.json) usa "field collapse" (image/imageAlt) y "element grouping"
  // (prefijos content_* y meta_*) para no superar el limite de 4 celdas por bloque
  // (regla xwalk/max-cells). Por eso el bloque solo tiene 4 divs hijos directos:
  // 1) imagen, 2) eyebrow, 3) grupo "content" (headline, intro, cta, enlace secundario),
  // 4) grupo "meta" (nota editorial, leyenda de imagen).
  const [, eyebrowRow, contentRow, metaRow] = [...block.children];

  const eyebrow = eyebrowRow?.querySelector('div');
  eyebrow?.classList.add('eyebrow');

  const [headline, intro, cta, secondaryLink] = contentRow
    ? [...contentRow.children]
    : [];
  headline?.classList.add('headline');
  intro?.classList.add('intro');
  cta?.classList.add('cta');
  secondaryLink?.classList.add('secondary-link');

  const [editorialNote, caption] = metaRow ? [...metaRow.children] : [];
  editorialNote?.classList.add('editorial-note');
  caption?.classList.add('image-caption');
}
