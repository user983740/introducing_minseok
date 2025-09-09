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

// 카드 클릭 → 새 탭
track.addEventListener("click", (e) => {
  const card = e.target.closest(".slide");
  if (!card) return;
  const href = card.dataset.href;
  if (href) window.open(encodeURI(href), "_blank", "noopener");
});

// 초기 실행
window.addEventListener("load", updateSlider);
window.addEventListener("resize", updateSlider);
