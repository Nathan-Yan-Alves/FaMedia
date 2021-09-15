let createFamilyBtn = document.querySelector("#btn-sidenav");
let withoutFamily = document.querySelector(".without-family");
let codeContainer = document.querySelector(".code-container");
let familyCode = document.querySelector("#family-code");

function randomCode() {
    let code = "#";
    for (let i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 10);
    }
    return code;
}

createFamilyBtn.addEventListener("click", () => {
    withoutFamily.classList.add("hidden");
    codeContainer.classList.remove("hidden");

    familyCode.textContent = randomCode();
});
