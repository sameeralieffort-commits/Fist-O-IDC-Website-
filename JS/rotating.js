  // Scroll controls rotation
    const circle = document.querySelector('.circle');
    let currentRotation = 0;

    window.addEventListener('wheel', (e) => {
      // Scroll down = rotate left, up = rotate right
      currentRotation += e.deltaY * 0.1; 
      circle.style.animation = 'none'; // stop auto animation when scrolling
      circle.style.transform = `translateX(-50%) rotate(${currentRotation}deg) scale(var(--carouselScale))`;
    });