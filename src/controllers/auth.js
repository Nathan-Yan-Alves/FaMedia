import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    where,
    query,
    collection,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");
let loginBtn = document.querySelector("#loginBtn");

function createAccount(name, lastName, email, password) {
    let userUid;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userUid = userCredential.user.uid;
            createUserData(name, lastName, email, userUid);
        })
        .catch((err) => {
            alert(err.message);
        });
}

async function createUserData(name, lastName, email, id) {
    try {
        await setDoc(doc(db, "Users", id), {
            userId: id,
            name,
            lastName,
            email,
        });
        location.href = `/src/views/main.html?user=${id}`;
    } catch (err) {
        console.log(err);
    }
}

async function signIn(email, password) {
    const q = query(collection(db, "Users"), where("email", "==", email.value));
    const querySnapshot = await getDocs(q);

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then(() => {
            querySnapshot.forEach((doc) => {
                location.href = `/src/views/main.html?user=${doc.id}`;
            });
        })
        .catch(() => {
            alert("Login e/ou senha incorretos!");
            email.value = "";
            password.value = "";
        });
}

loginBtn.addEventListener("click", () => {
    signIn(email, password);
});

document.querySelector("#btn-create").addEventListener("click", () => {
    let inputList = document.querySelectorAll(".inp");
    let createAccBtn = document.querySelector("#createAcc");
    let inputValues = [];

    createAccBtn.addEventListener("click", () => {
        inputList.forEach((inp) => {
            inputValues.push(inp.value);
        });

        createAccount(
            inputValues[0],
            inputValues[1],
            inputValues[2],
            inputValues[3]
        );
    });
});
