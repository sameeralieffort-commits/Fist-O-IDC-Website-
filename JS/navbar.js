const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Open/Close menu on hamburger click
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking any link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Optional: Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});




//OUR WORK SCROLL TO PAGE JS


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 80; // adjust based on navbar height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

