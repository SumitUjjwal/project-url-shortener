let baseUrl = "http://localhost:2020";

function myFunctionlogin() {
  var x = document.getElementById("login_password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

document.getElementById("nav_img").addEventListener("click", nav_img);

function nav_img() {
  window.location.replace("../index.html");
}

document.getElementById("signup_page").addEventListener("click", signup_page);

function signup_page() {
  window.location.replace("./signup.html");
}

document.getElementById("login_page").addEventListener("click", login_page);

function login_page() {
  window.location.replace("./login.html");
}


////////////////////
const login = document.querySelector("#login_btn");
login.addEventListener("click", func);
async function func(event) {
  login.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
  try {
    let email = document.querySelector("#login_email").value;
    let pass = document.querySelector("#login_password").value;
    let userObj = {
      email,
      pass
    };

    let register_request = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)

        if (data.msg == "logged in successfully") {
          alert(data.msg)
          localStorage.setItem("user", data.id);
          window.location.href = "../html/dashboard.html"
        } else {
          alert(data.msg)
          window.location.href = "../html/login.html"
        }    
      })
      .catch(err => console.log(err))
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
  login.innerHTML = `Login`;
}

const forgot = document.getElementById("forpass");
forgot.addEventListener("click", async () => {
  try {
    let email = document.querySelector("#login_email").value;
    let userObj = {
      email
    };

    let register_request = await fetch(`${baseUrl}/users/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj)
    })
      .then(res => res.json())
      .then(data => {
        alert("verify your otp")
        localStorage.setItem("keys", JSON.stringify(userObj));
        localStorage.setItem("back", JSON.stringify(data))
        window.location.href = "../html/otpforgetpass.html"
      })
      .catch(err => console.log(err))
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
});