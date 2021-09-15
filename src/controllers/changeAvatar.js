let inpFileAvatar = document.querySelector("#filesAvatar");
let avatar = document.querySelector("#profileAvatar");
let avatar1 = document.querySelector("#profileAvatar1");
let avatarContainer = document.querySelector(".changeAvatar-container");
let params = new URLSearchParams(document.location.search.substring(1));
let id = params.get("user");
let usersAvatarRef = storage.ref().child(`Users_avatar/${id}.jpg`);

function changeIcon(white = true) {
    if (white) {
        avatarContainer.children[0].src = "/public/images/settings-white.png";
    } else {
        avatarContainer.children[0].src = "/public/images/settings.png";
    }
}

function downloadAvatar() {
    usersAvatarRef.getDownloadURL().then((url) => {
        avatar.src = url;
        avatar1.src = url;
    });
}

function toggleSettings() {
    avatarContainer.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    downloadAvatar();
});

avatar.addEventListener("click", () => {
    toggleSettings();
});

avatarContainer.addEventListener("mouseenter", () => {
    changeIcon(true);
});

avatarContainer.addEventListener("mouseleave", () => {
    changeIcon(false);
});

avatarContainer.addEventListener("click", () => {
    inpFileAvatar.click();
});

inpFileAvatar.addEventListener("change", () => {
    let files = inpFileAvatar.files;
    let file = files[0];

    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
        avatar.src = e.target.result;
        avatar.alt = file.name;

        avatar1.src = e.target.result;
        avatar1.alt = file.name;

        usersAvatarRef.put(file);
    });

    toggleSettings();
});
