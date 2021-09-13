const reader = new FileReader();
let btnUpload = document.querySelector("#photo-video");
let inpFile = document.querySelector("#files");
let filesCont = document.querySelector(".files-container");
let pubModal = document.querySelector(".publish-modal");
let btnModal = document.querySelector("#btn-modal");
let overlay = document.querySelector(".overlay");

btnUpload.addEventListener("click", () => {
    inpFile.click();
});

inpFile.addEventListener("change", () => {
    let files = inpFile.files;
    let file = files[0];
    reader.readAsDataURL(file);

    overlay.style.display = "block";
    pubModal.classList.remove("hidden");

    reader.addEventListener("load", (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        img.style.padding = "5px";
        img.style.width = "75px";
        filesCont.appendChild(img);
    });
});

btnModal.addEventListener("click", () => {
    pubModal.classList.add("hidden");
});
