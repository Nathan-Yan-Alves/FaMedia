let codeContainer = document.querySelector(".code-container");
let createFamilyBtn = document.querySelector("#btn-sidenav");
let division = document.querySelector(".division");
let enterCode = document.querySelector(".enter-code");
let familyCode = document.querySelector("#family-code");
let inpCode = document.querySelector(".inp-code");
let isCodeExist = true;
let withoutFamily = document.querySelector(".without-family");

function addUserInGroup(cod) {
    db.collection("Users").doc(id).update({ groupId: cod });
    db.collection("Family-groups")
        .doc(cod)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion(id),
        });
}

function codeHandler() {
    db.collection("Family-groups")
        .where("users", "array-contains", id)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                toggleDivs(doc.id);
                getGroupUsers(doc.id);
            });
        })
        .catch(() => {
            isCodeExist = false;
        });
}

function getGroupUsers(cod) {
    db.collection("Users")
        .where("groupId", "==", cod)
        .get()
        .then((queryList) => {
            if (!queryList.empty) {
                addUserInGroup(cod);
                queryList.forEach((doc) => {
                    document
                        .querySelector(".family-members")
                        .firstElementChild.classList.remove("hidden");
                    setTimeout(() => {
                        addUser(
                            doc.data().imageId,
                            doc.data().name,
                            doc.data().lastName
                        );
                    }, 500);
                });
            } else {
                alert("Código não existe");
                inpCode.value = "";
            }
        });
}

function getFamilyCode() {
    let codValue = inpCode.value;
    codValue = codValue.slice(1);
    let template = /[0-9]+/;

    if (codValue.match(template).input == codValue && codValue.length == 6) {
        return codValue;
    }
    return 0;
}

function randomCode() {
    let code;
    for (let i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 9);
    }
    return code;
}

function storageCode(code) {
    code = code.slice(1);
    db.collection("Family-groups")
        .doc(code)
        .set({ users: [id] })
        .then(() => {
            console.log("Documento adicionado");
        });

    db.collection("Users")
        .doc(id)
        .update({
            groupId: code,
        })
        .then(() => {
            console.log("Código inserido no documento usuário");
        });
}

function toggleDivs(code) {
    enterCode.classList.add("hidden");
    division.classList.add("hidden");
    withoutFamily.classList.add("hidden");
    codeContainer.classList.remove("hidden");

    familyCode.textContent = `#${code}`;
}

window.addEventListener("load", () => {
    codeHandler();
});

createFamilyBtn.addEventListener("click", () => {
    let codAux;
    if (!isCodeExist) {
        codAux = randomCode();
        storageCode(codAux);
        toggleDivs(codAux);
        getGroupUsers(codAux);
    }
});

inpCode.addEventListener("change", () => {
    let auxReturn;

    auxReturn = getFamilyCode();
    if (auxReturn != 0) {
        getGroupUsers(auxReturn);
    }
    location.reload();
});
