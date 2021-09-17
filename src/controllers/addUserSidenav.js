let familyMembers = document.querySelector(".family-members");

function addUser(imgSource, userName, userLastName) {
    let ulTag = document.createElement("ul");
    let liTag = document.createElement("li");
    let spanTag = document.createElement("span");
    let divTag = document.createElement("div");
    let imgTag = document.createElement("img");

    imgTag.src = imgSource;
    imgTag.alt = "Avatar";

    divTag.classList.add("avatar");

    spanTag.textContent = `${userName} ${userLastName}`;

    divTag.appendChild(imgTag);
    liTag.appendChild(divTag);
    liTag.appendChild(spanTag);
    ulTag.appendChild(liTag);
    familyMembers.appendChild(ulTag);
}
