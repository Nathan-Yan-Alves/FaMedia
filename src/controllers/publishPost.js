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

let buttons = document.querySelectorAll(".btn");

let inpPub = document.querySelector("#inpPub");
let modalPub = document.querySelector("#text");

let avatar = document.querySelector(".profileAvatar");

function addPostData(postTime, dayWeek, month, input, fileData = false) {
    if (input.length > 0) {
        db.collection("Posts-content")
            .doc()
            .set({
                familyId: familyCode.textContent,
                name: username.textContent,
                avatar: avatar.src,
                timeLessThenOneDay: `${dayWeek} às ${postTime.getHours()}:${postTime.getMinutes()}`,
                timeMoreThenOneDay: `${postTime.getDate()} de ${month} de ${postTime.getFullYear()}`,
                postText: input,
                fileSrc: fileData ? filesCont.children[0].src : "Sem arquivos",
            })
            .then(() => {
                inpPub.value = "";
                modalPub.value = "";
                overlay.style.display = "none";

                alert("Publicado com sucesso!");
            });
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
