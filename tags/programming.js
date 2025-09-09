const STORAGE_KEY = 'bojHandle';
const dialogEl = document.getElementById('handleDialog');
const handleBtn = document.getElementById('handleBtn');
const inputEl  = document.getElementById('bojHandle');
const saveBtn  = document.getElementById('saveHandle');

function getQSHandle(){
  const u = new URL(location.href);
  const h = u.searchParams.get('boj');
  return h && h.trim();
}
function getHandle(){ return localStorage.getItem(STORAGE_KEY) || ''; }
function setHandle(h){ localStorage.setItem(STORAGE_KEY, h.trim()); renderSolvedWidgets(); }

handleBtn.addEventListener('click', ()=>{
  inputEl.value = getHandle();
  dialogEl.showModal();
});
saveBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  const v = inputEl.value.trim();
  if(!v){ alert('BOJ 아이디를 입력해 주세요.'); return; }
  setHandle(v); dialogEl.close();
});

// solved.ac 위젯
function renderSolvedWidgets(){
  const handle = getHandle() || 'guest';
  const tierBadgeUrl = `http://mazassumnida.wtf/api/v2/generate_badge?boj=${encodeURIComponent(handle)}`;
  const streakUrl    = `http://mazandi.herokuapp.com/api?handle=${encodeURIComponent(handle)}&theme=warm`;
  document.getElementById('tierBadge').src = tierBadgeUrl;
  document.getElementById('tierLink').href = `https://solved.ac/${encodeURIComponent(handle)}`;
  document.getElementById('streakImg').src = streakUrl;
}

// init: URL 쿼리 > 저장값 > 기본 100gimchii
(function init(){
  const qs = getQSHandle();
  if(qs){ setHandle(qs); }
  else if(!getHandle()){ setHandle('100gimchii'); }
  else renderSolvedWidgets();
})();
