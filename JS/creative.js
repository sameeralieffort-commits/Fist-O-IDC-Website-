const verticalScrollWrap = document.querySelector('.vertical-scroll-wrapper');
const heroHeadingElement = document.getElementById('heroHeadingText');
const mainVideoElement = document.getElementById('mainVideoPlayer');
const videoPlayer = mainVideoElement.querySelector('video'); // Get the video element
const leftGalleryContainer = document.getElementById('leftGalleryImages');
const rightGalleryContainer = document.getElementById('rightGalleryImages');
const brandSliderElement = document.getElementById('brandMarqueeSlider');
const canvasBackdropElement = document.getElementById('canvasBackdrop');

// Get screen width for responsive adjustments
function calculateResponsiveValues() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 360) {
        return { moveDistance: 300, finalOffset: 30 };
    } else if (screenWidth <= 480) {
        return { moveDistance: 350, finalOffset: 35 };
    } else if (screenWidth <= 768) {
        return { moveDistance: 400, finalOffset: 40 };
    } else if (screenWidth <= 1024) {
        return { moveDistance: 450, finalOffset: 45 };
    } else {
        return { moveDistance: 500, finalOffset: 50 };
    }
}

window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset;
    const maximumScroll = verticalScrollWrap.offsetHeight - window.innerHeight;
    const scrollPercentage = currentScrollTop / maximumScroll;
    const responsiveValues = calculateResponsiveValues();

    // Phase 1: Initial state - Images move out (0% - 25%)
    if (scrollPercentage < 0.25) {
        const phaseProgress = scrollPercentage / 0.25;
        
        leftGalleryContainer.style.transform = `translate(calc(-50% - ${phaseProgress * responsiveValues.moveDistance}px), -50%)`;
        leftGalleryContainer.style.opacity = 1;
        
        rightGalleryContainer.style.transform = `translate(calc(50% + ${phaseProgress * responsiveValues.moveDistance}px), -50%)`;
        rightGalleryContainer.style.opacity = 1;
        
        heroHeadingElement.style.opacity = 1;
        heroHeadingElement.style.transform = 'translate(-50%, -50%)';
        
        // Video visible but paused
        mainVideoElement.style.opacity = 1;
        videoPlayer.pause();
        
        canvasBackdropElement.style.opacity = 0;
        brandSliderElement.style.opacity = 0;
    }
    
    // Phase 2: Text moves up, video starts playing (25% - 50%)
    else if (scrollPercentage < 0.5) {
        const phaseProgress = (scrollPercentage - 0.25) / 0.25;
        
        leftGalleryContainer.style.transform = `translate(calc(-50% - ${responsiveValues.moveDistance}px), -50%)`;
        leftGalleryContainer.style.opacity = 1;
        rightGalleryContainer.style.transform = `translate(calc(50% + ${responsiveValues.moveDistance}px), -50%)`;
        rightGalleryContainer.style.opacity = 1;
        
        heroHeadingElement.style.opacity = 1 - phaseProgress;
        heroHeadingElement.style.transform = `translate(-50%, calc(-50% - ${phaseProgress * 200}px))`;
        
        // Video visible and playing
        mainVideoElement.style.opacity = 1;
        mainVideoElement.style.transform = 'translate(-50%, -50%)';
        
        // Start playing video when heading starts moving up
        if (videoPlayer.paused) {
            videoPlayer.play().catch(error => {
                console.log('Video play error:', error);
            });
        }
        
        canvasBackdropElement.style.opacity = 0;
        brandSliderElement.style.opacity = 0;
    }
    
    // Phase 3: Canvas appears, video shrinks to center, elements come inside (50% - 75%)
    else if (scrollPercentage < 0.75) {
        const phaseProgress = (scrollPercentage - 0.5) / 0.25;
        
        heroHeadingElement.style.opacity = 0;
        
        // Show canvas
        canvasBackdropElement.style.opacity = phaseProgress * 0.95;
        
        // Video shrinks and stays centered in canvas, continues playing
        const videoScaleFactor = 1.8 - (phaseProgress * 0.6);
        mainVideoElement.style.opacity = 1;
        mainVideoElement.style.transform = `translate(-50%, -50%) scale(${videoScaleFactor})`;
        mainVideoElement.style.zIndex = 5;
        
        // Ensure video is playing
        if (videoPlayer.paused) {
            videoPlayer.play().catch(error => {
                console.log('Video play error:', error);
            });
        }
        
        // Left elements move inside canvas (left side)
        const leftPositionX = -responsiveValues.moveDistance + (phaseProgress * (responsiveValues.moveDistance - responsiveValues.finalOffset));
        const leftPositionY = phaseProgress * -8;
        leftGalleryContainer.style.transform = `translate(calc(-50% + ${leftPositionX}px), calc(-50% + ${leftPositionY}%))`;
        leftGalleryContainer.style.opacity = 1;
        
        // Right elements move inside canvas (right side)
        const rightPositionX = responsiveValues.moveDistance - (phaseProgress * (responsiveValues.moveDistance - responsiveValues.finalOffset));
        const rightPositionY = phaseProgress * -8;
        rightGalleryContainer.style.transform = `translate(calc(50% + ${rightPositionX}px), calc(-50% + ${rightPositionY}%))`;
        rightGalleryContainer.style.opacity = 1;
        
        brandSliderElement.style.opacity = 0;
    }
    
    // Phase 4: Final state - marquee appears (75% - 100%)
    else {
        const phaseProgress = (scrollPercentage - 0.75) / 0.25;
        
        heroHeadingElement.style.opacity = 0;
        
        // Canvas fully visible
        canvasBackdropElement.style.opacity = 0.95;
        
        // Video at final size, centered, and playing
        mainVideoElement.style.opacity = 1;
        mainVideoElement.style.transform = `translate(-50%, -50%) scale(0.8)`;
        mainVideoElement.style.zIndex = 15;
        
        // Ensure video is playing
        if (videoPlayer.paused) {
            videoPlayer.play().catch(error => {
                console.log('Video play error:', error);
            });
        }
        
        // Left elements in final position (inside canvas, left side)
        leftGalleryContainer.style.transform = `translate(calc(-10% - ${responsiveValues.finalOffset}px), calc(-50% - 8%)) scale(0.85`;
        leftGalleryContainer.style.opacity = 1;
        
        // Right elements in final position (inside canvas, right side)
        rightGalleryContainer.style.transform = `translate(calc(10% + ${responsiveValues.finalOffset}px), calc(-50% - 8%)) scale(0.85`;
        rightGalleryContainer.style.opacity = 1;
        
        // Show marquee below canvas
        brandSliderElement.style.opacity = phaseProgress;
    }
});

// Trigger initial animation
window.dispatchEvent(new Event('scroll'));

// Re-calculate on window resize
let resizeDelayTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeDelayTimer);
    resizeDelayTimer = setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});
