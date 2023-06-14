const navbarToggle = document.getElementById("navbar-toggle");
const collapseMenu = document.getElementById("collapse-menu");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("collapsed");
  collapseMenu.classList.toggle("collapsed");
});