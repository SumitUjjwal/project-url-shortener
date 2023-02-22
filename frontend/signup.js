function myFunction() {
    var x = document.getElementById("signup_password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  document.getElementById("nav_img").addEventListener("click",nav_img);

function nav_img(){
    window.location.replace("./index.html");
}

document.getElementById("signup_page").addEventListener("click",signup_page);

function signup_page(){
    window.location.replace("./signup.html");
}

document.getElementById("login_page").addEventListener("click",login_page);

function login_page(){
    window.location.replace("./login.html");
}