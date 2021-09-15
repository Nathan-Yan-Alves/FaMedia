const reader = new FileReader();

let btnUpload = document.querySelector("#photo-video");
let inpFilePub = document.querySelector("#filesPublish");
let filesCont = document.querySelector(".files-container");
let pubModal = document.querySelector(".publish-modal");
let btnModal = document.querySelector("#btn-modal");
let overlay = document.querySelector(".overlay");

function upload() {
    let files = inpFilePub.files;
    let file = files[0];
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("user");

    let postImageRef = storage.ref().child("Posts_image");

    reader.readAsDataURL(file);

    reader.addEventListener("load", (e) => {
        postImageRef.put(file).then((snapshot) => {
            console.log("Uploaded file");
        });

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

btnUpload.addEventListener("click", () => {
    inpFilePub.click();
});

inpFilePub.addEventListener("change", () => {
    upload();
});

btnModal.addEventListener("click", () => {
    pubModal.classList.add("hidden");
});
