export default function decorate(block) {
  const [title, subtitle, buttons] = [...block.children];

  const titleText = title.querySelector('div').textContent;
  const subtitleText = subtitle.querySelector('div').textContent;
  const buttonLinks = [...buttons.querySelectorAll('a')];

  block.innerHTML = `
    <div class="b-hero2-wrapper">
      <h1>${titleText}</h1>
      <h2>${subtitleText}</h2>
      <div class="buttons">
        ${buttonLinks.map((btn, i) => `<a href="${btn.href}" class="${i === 0 ? 'primary' : 'secondary'}">${btn.textContent}</a>`).join('')}
      </div>
    </div>
  `;
}
