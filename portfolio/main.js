const menuBtnOpen = document.querySelector(".menu-btn-open"),
  menuBtnClose = document.querySelector(".menu-btn-close"),
  sideNav = document.querySelector(".nav-center"),
  menuLinks = document.querySelectorAll(".nav-center li");

const darkModeBtn = document.querySelector(".theme-btn");
const body = document.body;
const scrollToTopBtn = document.getElementById("goTopBtn");

darkModeBtn.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    darkModeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    body.classList.add("dark-mode");
    darkModeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
});

menuBtnOpen.addEventListener("click", () => {
  sideNav.classList.add("show");
});

menuBtnClose.addEventListener("click", () => {
  sideNav.classList.remove("show");
});

menuLinks.forEach((menu) => {
  menu.addEventListener("click", () => {
    if (sideNav.classList.contains("show")) {
      sideNav.classList.remove("show");
    }
  });
});

window.onscroll = function () {
  toggleScrollBtn();
};

function toggleScrollBtn() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "block"; 
  } else {
    scrollToTopBtn.style.display = "none"; 
  }
}

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
