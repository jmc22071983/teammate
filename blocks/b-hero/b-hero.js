export default function decorate(block) {
  const [titleRow, subtitleRow, buttonsRow] = [...block.children];

  const title = titleRow?.querySelector('div')?.textContent || '';
  const subtitle = subtitleRow?.querySelector('div')?.textContent || '';
  const buttons = [...buttonsRow?.querySelectorAll('a')];

  block.innerHTML = `<div class="b-hero">
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="buttons">
      ${buttons.map((btn) => `<a href="${btn.href}" class="button">${btn.textContent}</a>`).join('')}
    </div>
  </div>`;
}