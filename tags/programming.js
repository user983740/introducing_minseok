const FIXED_HANDLE = '100gimchii';

// solved.ac 위젯 렌더링
function renderSolvedWidgets(handle = FIXED_HANDLE){
  // 혼합 콘텐츠 방지: https 사용
  const tierBadgeUrl = `https://mazassumnida.wtf/api/v2/generate_badge?boj=${encodeURIComponent(handle)}`;
  const streakUrl    = `https://mazandi.herokuapp.com/api?handle=${encodeURIComponent(handle)}&theme=warm`;

  document.getElementById('tierBadge').src  = tierBadgeUrl;
  document.getElementById('tierLink').href  = `https://solved.ac/${encodeURIComponent(handle)}`;
  document.getElementById('streakImg').src  = streakUrl;
}

// 초기화: 고정 핸들 바로 렌더
document.addEventListener('DOMContentLoaded', () => {
  renderSolvedWidgets();
});
