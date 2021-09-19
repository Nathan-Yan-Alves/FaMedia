/* 
<div class="post">
    <div class="post-header">
        <div class="avatar">
            <img
                src="/public/images/default-avatar.png"
                alt="Avatar"
            />
        </div>
        <span class="username">Nome qualquer</span>
        <span class="post-time"></span>
    </div>
    <div class="post-content">

    </div>
</div>  
*/

let postContainer = document.querySelector(".posts-container");

function readPosts() {
    db.collection("Posts-content")
        .where("familyId", "==", familyCode.textContent)
        .get()
        .then((snapshot) => {
            snapshot.forEach((post) => {
                let divPost = document.createElement("div");
                let divPostHeader = document.createElement("div");
                let divAvatar = document.createElement("div");
                let avatarImg = new Image();
                let usernameTag = document.createElement("span");
                let divPostContent = document.createElement("div");
                let divPostImage = document.createElement("div");
                let postImg = new Image();

                divPost.classList.add("post");
                divPostHeader.classList.add("post-header");
                divAvatar.classList.add("avatar");
                usernameTag.classList.add("username");
                divPostContent.classList.add("post-content");
                divPostImage.classList.add("post-image");

                if (post.data().fileSrc != "Sem arquivos") {
                    postImg.src = post.data().fileSrc;
                } else {
                    postImg.id = "Sem arquivos";
                }

                divPostContent.textContent = post.data().postText;
                usernameTag.textContent = post.data().name;
                avatarImg.src = post.data().avatar;

                if (postImg.id != "Sem arquivos") {
                    divPostImage.appendChild(postImg);
                    divPostContent.appendChild(divPostImage);
                }

                divAvatar.appendChild(avatarImg);
                divPostHeader.appendChild(divAvatar);
                divPostHeader.appendChild(usernameTag);
                divPost.appendChild(divPostHeader);
                divPost.appendChild(divPostContent);
                postContainer.appendChild(divPost);
            });
        });
}

document.addEventListener("DOMContentLoaded", () => {
    readPosts();
});
