import {
    getFirestore,
    doc,
    getDocs,
    getDoc,
    where,
    query,
    collection,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const db = getFirestore();
let postContainer = document.querySelector(".posts-container");
let familyCode = document.querySelector("#family-code");

const params = new URLSearchParams(document.location.search.substring(1));
const id = params.get("user");

async function getAvatar() {
    let avatarRef = doc(db, "Users", id);
    let avatar = await getDoc(avatarRef);
    let avatarUrl = avatar.data().imageId;

    return avatarUrl;
}

async function readPosts() {
    const q = query(
        collection(db, "Posts-content"),
        where("familyId", "==", familyCode.textContent)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async function (post) {
        let divPost = document.createElement("div");
        let divPostHeader = document.createElement("div");
        let divAvatar = document.createElement("div");
        let avatarImg = new Image();
        let usernameTag = document.createElement("span");
        let spanPostTime = document.createElement("span");
        let divPostContent = document.createElement("div");
        let divPostImage = document.createElement("div");
        let divUserInfo = document.createElement("div");
        let postImg = new Image();

        divPost.classList.add("post");
        divPostHeader.classList.add("post-header");
        divAvatar.classList.add("avatar");
        usernameTag.classList.add("username");
        spanPostTime.classList.add("post-time");
        divPostContent.classList.add("post-content");
        divPostImage.classList.add("post-image");
        divUserInfo.classList.add("user-info");

        if (post.data().fileSrc != "Sem arquivos") {
            postImg.src = post.data().fileSrc;
        } else {
            postImg.id = "Sem arquivos";
        }

        spanPostTime.textContent = post.data().postTime;
        divPostContent.textContent = post.data().postText;
        usernameTag.textContent = post.data().name;
        avatarImg.src = await getAvatar();

        if (postImg.id != "Sem arquivos") {
            divPostImage.appendChild(postImg);
            divPostContent.appendChild(divPostImage);
        }

        divAvatar.appendChild(avatarImg);
        divUserInfo.appendChild(usernameTag);
        divUserInfo.appendChild(spanPostTime);
        divPostHeader.appendChild(divAvatar);
        divPostHeader.appendChild(divUserInfo);
        divPost.appendChild(divPostHeader);
        divPost.appendChild(divPostContent);
        postContainer.appendChild(divPost);
    });
}

window.addEventListener("load", () => {
    setTimeout(() => {
        readPosts();
    }, 1500);
});
