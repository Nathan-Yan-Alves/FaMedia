import {
    getFirestore,
    addDoc,
    collection,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const db = getFirestore();
const dayOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];
const monthOfYear = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("user");

let buttons = document.querySelectorAll(".btn");
let inpPub = document.querySelector("#inpPub");
let modalPub = document.querySelector("#text");
let avatar = document.querySelector(".profileAvatar");
let familyCode = document.querySelector("#family-code");
let username = document.querySelector(".username");
let overlay = document.querySelector(".overlay");

function addPostData(postTime, dayWeek, month, input, fileData = false) {
    let filesCont = document.querySelector(".files-container");
    if (input.length > 0) {
        addDoc(collection(db, "Posts-content"), {
            familyId: familyCode.textContent,
            name: username.textContent,
            avatar: avatar.src,
            postTime: `${dayWeek} às ${postTime.getHours()}:${postTime.getMinutes()}, ${postTime.getDate()}/${month}/${postTime.getFullYear()}`,
            postText: input,
            fileSrc: fileData ? filesCont.children[0].src : "Sem arquivos",
        });

        inpPub.value = "";
        modalPub.value = "";
        overlay.style.display = "none";

        alert("Publicado com sucesso!");
    } else {
        alert("Campo de publicação vazio!");
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        let postTime = new Date();
        let dayWeek = postTime.getDay();
        let month = postTime.getMonth();

        dayWeek = dayOfWeek[dayWeek];
        month = monthOfYear[month];

        if (btn.id == "btn-modal") {
            addPostData(postTime, dayWeek, month, modalPub.value, true);
        } else {
            addPostData(postTime, dayWeek, month, inpPub.value);
        }
    });
});
