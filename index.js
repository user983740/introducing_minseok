// 1) Interests 버블에 "반짝" 하이라이트가 마우스 위치를 따라오게.
function setupBubbleSparkle() {
  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(b => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      b.style.setProperty('--mx', `${x}px`);
      b.style.setProperty('--my', `${y}px`);
    });
  });
}

// 2) Footer의 Last updated 표시(문서 수정 시각 사용).
function setLastUpdated() {
  const el = document.getElementById('last-updated');
  if (!el) return;
  const d = new Date(document.lastModified || Date.now());
  const pad = (n) => String(n).padStart(2, '0');
  const txt = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  el.textContent = txt;
}

document.addEventListener('DOMContentLoaded', () => {
  setupBubbleSparkle();
  setLastUpdated();
});
