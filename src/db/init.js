const firebaseConfig = {
    apiKey: "AIzaSyANtEtpk3BjYbrpDyk1N8i5_SwOZFrCsC0",
    authDomain: "famedia-1161a.firebaseapp.com",
    projectId: "famedia-1161a",
    storageBucket: "famedia-1161a.appspot.com",
    messagingSenderId: "576711616089",
    appId: "1:576711616089:web:4b3a35728983ac380bb348",
    measurementId: "G-Z13Z37YWTS",
};

firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

// loginBtn.addEventListener("click", () => {
//     auth.createUserWithEmailAndPassword(email, password)
//         .then(() => {
//             console.log("Usuario logado");
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
