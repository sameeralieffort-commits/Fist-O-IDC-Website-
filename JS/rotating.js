const circle = document.querySelector('.circle');
let currentRotation = 0;
let animationId = null;
let autoRotateSpeed = -.09; // negative: counter-clockwise

function autoRotate() {
  currentRotation += autoRotateSpeed;
  setCircleRotation();
  animationId = requestAnimationFrame(autoRotate);
}

// Set transform including scale for responsiveness
function setCircleRotation() {
  // Get current scale
  const style = getComputedStyle(document.documentElement);
  const scale = style.getPropertyValue('--carouselScale') || 1;
  circle.style.transform = `translateX(-50%) rotate(${currentRotation}deg) scale(${scale})`;
}

// Start auto-rotation
autoRotate();

// Pause auto-rotation on manual scroll
window.addEventListener('wheel', (e) => {
  // Stop the loop
  cancelAnimationFrame(animationId);
  // Scroll down = rotate left, scroll up = rotate right
  currentRotation += e.deltaY * -0.2;
  setCircleRotation();
});

// Resume auto-spin after user stops scrolling
let wheelTimeout;
window.addEventListener('wheel', () => {
  clearTimeout(wheelTimeout);
  wheelTimeout = setTimeout(() => {
    autoRotate();
  }, 1000); // 1 second after last wheel, resume auto
});
