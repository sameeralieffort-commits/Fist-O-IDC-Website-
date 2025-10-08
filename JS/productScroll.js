gsap.registerPlugin(ScrollTrigger);

let horizontalScrollTween;

function initHorizontalScroll() {
    // Kill existing ScrollTrigger if it exists
    if (horizontalScrollTween) {
        horizontalScrollTween.kill();
    }

    // Only initialize GSAP horizontal scroll on desktop (width >= 1025px)
    if (window.innerWidth >= 1025) {
        const horizontalContainer = document.getElementById('horizontalContainer');
        const horizontalSections = gsap.utils.toArray('#horizontalContainer .panel:not(.black)');
        
        // Set initial position to 80vw right
        gsap.set(horizontalContainer, { x: '80vw' });
        
        const totalWidth = horizontalSections.length * window.innerWidth * 0.67;
        
        horizontalScrollTween = gsap.to(horizontalContainer, {
            x: () => -(totalWidth - window.innerWidth * 0.2), // End position accounting for initial offset
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-wrapper',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: 'top top',
                end: () => "+=" + (totalWidth + window.innerWidth * 0.8),
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    } else {
        // On mobile/tablet, reset horizontal transform and set vertical offset
        const horizontalContainer = document.getElementById('horizontalContainer');
        gsap.set(horizontalContainer, { clearProps: 'x' });
        
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === '.horizontal-wrapper') {
                trigger.kill();
            }
        });
        
        // Set initial position to 80vh below (so black panel is visible)
        gsap.set(horizontalContainer, { y: window.innerHeight * 0.8 });
        
        // Create vertical scroll animation for mobile
        const horizontalSections = gsap.utils.toArray('#horizontalContainer .panel:not(.black)');
        const totalHeight = horizontalSections.length * window.innerHeight * 0.10;
        
        horizontalScrollTween = gsap.to(horizontalContainer, {
            y: () => -(totalHeight - window.innerHeight * 0.2),
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-wrapper',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                start: 'top top',
                end: () => "+=" + (totalHeight + window.innerHeight * 0.8),
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    }
}

// Initialize on load
window.addEventListener('load', () => {
    initHorizontalScroll();
});

// Re-initialize on resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        initHorizontalScroll();
    }, 300);
});