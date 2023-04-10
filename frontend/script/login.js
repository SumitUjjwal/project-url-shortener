let baseUrl = "https://lillyput.onrender.com";

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
    let labels = document.querySelectorAll("#login_form label");
    labels.forEach(label => {
      label.style.color = "grey";
    });
    if (!email && !pass) {
      // alert("Please fill all fields")
      labels.forEach(label => {
        label.style.color = "red";
      });
    }
    else if (!email) {
      labels[0].style.color = "red";
    }
    else if (!pass) {
      labels[1].style.color = "red";
    }
    else{
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
    }
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
  login.innerHTML = `Login`;
}

const forgot = document.getElementById("forpass");
forgot.addEventListener("click", async () => {
  forgot.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
  try {
    let email = document.querySelector("#login_email").value;
    let labels = document.querySelectorAll("#login_form label");
    if (!email) {
      labels[0].innerText = "Please enter an registered email*";
      labels[0].style.color = "red";
      forgot.innerHTML = `Forgot Password?`;
    }
    else {
      labels[0].innerText = "Email*";
      labels[0].style.color = "#5A7194";
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
          // alert("verify your otp")
          localStorage.setItem("keys", JSON.stringify(userObj));
          localStorage.setItem("back", JSON.stringify(data.OTP));

// multiple otp input box   
        //   const login_form = document.getElementById("login_form");
        //   login_form.innerHTML = "";
        //   login_form.innerHTML = `
        //   <div class="container">
        //   <header>
        //     <i class="bx bxs-check-shield"></i>
        //   </header>
        //   <h4>Enter OTP Code</h4>
        //   <form action="#">
        //     <div class="input-field">
        //       <input id="first" type="number" />
        //       <input id="second" type="number" disabled />
        //       <input id="third" type="number" disabled />
        //       <input id="fourth" type="number" disabled />
        //     </div>
        //     <button id="otpbutton">Verify OTP</button>
        //   </form>
        // </div>
        //   `
        //   // document.head.innerHTML += '<script src="../script/otp.js" defer></script>';
        //   document.head.innerHTML += '<link rel="stylesheet" href="../style/otp.css" />';
        //   let url = "https://lillyput.onrender.com"
        //   const inputs = document.querySelectorAll("input"),
        //     button = document.querySelector("button");


        //   inputs.forEach((input, index1) => {
        //     input.addEventListener("keyup", (e) => {
        //       const currentInput = input,
        //         nextInput = input.nextElementSibling,
        //         prevInput = input.previousElementSibling;
        //       if (currentInput.value.length > 1) {
        //         currentInput.value = "";
        //         return;
        //       }
        //       if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
        //         nextInput.removeAttribute("disabled");
        //         nextInput.focus();
        //       }

        //       if (e.key === "Backspace") {

        //         inputs.forEach((input, index2) => {
        //           if (index1 <= index2 && prevInput) {
        //             input.setAttribute("disabled", true);
        //             input.value = "";
        //             prevInput.focus();
        //           }
        //         });
        //       }
        //       if (!inputs[3].disabled && inputs[3].value !== "") {
        //         button.classList.add("active");
        //         return;
        //       }
        //       button.classList.remove("active");
        //     });
        //   });
        //   window.addEventListener("load", () => inputs[0].focus());


// single otp input box
const login_form = document.getElementById("login_form");
login_form.innerHTML = "";
login_form.innerHTML = `
<div class="container">
<header>
  <i class="bx bxs-check-shield"></i>
</header>
<h4>Enter OTP Code</h4>
<form action="#">
  <div class="input-field">
    <input id="otp" type="number" maxlength="4" />
  </div>
  <button id="otpbutton">Verify OTP</button>
</form>
</div>
`
document.head.innerHTML += '<link rel="stylesheet" href="../style/otp.css" />';
let url = "https://lillyput.onrender.com"
const otpInput = document.getElementById("otp");
const button = document.querySelector("button");

otpInput.addEventListener("keyup", (e) => {
  const otpValue = otpInput.value;
  if (otpValue.length > 4) {
    otpInput.value = otpValue.slice(0, 4);
  }
  if (!isNaN(otpValue) && otpValue.length === 4) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
});
window.addEventListener("load", () => otpInput.focus());


          // //////////////
          const otpbutton = document.querySelector("#otpbutton");
          otpbutton.addEventListener("click", fun);
          async function fun(event) {
            console.log("pressed")
            try {
              event.preventDefault();
              // let first = document.querySelector("#first").value;
              // let second = document.querySelector("#second").value;
              // let third = document.querySelector("#third").value;
              // let fourth = document.querySelector("#fourth").value;
              // let bag = ""
              // bag += first + second + third + fourth
              // let jhola = (bag)

              let bag = document.getElementById("otp").value;

              let otparr = localStorage.getItem("back")
              // console.log(otparr)
              if (bag == otparr) {
                // $('link[rel=stylesheet][href~="../style/otp.css"]').remove();
                login_form.innerHTML = "";
                login_form.innerHTML = ` 
                <div id="update-password">
                  <input id="upass"  type="password" placeholder="Enter New Password" />
                  <input id="cpass"  type="text" placeholder="Confirm Password" />
                  <button  id="update">Update</button>
                  </div>
                `
                const forpass = document.querySelector("#update");
                forpass.addEventListener("click", funs)
              } else {
                alert("wrong otp")

              }


            } catch (error) {
              alert("Something went wrong. Please try again later.");
              console.log(error);
            }
          }

          async function funs(event) {
            document.getElementById("update").innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
            try {
              event.preventDefault();
              let arr = localStorage.getItem("keys")
              let d = JSON.parse(arr)

              let updatedpass = document.querySelector("#upass").value;
              let confirmPass = document.querySelector("#cpass").value;
              if(updatedpass != confirmPass) {
                alert("Password mismatch. Please try again.");
              }else{
                let obj = {
                  email: d.email,
                  pass: updatedpass
                };
                console.log(obj)
                let req = await fetch(`${url}/users/update`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(obj)
                })
                  .then(res => res.json())
                  .then(data => {
                    alert(data)
                    window.location.href = "../html/login.html";
                    localStorage.clear();
                  })
                  .catch(err => console.log(err))
              }
              
            } catch (error) {
              alert("Something went wrong. Please try again later.");
              console.log(error);
            }
          }
          // window.location.href = "../html/otpforgetpass.html"
        })
        .catch(err => console.log(err))
    }
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
  forgot.innerHTML = `Forgot Password?`;
});