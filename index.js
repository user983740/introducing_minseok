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

// 3) 비눗방울 물리(벽/서로 튕김: 완전탄성충돌 + 속도 1.3배)
function setupBubbleMotion() {
  const cloud = document.getElementById('bubble-cloud');
  if (!cloud) return;

  const els = Array.from(cloud.querySelectorAll('.bubble'));

  const state = els.map(el => {
    const cs = getComputedStyle(el);
    const dStr = cs.getPropertyValue('--r') || el.style.getPropertyValue('--r');
    const diameter = parseFloat(dStr);
    const radius = diameter / 2;

    const xPct = parseFloat(el.style.getPropertyValue('--x'));
    const yPct = parseFloat(el.style.getPropertyValue('--y'));

    const w = cloud.clientWidth;
    const h = cloud.clientHeight;
    const x = (xPct / 100) * w; // % 단위로 관리하여 컨테이너 크기 바뀌어도 어색x
    const y = (yPct / 100) * h; // % 단위로 관리하여 컨테이너 크기 바뀌어도 어색x

    const angle = Math.random() * Math.PI * 2;
    const speed = 70 + (Math.random() * 80 - 40);

    return {
      el,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: radius
    };
  });

  let last = performance.now();

  function reflect(vx, vy, nx, ny) {
    const dot = vx * nx + vy * ny;
    return [vx - 2 * dot * nx, vy - 2 * dot * ny];
  }

  function step(now) {
    const dt = Math.min(0.032, (now - last) / 1000);
    last = now;

    const w = cloud.clientWidth;
    const h = cloud.clientHeight;

    // 위치 업데이트 + 벽 충돌(속력 보존)
    for (const b of state) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      if (b.x < b.r)  { b.x = b.r;       b.vx *= -1; }
      if (b.x > w-b.r){ b.x = w - b.r;   b.vx *= -1; }
      if (b.y < b.r)  { b.y = b.r;       b.vy *= -1; }
      if (b.y > h-b.r){ b.y = h - b.r;   b.vy *= -1; }
    }

    // 버블끼리 충돌: 완전탄성(각자의 속력 magnitude 보존, 법선 성분 반전)
    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        const a = state[i], b = state[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const minDist = a.r + b.r;

        if (dist > 0 && dist < minDist) {
          const nx = dx / dist;
          const ny = dy / dist;

          // 1) 겹침 해소: 반반 밀기
          const overlap = minDist - dist;
          const half = overlap / 2;
          a.x -= nx * half; a.y -= ny * half;
          b.x += nx * half; b.y += ny * half;

            const [avx, avy] = reflect(a.vx, a.vy, nx, ny);
            const [bvx, bvy] = reflect(b.vx, b.vy, nx, ny);
            a.vx = avx; a.vy = avy;
            b.vx = bvx; b.vy = bvy;
        }
      }
    }

    // 화면 반영: 내부 px 좌표 → %로 바꿔 CSS 변수에 넣기
    for (const b of state) {
      const xPct = (b.x / w) * 100;
      const yPct = (b.y / h) * 100;
      b.el.style.setProperty('--x', xPct.toFixed(4) + '%');
      b.el.style.setProperty('--y', yPct.toFixed(4) + '%');
    }

    requestAnimationFrame(step);
  }

  function onResize() {
    const w = cloud.clientWidth, h = cloud.clientHeight;
    for (const b of state) {
      const xPct = parseFloat(b.el.style.getPropertyValue('--x')) || 0;
      const yPct = parseFloat(b.el.style.getPropertyValue('--y')) || 0;
      b.x = (xPct / 100) * w;
      b.y = (yPct / 100) * h;
    }
  }

  window.addEventListener('resize', onResize);
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
  setupBubbleSparkle();
  setLastUpdated();
  setupBubbleMotion();
});
