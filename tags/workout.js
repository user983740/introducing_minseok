// 아이콘 <-> PR 토글
document.querySelectorAll('.lift-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const st = btn.getAttribute('data-state');
    btn.setAttribute('data-state', st === 'icon' ? 'pr' : 'icon');
    btn.setAttribute('aria-pressed', st === 'icon' ? 'true' : 'false');
  });
});
