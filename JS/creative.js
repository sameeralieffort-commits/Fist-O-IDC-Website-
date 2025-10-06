const leftGrid = document.getElementById('creativeLeftGrid');
const rightGrid = document.getElementById('creativeRightGrid');
const heroContent = document.getElementById('creativeHeroContent');
const videoWrapper = document.getElementById('creativeVideoWrapper') || document.getElementById('creativeVideoContainer')?.parentElement;
const videoContainer = document.getElementById('creativeVideoContainer');
const video = document.getElementById('creativeMainVideo');
const marquee = document.getElementById('creativeMarquee') || document.querySelector('.marquee');
const hero = document.getElementById('creativeHero');
const nextSection = document.getElementById('scrollContainer');

function clamp01(v){ return Math.max(0, Math.min(1, v)); }

function lerp(a,b,t){ return a + (b - a) * t; }

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop;
  const vh = window.innerHeight;

  // total scroll span (tweak as needed)
  const total = vh * 5;
  let p = clamp01(y / total);

  // Optional “pause band”: in this band, hold the final state visually.
  // It’s still reversible: scrolling back moves p out of the band and rewinds.
  const pauseStart = 0.90;
  const pauseEnd = 0.94;
  const inPauseBand = p >= pauseStart && p <= pauseEnd;

  // If you want a very slight slow-down near the pause band, ease p inside the band:
  let visP = p;
  if (inPauseBand) {
    // Map p in [pauseStart,pauseEnd] to a nearly-constant visual progress ~0.90
    const t = (p - pauseStart) / (pauseEnd - pauseStart);
    visP = lerp(pauseStart, pauseStart + 0.01, t); // tiny change -> looks like a pause
  }

  // Phase splits on visP for visuals
  // P1: 0.00–0.30 Grids out, title up
  // P2: 0.40–0.70 Video shrink + play, bg if you have one
  // P3: 0.70–0.90 Grids return, marquee slides up
  // P4: >0.90 Hold state (pause look)
  const p1 = clamp01(visP / 0.30);
  const pTitle = clamp01(visP / 0.40);

  // Grids out (until 0.30)
  if (visP <= 0.30) {
    leftGrid.style.transform = `translateX(${-120 * p1}%)`;
    rightGrid.style.transform = `translateX(${120 * p1}%)`;
  }

  // Title straight up; no fade initially
  const titleY = -400 * pTitle;
  heroContent.style.transform = `translate(-50%, calc(-50% + ${titleY}px))`;
  // Optional small fade after 0.35 only to keep UI readable
  heroContent.style.opacity = (visP < 0.35) ? 1 : Math.max(0, 1 - (visP - 0.35) * 12);

  // P2 video plays and shrinks (50vw -> 35vw)
  if (visP > 0.40 && visP <= 0.70) {
    const t = (visP - 0.40) / 0.30;
    const widthVW = 50 - 15 * t;
    if (videoWrapper) videoWrapper.style.width = `${widthVW}vw`;
    // Autoplay when entering band; pause when leaving on reverse
    if (video.paused) { video.play().catch(()=>{}); }
  } else if (visP <= 0.40) {
    if (videoWrapper) videoWrapper.style.width = `50vw`;
    // Pause when rewinding before play band
    if (!video.paused) video.pause();
  } else if (visP > 0.70) {
    if (videoWrapper) videoWrapper.style.width = `35vw`;
    // Keep playing in later phases; if you need pause after everything: uncomment next line in P4
    // if (visP >= 0.95 && !video.paused) video.pause();
  }

  // P3 grids return and marquee slide up
  if (visP > 0.70 && visP <= 0.90) {
    const t = (visP - 0.70) / 0.20;
    leftGrid.style.transform = `translateX(${-120 + 120 * t}%)`;
    rightGrid.style.transform = `translateX(${120 - 120 * t}%)`;

    if (marquee) {
      const bottomPx = -80 + 80 * t; // -80 -> 0
      marquee.style.bottom = `${bottomPx}px`;
      marquee.style.opacity = String(t);
      // match marquee width to current video width (in pixels)
      const vwWidth = parseFloat(getComputedStyle(videoWrapper || videoContainer).width);
      marquee.style.width = `${vwWidth}px`;
    }
  }

  // Keep marquee width synced outside P3 too
  if (marquee) {
    const vwWidth = parseFloat(getComputedStyle(videoWrapper || videoContainer).width);
    marquee.style.width = `${vwWidth}px`;
  }

  // P4 “pause look”: hold final state while in pause band; do not hide hero permanently
  if (visP > 0.90) {
    // Final visual state
    leftGrid.style.transform = `translateX(0%)`;
    rightGrid.style.transform = `translateX(0%)`;
    if (marquee) {
      marquee.style.bottom = `0px`;
      marquee.style.opacity = `1`;
    }
    if (videoWrapper) videoWrapper.style.width = `35vw`;
  }

  // Reveal next section only when user scrolls past the pause band end
  if (p >= pauseEnd) {
    hero.style.opacity = '0';
    nextSection.classList.add('visible');
  } else {
    hero.style.opacity = '1';
    nextSection.classList.remove('visible');
  }

  // Never set display:none based on one-shot events; always let reverse scroll restore state
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { onScroll(); ticking = false; });
    ticking = true;
  }
});
onScroll();
