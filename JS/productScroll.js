window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  function getViewportWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  // Desktop horizontal scroll
  function setupDesktop() {
    const panels = gsap.utils.toArray(".horizontal-container .panel");
    const container = document.querySelector(".horizontal-container");
    const vw = getViewportWidth();

    // Set container width
    container.style.width = `${panels.length * vw}px`;
    panels.forEach((panel) => (panel.style.width = `${vw}px`));

    // Scroll container height
    const scrollContainer = document.querySelector(".scroll-container");
    const totalHeight = panels.length * vw + window.innerHeight;
    scrollContainer.style.height = `${totalHeight}px`;

    // Start panels off-screen right
    gsap.set(container, { x: vw });

    // Animate panels left on scroll
    gsap.to(container, {
      x: () => -(panels.length - 1) * vw,
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + panels.length * vw,
        scrub: true,
        pin: ".horizontal-wrapper",
        pinSpacing: true,
        anticipatePin: 1,
      },
    });
  }

  // Tablet/Mobile fallback (vertical scroll)
  function setupVertical() {
    const container = document.querySelector(".horizontal-container");
    const panels = document.querySelectorAll(".panel");
    const scrollContainer = document.querySelector(".scroll-container");
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    container.style.width = "100vw";
    container.style.display = "block";
    container.style.transform = "none";
    container.style.position = "relative";

    panels.forEach((panel) => {
      panel.style.width = vw + "px";
      panel.style.height = vh + "px";
      panel.style.position = panel.classList.contains("black")
        ? "fixed"
        : "relative";
      panel.style.top = panel.classList.contains("black") ? "0" : "auto";
      panel.style.left = panel.classList.contains("black") ? "0" : "auto";
      panel.style.transform = "none";
      panel.style.position = "relative";
      panel.style.zIndex = panel.classList.contains("black") ? 10 : 1; // black panel on top
    });

    scrollContainer.style.height = vh * panels.length + "px";

    gsap.to(container, {
      y: () => -vh * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: () => "+=" + vh * (panels.length - 1),
        scrub: true,
        pin: ".horizontal-wrapper",
        pinSpacing: true,
        anticipatePin: 1,
      },
    });
  }

  // Init
  function init() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (window.innerWidth >= 1200) {
      setupDesktop();
    } else {
      setupVertical();
    }
    ScrollTrigger.refresh();
  }

  init();

  // Resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => init(), 150);
  });
});
