const toggleBtn = document.querySelector(".hamburger");
const dropDown = document.querySelector(".drop-down");
const navItems = document.querySelectorAll(".nav-item");

toggleBtn.addEventListener("click", e => {
  e.stopPropagation();
  dropDown.classList.toggle("active");
});
document.addEventListener("click", () => {
  dropDown.classList.remove("active");
});
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    dropDown.classList.remove("active");
  }
});
const images = ["images/banner_1_reponsive.png", "images/banner-5.jpg"];

const bannerDiv = document.querySelector(".banner");
let currentIndex = 0;

const slideBanner = () => {
  currentIndex = (currentIndex + 1) % images.length;
  bannerDiv.style.backgroundImage = `url(${images[currentIndex]})`;
};

setInterval(slideBanner, 3000);
