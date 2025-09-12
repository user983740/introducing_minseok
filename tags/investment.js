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

// ---- 경로 헬퍼 삭제하고 절대경로로 고정 ----
function researchHref(fileName) {
  return `/research/${encodeURIComponent(fileName)}`;  // public/research/* 를 그대로 가리킴
}