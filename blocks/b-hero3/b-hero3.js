export default function decorate(block) {
  const [imageRow, titleRow, subtitleRow, buttonsRow] = [...block.children];

  const image = imageRow.querySelector('img');
  const title = titleRow.textContent;
  const subtitle = subtitleRow.textContent;
  const buttons = [...buttonsRow.querySelectorAll('a')];

  const primaryButton = buttons.find((btn) => btn.classList.contains('button-primary'));
  const secondaryButton = buttons.find((btn) => btn.classList.contains('button-secondary'));

  block.innerHTML = `
    <div class="b-hero3">
      <picture>${image.outerHTML}</picture>
      <h1>${title}</h1>
      <p class="subtitle">${subtitle}</p>
      <div class="buttons">
        ${primaryButton.outerHTML}
        ${secondaryButton.outerHTML}
      </div>
    </div>
  `;
}
