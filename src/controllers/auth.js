let email = document.querySelector("#emailLogin");
let password = document.querySelector("#passwordLogin");
let loginBtn = document.querySelector("#loginBtn");

function createAccount(name, lastName, email, password) {
    let userUid;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userUid = userCredential.user.uid;
            createUserData(name, lastName, email, userUid);
        })
        .catch((err) => {
            alert(err.message);
        });
}

function createUserData(name, lastName, email, id) {
    db.collection("Users")
        .doc(id)
        .set({
            userId: id,
            name,
            lastName,
            email,
        })
        .then(() => {
            location.href = `/src/views/main.html?user=${id}`;
        })
        .catch((err) => {
            alert(err.message);
        });
}

function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            db.collection("Users")
                .where("email", "==", email)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        location.href = `/src/views/main.html?user=${doc.id}`;
                    });
                });
        })
        .catch(() => {
            alert("Login e/ou senha incorretos!");
            email.value = "";
            password.value = "";
        });
}

loginBtn.addEventListener("click", () => {
    signIn(email.value, password.value);
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
