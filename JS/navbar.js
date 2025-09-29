const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.querySelector(".close-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.style.overflow = "";
});
