// 아이콘 <-> PR 토글
function setupPRToggle(){
  const buttons = document.querySelectorAll('.lift-btn');
  buttons.forEach(btn => {
    // 초기 레이블 세팅
    const pr = btn.dataset.pr;
    const makeLabel = (state) =>
      state === 'pr'
        ? `${btn.classList.contains('bench') ? '벤치프레스' :
             btn.classList.contains('squat') ? '스쿼트' : '데드리프트'} PR 숨기기 (${pr}kg)`
        : `${btn.classList.contains('bench') ? '벤치프레스' :
             btn.classList.contains('squat') ? '스쿼트' : '데드리프트'} PR 보기 (${pr}kg)`;

    const updateA11y = () => {
      const state = btn.dataset.state || 'icon';
      btn.setAttribute('aria-pressed', String(state === 'pr'));
      btn.setAttribute('aria-label', makeLabel(state));
    };

    updateA11y();

    btn.addEventListener('click', () => {
      const next = (btn.dataset.state === 'pr') ? 'icon' : 'pr';
      btn.dataset.state = next;   // CSS가 이 상태 값을 보고 전환
      updateA11y();
    });
  });
}

document.addEventListener('DOMContentLoaded', setupPRToggle);
