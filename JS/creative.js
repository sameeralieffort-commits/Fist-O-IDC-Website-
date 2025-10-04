const creativeLeftGrid = document.getElementById('creativeLeftGrid');
const creativeRightGrid = document.getElementById('creativeRightGrid');
const creativeHeroContent = document.getElementById('creativeHeroContent');
const creativeVideoContainer = document.getElementById('creativeVideoContainer');
const creativeMainVideo = document.getElementById('creativeMainVideo');

let hasPlayedCreativeVideo = false;

function handleCreativeScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollTop / (maxScroll * 0.5), 1);

  const leftGridTransform = -progress * 100;
  const rightGridTransform = progress * 100;
  const titleTransformY = -progress * 200;
  const titleOpacity = Math.max(1 - progress * 2, 0);

  const videoScale = progress > 0.6 ? Math.max(1 - (progress - 0.6) * 2, 0.4) : 1;

  const gridReturnProgress = Math.max((progress - 0.7) / 0.3, 0);
  const leftGridReturn = -100 + gridReturnProgress * 100;
  const rightGridReturn = 100 - gridReturnProgress * 100;

  if (progress > 0.6) {
    creativeLeftGrid.style.transform = `translateX(${leftGridReturn}%)`;
    creativeRightGrid.style.transform = `translateX(${rightGridReturn}%)`;
  } else {
    creativeLeftGrid.style.transform = `translateX(${leftGridTransform}%)`;
    creativeRightGrid.style.transform = `translateX(${rightGridTransform}%)`;
  }

  creativeHeroContent.style.transform = `translateY(${titleTransformY}px)`;
  creativeHeroContent.style.opacity = titleOpacity;
  creativeVideoContainer.style.transform = `scale(${videoScale})`;

  if (progress > 0.4 && !hasPlayedCreativeVideo) {
    creativeMainVideo.play().catch(err => console.log('Video autoplay prevented:', err));
    hasPlayedCreativeVideo = true;
  }
}

// Scroll performance optimization
let creativeTicking = false;
window.addEventListener('scroll', () => {
  if (!creativeTicking) {
    window.requestAnimationFrame(() => {
      handleCreativeScroll();
      creativeTicking = false;
    });
    creativeTicking = true;
  }
});

handleCreativeScroll();
