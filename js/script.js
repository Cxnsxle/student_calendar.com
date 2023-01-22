document.getElementById("btn-register").addEventListener("click", showFrmRegister);
document.getElementById("btn-login").addEventListener("click", showFrmLogin);

window.addEventListener("resize", widthPage); 

// var declarations
var frmContainer = document.querySelector(".container-forms");
var frmLogin = document.querySelector(".container-forms-login");
var frmRegister = document.querySelector(".container-forms-register");
var backTextLogin = document.querySelector(".container-back_text-login");
var backTextRegister = document.querySelector(".container-back_text-register");

function widthPage() {
	if (window.innerWidth > 850) {
		backTextLogin.style.display = "block";
		backTextRegister.style.display = "block";
	}
	else {
		backTextRegister.style.display = "block";
		backTextRegister.style.opacity = "1";
		backTextLogin.style.display = "none";
		frmLogin.style.display = "block";
		frmRegister.style.display = "none";
		frmContainer.style.left = "0px";
	}
}

function showFrmLogin (){
	if (window.innerWidth > 850) {
		frmRegister.style.display = "none";
		frmContainer.style.left = "10px";
		frmLogin.style.display = "block";
		backTextRegister.style.opacity = "1";
		backTextLogin.style.opacity = "0";
	}
	else {
		frmRegister.style.display = "none";
		frmContainer.style.left = "0px";
		frmLogin.style.display = "block";
		backTextRegister.style.display = "block";
		backTextLogin.style.display = "none";
	}
}

function showFrmRegister (){
	if (window.innerWidth > 850) {
		frmRegister.style.display = "block";
		frmContainer.style.left = "410px";
		frmLogin.style.display = "none";
		backTextRegister.style.opacity = "0";
		backTextLogin.style.opacity = "1";
	}
	else {
		frmRegister.style.display = "block";
		frmContainer.style.left = "0px";
		frmLogin.style.display = "none";
		backTextRegister.style.display = "none";
		backTextLogin.style.display = "block";
		backTextLogin.style.opacity = "1";
	}
}
