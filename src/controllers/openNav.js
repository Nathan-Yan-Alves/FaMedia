let btnOpenNav = document.querySelector(".openNav");
let sidenav = document.querySelector(".sideNav");

function sidenavToggle() {
    sidenav.classList.toggle("sideNavToggle");
}

btnOpenNav.addEventListener("click", () => {
    sidenavToggle();
});
