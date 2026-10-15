export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows[0];
  const subtitleRow = rows[1];
  const buttonsRow = rows[2];

  const title = titleRow && titleRow.querySelector('div') ? titleRow.querySelector('div').textContent : '';
  const subtitle = subtitleRow && subtitleRow.querySelector('div') ? subtitleRow.querySelector('div').textContent : '';
  const buttons = buttonsRow ? [...buttonsRow.querySelectorAll('a')] : [];

  block.innerHTML = `<div class="b-hero">
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="buttons">
      ${buttons.map((btn) => `<a href="${btn.href}" class="button">${btn.textContent}</a>`).join('')}
    </div>
  </div>`;
}
