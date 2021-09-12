import { auth } from "../db/init.js";

let email = "teste@gmail.com";
let password = "meudeus";

createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log("Usuario logado");
    })
    .catch((err) => {
        console.log(err);
    });
