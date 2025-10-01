// Get the button
  const backToTopButton = document.getElementById("backToTop");

  // Show button when scrolled down 300px
  window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };

  // Scroll to top on button click
  backToTopButton.addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });