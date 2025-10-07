 gsap.registerPlugin(ScrollTrigger);

        let horizontalScrollTween;

        function initHorizontalScroll() {
            // Kill existing ScrollTrigger if it exists
            if (horizontalScrollTween) {
                horizontalScrollTween.kill();
            }

            // Only initialize GSAP horizontal scroll on desktop (width >= 1025px)
            if (window.innerWidth >= 1025) {
                const horizontalSections = gsap.utils.toArray('#horizontalContainer .panel:not(.black)');
                const totalWidth = horizontalSections.length * window.innerWidth * 0.95;
                
                horizontalScrollTween = gsap.to(horizontalSections, {
                    xPercent: -100 * (horizontalSections.length - 1),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.horizontal-wrapper',
                        pin: true,
                        pinSpacing: true,
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (horizontalSections.length - 1),
                            duration: 0.5,
                            ease: 'power1.inOut'
                        },
                        end: () => "+=" + totalWidth,
                        invalidateOnRefresh: true,
                        anticipatePin: 1
                    }
                });
            } else {
                // On mobile/tablet, ensure proper vertical scroll
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.trigger === '.horizontal-wrapper') {
                        trigger.kill();
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
                initHorizontalScroll();
            }, 300);
        });