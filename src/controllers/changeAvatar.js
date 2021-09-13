let avatar = document.querySelector("#changeAvatar");
let avatarContainer = document.querySelector(".changeAvatar-container");

function changeIcon(white = true) {
    if (white) {
        avatarContainer.children[0].src = "/public/images/settings-white.png";
    } else {
        avatarContainer.children[0].src = "/public/images/settings.png";
    }
}

function openSettings() {
    avatarContainer.classList.toggle("hidden");
}

avatar.addEventListener("click", () => {
    openSettings();
});

avatarContainer.addEventListener("mouseover", () => {
    changeIcon(true);
});

avatarContainer.addEventListener("mouseout", () => {
    changeIcon(false);
});
