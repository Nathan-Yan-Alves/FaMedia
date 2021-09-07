let btnForgetPass = document.querySelector("#forget-password");

btnForgetPass.addEventListener("click", () => {
    inpNameAtr = ["email"];
    inpPlaceholder = ["Email"];
    changeBtn(false);
    createForm();
    clearForm();
});
