// Get the button
const backToTopButton = document.getElementById("backToTop");

// Show button when scrolled down 300px
window.onscroll = function () {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Scroll to top on button click
backToTopButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



// in contacus page click the our-work 

window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => {
      const hash = window.location.hash;
      const targetElement = document.querySelector(hash);

      if (targetElement) {
        const headerHeight = 80; // Adjust to your header height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  }
});
