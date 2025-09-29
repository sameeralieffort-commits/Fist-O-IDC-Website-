window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  const panels = gsap.utils.toArray(".panel");

  function getViewportWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  // --- Common Functions ---
  function updateWidth() {
    const container = document.querySelector('.horizontal-container');
    const panelEls = document.querySelectorAll('.panel');
    const vw = getViewportWidth();
    container.style.width = `${panelEls.length * vw}px`;
    panelEls.forEach(panel => {
      panel.style.width = `${vw}px`;
    });
  }

  function updateScrollContainerHeight() {
    const scrollContainer = document.querySelector('.scroll-container');
    const panelEls = document.querySelectorAll('.panel');
    const vw = getViewportWidth();
    const totalHeight = (panelEls.length - 1) * vw + window.innerHeight * 0.8;
    scrollContainer.style.height = `${totalHeight}px`;
  }

  function updateScrollContainerHeightMobile() {
    const scrollContainer = document.querySelector('.scroll-container');
    const panelEls = document.querySelectorAll('.panel');
    const totalHeight = panelEls.length * window.innerHeight;
    scrollContainer.style.height = `${totalHeight}px`;
  }

  // --- Desktop ---
  function setupDesktop() {
    updateWidth();
    updateScrollContainerHeight();

    gsap.to(".horizontal-container", {
      x: () => - (panels.length - 1) * getViewportWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + ((panels.length - 2) * getViewportWidth() + window.innerHeight * 1.91),
        scrub: true,
        pin: ".horizontal-wrapper",
        pinSpacing: true,
        anticipatePin: 1,
        snap: 1 / (panels.length - 1),
        markers: true
      }
    });
  }

  // --- Tablet (similar to desktop, but you can tune end/snap) ---
  function setupTablet() {
    updateWidth();
    updateScrollContainerHeight();

    gsap.to(".horizontal-container", {
      x: () => - (panels.length - 1) * getViewportWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + ((panels.length - 1) * getViewportWidth()), // shorter end
        scrub: true,
        pin: ".horizontal-wrapper",
        pinSpacing: true,
        snap: 1 / (panels.length - 1.5),
        markers: true
      }
    });
  }

  // --- Mobile ---
  function setupMobile() {
    const container = document.querySelector('.horizontal-container');
    container.style.width = ''; // reset desktop width
    document.querySelectorAll('.panel').forEach(p => p.style.width = '100vw');

    updateScrollContainerHeightMobile();

    gsap.to(".horizontal-container", {
      y: () => - (panels.length - 1) * window.innerHeight,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "+=" + ((panels.length - 2)  * getViewportWidth() + window.innerHeight * 1.91),
        scrub: true,
        pin: ".horizontal-wrapper",
        pinSpacing: true,
        snap: 1 / (panels.length - 0.8),
        markers: true
      }
    });
  }

  // --- Init ---
  function init() {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const container = document.querySelector('.horizontal-container');
    container.style.transform = '';
    document.querySelectorAll('.panel').forEach(p => p.style.transform = '');

    if (window.innerWidth <= 768) {
      setupMobile();
    } else if (window.innerWidth <= 1200) {
      setupTablet();
    } else {
      setupDesktop();
    }

    ScrollTrigger.refresh();
  }

  init();

  // --- Resize handler ---
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      init();
    }, 120);
  });
});
