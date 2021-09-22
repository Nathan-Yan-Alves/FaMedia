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

let filesCont;
let aux;
let btnClose = document.querySelector("#close-modal");
let btnModal = document.querySelector("#btn-modal");
let btnUpload = document.querySelector("#photo-video");
let text = document.querySelector("#text");
let inpFilePub = document.querySelector("#filesPublish");
let overlay = document.querySelector(".overlay");
let pubModal = document.querySelector(".publish-modal");
let username = document.querySelector(".username");

async function changeUsername() {
    let docSnap = await getDoc(doc(db, "Users", id));
    username.textContent = `${docSnap.data().name} ${docSnap.data().lastName}`;
}

function closeModal() {
    filesCont.remove();
    overlay.style.display = "none";
}

function upload() {
    let files = inpFilePub.files;
    let file = files[0];

    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
        let postImageRef = ref(storage, `Posts_image/${file.name}`);
        uploadBytes(postImageRef, file);
        overlay.style.display = "block";
        pubModal.classList.remove("hidden");

        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        img.style.padding = "5px";
        img.style.width = "75px";

        if (!aux) {
            filesCont.appendChild(img);
        }
        aux = 1;
        text.after(filesCont);
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
    filesCont = document.createElement("div");
    filesCont.classList.add("files-container");
    aux = 0;
    upload();
});
