let blankPage = document.querySelector(".load-page");

function checkLogin() {
    if (location.search == "") {
        location.href = "/src/views/index.html";
    } else {
        setTimeout(() => {
            blankPage.classList.add("hidden");
        }, 3000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
});
