var signUpEmailInput = document.querySelector("#signUpEmail");
var signUpNameInput = document.querySelector("#signUpName");
var signUpPasswordInput = document.querySelector("#signUpPassword");
var signInEmailInput = document.querySelector("#signInEmail");
var signInPasswordInput = document.querySelector("#signInPassword");
var signUpButton = document.querySelector("#signUpButton");
var loginBtn = document.getElementById("loginBtn");
var logOutBtn = document.getElementById("logOutBtn");
// var welcomeDiv = document.querySelector("#welcomeDiv");
var signUpList=[];

var userName = localStorage.getItem("currentUserName");

if (localStorage.getItem("signUp") !== null) {
    signUpList = JSON.parse(localStorage.getItem("signUp"));
} else {
    signUpList = [];
}
if(userName){
    document.querySelector("#username").innerHTML = "Welcome " + userName ;
}

function addToLocalStorage() {
    localStorage.setItem("signUp", JSON.stringify(signUpList));
  }
if(document.querySelector(".back-ground-box")!= null){
   document.querySelector(".back-ground-box").addEventListener("change" , function(e){
    if (e.target.id == "signUpName" || e.target.id == "signUpEmail" || e.target.id == "signUpPassword") {
        validateInputs(e.target);
    }
  })
}
  function validateInputs(element) {
    regax = {
      signUpName: /^[a-zA-Z]{2,}$/,
      signUpEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      signUpPassword: /^(?=.*\d)[a-zA-Z\d]{7,}$/,
    };
  
    if (regax[element.id].test(element.value) == true) {
      element.classList.remove("is-invalid");
      element.classList.add("is-valid");
      element.nextElementSibling.classList.replace("d-block","d-none");
      return true;
    } else {
      element.classList.remove("is-valid");
      element.classList.add("is-invalid");
      element.nextElementSibling.classList.replace("d-none","d-block");
      return false;
    }
  }
  function isEmailExist(){
  
    for ( var i=0; i < signUpList.length ; i++) {
        if(signUpList[i].signUpEmail.toLowerCase() === signUpEmailInput.value.toLowerCase()){
            return true ;
        }
    } 
    return false;
    
  }
  function addUser() {
    if (isEmailExist()) {
        document.querySelector("#emailExistparagraph").classList.replace("d-none", "d-block");
        signUpEmailInput.classList.replace("is-valid", "is-invalid")
    } else {
        if (validateInputs(signUpNameInput) & validateInputs(signUpEmailInput) & validateInputs(signUpPasswordInput)) {
            var signUp = {
                signUpName: signUpNameInput.value,
                signUpEmail: signUpEmailInput.value,
                signUpPassword: signUpPasswordInput.value,
            };
            signUpList.push(signUp);
            addToLocalStorage();
            resetSign();
            document.querySelector("#emailExistparagraph").classList.replace("d-block", "d-none");
            document.querySelector("#correctSignparagraph").classList.replace("d-none", "d-block");
        }
    }
}
if(signUpButton != null){
    signUpButton.addEventListener("click",function(){
    addUser();
    });
 }
    function resetSign() {
        signUpNameInput.value = null;
        signUpEmailInput.value = null;
        signUpPasswordInput.value = null;
        signUpNameInput.classList.remove("is-valid");
        signUpNameInput.classList.remove("is-invalid");
        signUpEmailInput.classList.remove("is-valid");
        signUpEmailInput.classList.remove("is-invalid");
        signUpPasswordInput.classList.remove("is-valid");
        signUpPasswordInput.classList.remove("is-invalid");
    }

  
    function login() {
        var email = signInEmailInput.value;
        var password = signInPasswordInput.value;
        for (var i = 0; i < signUpList.length; i++) {
            if (signUpList[i].signUpEmail.toLowerCase() === email.toLowerCase() && signUpList[i].signUpPassword === password) {
                localStorage.setItem("currentUserName" , signUpList[i].signUpName) ;
                window.location.href = "home.html"; 
                return true; 
            }
        }
        document.querySelector("#inCorrectLogin").classList.replace("d-none", "d-block");
        return false; 
    }
    if (loginBtn != null){
    loginBtn.addEventListener("click", function() {
    login();
  });
}

    function logout(){
        localStorage.removeItem("currentUserName");
        window.location.href = "index.html";
    }

    if(logOutBtn != null){
        logOutBtn.addEventListener(" click", function(){
            logout();
        })
}