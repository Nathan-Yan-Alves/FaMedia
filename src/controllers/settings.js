import { signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
var params = new URLSearchParams(document.location.search.substring(1));
var id = params.get("user");

let avatars = document.querySelectorAll(".profileAvatar");
let avatarContainer = document.querySelector(".changeAvatar-container");
let exit = document.querySelector(".exit");
let inpFileAvatar = document.querySelector("#filesAvatar");
let usersAvatarRef = storage.ref().child(`Users_avatar/${id}.jpg`);

function changeIcon(white = true, icon, container) {
    if (white) {
        container.children[0].src = `/public/images/${icon}-white.png`;
    } else {
        container.children[0].src = `/public/images/${icon}.png`;
    }
}

function downloadAvatar() {
    usersAvatarRef.getDownloadURL().then((url) => {
        db.collection("Users")
            .doc(id)
            .update({ imageId: url })
            .then(() => {
                avatars.forEach((avatar) => {
                    avatar.src = url;
                });
            });
    });
}

function toggleSettings() {
    avatarContainer.parentElement.classList.toggle("hidden");
}

function logout() {
    signOut(auth).then(() => {
        location.href = "/src/views/login.html";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    downloadAvatar();
});

avatars[0].addEventListener("click", () => {
    toggleSettings();
});

avatarContainer.addEventListener("mouseenter", () => {
    changeIcon(true, "settings", avatarContainer);
});

avatarContainer.addEventListener("mouseleave", () => {
    changeIcon(false, "settings", avatarContainer);
});

avatarContainer.addEventListener("click", () => {
    inpFileAvatar.click();
});

exit.addEventListener("click", () => {
    logout();
});

exit.addEventListener("mouseenter", () => {
    changeIcon(true, "logout", exit);
});

exit.addEventListener("mouseleave", () => {
    changeIcon(false, "logout", exit);
});

inpFileAvatar.addEventListener("change", () => {
    let files = inpFileAvatar.files;
    let file = files[0];

    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
        avatars.forEach((avatar) => {
            avatar.src = e.target.result;
            avatar.alt = file.name;
        });
        usersAvatarRef.put(file);
    });

    toggleSettings();
});
