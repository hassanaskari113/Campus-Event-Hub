// ---------- Hamburger Menu Toggle ----------
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburgerBtn.classList.toggle("open");
});

// Close menu when a link is clicked (mobile UX improvement)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburgerBtn.classList.remove("open");
  });
});
