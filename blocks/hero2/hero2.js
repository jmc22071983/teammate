export default function decorate(block) {
  // El modelo (_hero2.json) usa "field collapse" (image/imageAlt) y "element grouping"
  // (prefijos content_* y meta_*) para no superar el limite de 4 celdas por bloque
  // (regla xwalk/max-cells). Por eso el bloque solo tiene 4 divs hijos directos:
  // 1) imagen, 2) eyebrow, 3) grupo "content" (headline, intro, CTA, enlace secundario),
  // 4) grupo "meta" (nota editorial, leyenda de imagen).
  // Cada campo del modelo llega como un div hijo, nunca como block.dataset.*.
  const [imageRow, eyebrowRow, contentRow, metaRow] = [...block.children];

  const picture = imageRow?.querySelector('picture');
  const eyebrow = eyebrowRow?.textContent.trim();

  // Dentro de un grupo, cada subcampo se renderiza como un elemento hermano (en el
  // orden declarado en el modelo). Se distinguen por su contenido, no por su indice,
  // para ser robustos frente a la etiqueta exacta que genere el motor de AEM.
  const contentParts = contentRow ? [...contentRow.children] : [];
  const linkParts = contentParts
    .map((el) => (el.tagName === 'A' ? el : el.querySelector('a')))
    .filter(Boolean);
  const textParts = contentParts.filter((el) => !el.querySelector('a') && el.tagName !== 'A');
  const [headlineEl, introEl] = textParts;
  const [ctaLink, secondaryLink] = linkParts;

  const metaParts = metaRow ? [...metaRow.children] : [];
  const [editorialNoteEl, captionEl] = metaParts.length ? metaParts : [metaRow, null];

  const content = document.createElement('div');
  content.className = 'hero2-content';

  if (eyebrow) {
    const eyebrowEl = document.createElement('p');
    eyebrowEl.className = 'hero2-eyebrow';
    eyebrowEl.textContent = eyebrow;
    content.append(eyebrowEl);
  }

  if (headlineEl) {
    headlineEl.classList.add('hero2-headline');
    content.append(headlineEl);
  }

  if (introEl) {
    introEl.classList.add('hero2-intro');
    content.append(introEl);
  }

  const actions = document.createElement('div');
  actions.className = 'hero2-actions';
  if (ctaLink) {
    ctaLink.classList.add('hero2-cta');
    actions.append(ctaLink);
  }
  if (secondaryLink) {
    secondaryLink.classList.add('hero2-secondary-link');
    actions.append(secondaryLink);
  }
  if (actions.children.length) content.append(actions);

  if (editorialNoteEl?.textContent.trim()) {
    editorialNoteEl.classList.add('hero2-editorial-note');
    content.append(editorialNoteEl);
  }

  const media = document.createElement('div');
  media.className = 'hero2-media';
  if (picture) media.append(picture);
  if (captionEl?.textContent.trim()) {
    captionEl.classList.add('hero2-caption');
    media.append(captionEl);
  }

  block.replaceChildren(content, media);
}
