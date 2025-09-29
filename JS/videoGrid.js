document.querySelectorAll(".video-container").forEach(container => {
  const video = container.querySelector(".hover-video");
  const playButton = container.querySelector(".play-button");

  // Start paused and button visible
  video.pause();
  playButton.style.opacity = "1";

  // Play video on hover and hide button
  container.addEventListener("mouseenter", () => {
    video.play();
    playButton.style.opacity = "0";
  });
  container.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
    playButton.style.opacity = "1";
  });

  // Optional: play/pause toggle on button click
  playButton.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      playButton.style.opacity = "0";
    } else {
      video.pause();
      playButton.style.opacity = "1";
      video.currentTime = 0;
    }
  });
});







// button js



const videoFlex = document.querySelector('.video-flex');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const scrollAmount = 300; // Adjust scroll step per click

scrollLeftBtn.addEventListener('click', () => {
  videoFlex.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  videoFlex.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});
