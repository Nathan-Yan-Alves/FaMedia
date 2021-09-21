import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    where,
    query,
    collection,
    arrayUnion,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const db = getFirestore();
const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("user");

let codeContainer = document.querySelector(".code-container");
let createFamilyBtn = document.querySelector("#btn-sidenav");
let division = document.querySelector(".division");
let enterCode = document.querySelector(".enter-code");
let familyCode = document.querySelector("#family-code");
let inpCode = document.querySelector(".inp-code");
let isCodeExist = true;
let withoutFamily = document.querySelector(".without-family");

async function addUserInGroup(cod) {
    await updateDoc(doc(db, "Users", id), {
        groupId: cod,
    });
    await updateDoc(doc(db, "Family-groups", cod), {
        users: arrayUnion(id),
    });
}

async function codeHandler() {
    const q = query(
        collection(db, "Family-groups"),
        where("users", "array-contains", id)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        isCodeExist = false;
    } else {
        querySnapshot.forEach((doc) => {
            toggleDivs(doc.id);
            getGroupUsers(doc.id);
        });
    }
}

async function getGroupUsers(cod) {
    const q = query(collection(db, "Users"), where("groupId", "==", cod));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        addUserInGroup(cod);
        querySnapshot.forEach((doc) => {
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
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += Math.round(Math.random() * 9);
    }
    return code;
}

async function storageCode(code) {
    await setDoc(doc(db, "Family-groups", code), {
        users: [id],
    });

    await updateDoc(doc(db, "Users", id), {
        groupId: code,
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

createFamilyBtn.addEventListener("click", async () => {
    let codAux;
    if (!isCodeExist) {
        codAux = randomCode();
        await storageCode(codAux);
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
});
