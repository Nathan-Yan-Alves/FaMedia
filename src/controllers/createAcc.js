let formCont = document.querySelector(".form-container");
let btnCreateAcc = document.querySelector("#btn-create");
let forms = [];
let inpNameAtr = ["name", "lastName", "email", "password"];
let inpPlaceholder = ["Nome", "Sobrenome", "Email", "Senha"];

function addInput(type, name, placeholder) {
    return {
        type,
        name,
        placeholder,
    };
}

function changeBtn(createAcc = true) {
    if (createAcc) {
        btnCreateAcc.id = "createAcc";
        btnCreateAcc.textContent = "Criar conta";
    } else {
        btnCreateAcc.id = "changePass";
        btnCreateAcc.textContent = "Recuperar senha";
    }
}

function clearForm() {
    let loginDiv = document.querySelector(".login");
    let divisionDiv = document.querySelector(".division");

    formCont.removeChild(loginDiv);
    formCont.removeChild(divisionDiv);
}

function createForm() {
    createInput(inpNameAtr, inpPlaceholder);
    forms.forEach((form) => {
        let inp = document.createElement("input");
        inp.type = form.type;
        inp.name = form.name;
        inp.placeholder = form.placeholder;
        inp.classList.add("inp");

        btnCreateAcc.before(inp);
    });
}

function createInput(formName, placeholder) {
    for (let i = 0; i < formName.length; i++) {
        let type = "text";
        if (formName[i] == "password") {
            type = "password";
        } else if (formName[i] == "email") {
            type = "email";
        }
        forms.push(addInput(type, formName[i], placeholder[i]));
    }
}

btnCreateAcc.addEventListener("click", () => {
    changeBtn();
    clearForm();
    createForm();
});
