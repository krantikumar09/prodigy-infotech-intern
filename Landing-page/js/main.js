// navbar
const navbar = document.getElementById("navbar");

window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-shadow', window.scrollY > 0)
})


// mobile nav
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active")
})