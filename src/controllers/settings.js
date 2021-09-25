import {
    getAuth,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("user");
const reader = new FileReader();

let avatars = document.querySelectorAll(".profileAvatar");
let avatarContainer = document.querySelector(".changeAvatar-container");
let exit = document.querySelector(".exit");
let inpFileAvatar = document.querySelector("#filesAvatar");
let usersAvatarRef = ref(storage, `Users_avatar/${id}.jpg`);
let defaultAvatarRef = ref(storage, "Users_avatar/default-avatar.png");

function changeIcon(white = true, icon, container) {
    if (white) {
        container.children[0].src = `/public/images/${icon}-white.png`;
    } else {
        container.children[0].src = `/public/images/${icon}.png`;
    }
}

function downloadAvatar() {
    getDownloadURL(usersAvatarRef)
        .then((url) => {
            updateDoc(doc(db, "Users", id), {
                imageId: url,
            });
            avatars.forEach((avatar) => {
                avatar.src = url;
            });
        })
        .catch((error) => {
            getDownloadURL(defaultAvatarRef).then((url) => {
                updateDoc(doc(db, "Users", id), {
                    imageId: url,
                });
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
        location.href = "/src/views/index.html";
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
        uploadBytes(usersAvatarRef, file);
    });

    toggleSettings();
});
