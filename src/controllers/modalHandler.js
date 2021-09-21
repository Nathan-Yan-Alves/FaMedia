import {
    getFirestore,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

const db = getFirestore();
const storage = getStorage();

const reader = new FileReader();
const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("user");

let btnClose = document.querySelector("#close-modal");
let btnModal = document.querySelector("#btn-modal");
let btnUpload = document.querySelector("#photo-video");
let filesCont = document.querySelector(".files-container");
let inpFilePub = document.querySelector("#filesPublish");
let overlay = document.querySelector(".overlay");
let pubModal = document.querySelector(".publish-modal");
let username = document.querySelector(".username");

async function changeUsername() {
    let docSnap = await getDoc(doc(db, "Users", id));
    username.textContent = `${docSnap.data().name} ${docSnap.data().lastName}`;
}

function closeModal() {
    overlay.style.display = "none";
}

function upload() {
    let files = inpFilePub.files;
    let file = files[0];
    let postImageRef = ref(storage, "Posts_image/");

    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
        uploadBytes(postImageRef, file);
        overlay.style.display = "block";
        pubModal.classList.remove("hidden");

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        img.style.padding = "5px";
        img.style.width = "75px";

        filesCont.appendChild(img);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    changeUsername();
});

btnClose.addEventListener("click", () => {
    closeModal();
});

btnModal.addEventListener("click", () => {
    pubModal.classList.add("hidden");
});

btnUpload.addEventListener("click", () => {
    inpFilePub.click();
});

inpFilePub.addEventListener("change", () => {
    upload();
});
