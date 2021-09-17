let blankPage = document.querySelector(".load-page");

function checkLogin() {
    if (location.search == "") {
        location.href = "/src/views/login.html";
    } else {
        setTimeout(() => {
            blankPage.classList.add("hidden");
        }, 2500);
    }
}

window.addEventListener("load", () => {
    checkLogin();
});
