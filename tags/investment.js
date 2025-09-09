const track = document.getElementById("sliderTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
let total = track.children.length;
let perPage = 3;  // 한 화면에 보여줄 개수

function updateSlider() {
  const slideWidth = track.children[0].getBoundingClientRect().width;
  track.style.transform = `translateX(${-index * slideWidth}px)`;

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= total - perPage;
}

prevBtn.addEventListener("click", () => {
  if (index > 0) index--;
  updateSlider();
});

nextBtn.addEventListener("click", () => {
  if (index < total - perPage) index++;
  updateSlider();
});

track.addEventListener("click", (e) => {
  const card = e.target.closest(".slide");
  if (!card) return;
  const file = card.dataset.file;
  if (!file) return;

  const href = researchHref(file);
  window.open(href, "_blank", "noopener");
});

// 초기 실행
window.addEventListener("load", updateSlider);
window.addEventListener("resize", updateSlider);

// ---- 경로 헬퍼: 로컬/배포 모두 동작 ----
function basePath() {
  // URL에서 introducing_minseok까지 포함된 prefix를 찾아 루트로 사용
  const m = location.pathname.match(/^(.*\/introducing_minseok\/)/);
  // 로컬에서 루트가 워크스페이스인 경우: "/…/introducing_minseok/" 반환
  // Vercel 등 배포에서 사이트 루트가 introducing_minseok인 경우: null → "/"
  return m ? m[1] : '/';
}
function researchHref(fileName) {
  return `${basePath()}research/${encodeURIComponent(fileName)}`;
}
