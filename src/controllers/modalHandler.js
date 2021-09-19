const reader = new FileReader();

let btnClose = document.querySelector("#close-modal");
let btnModal = document.querySelector("#btn-modal");
let btnUpload = document.querySelector("#photo-video");
let filesCont = document.querySelector(".files-container");
let inpFilePub = document.querySelector("#filesPublish");
let overlay = document.querySelector(".overlay");
let pubModal = document.querySelector(".publish-modal");
let username = document.querySelector(".username");

function changeUsername() {
    db.collection("Users")
        .doc(id)
        .get()
        .then((doc) => {
            username.textContent = `${doc.data().name} ${doc.data().lastName}`;
        });
}

function closeModal() {
    overlay.style.display = "none";
}

function upload() {
    let files = inpFilePub.files;
    let file = files[0];
    let postImageRef = storage.ref().child("Posts_image");

    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
        postImageRef.put(file);
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
