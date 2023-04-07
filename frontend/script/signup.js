let baseUrl = "https://lillyput.onrender.com";

function myFunction() {
  var x = document.getElementById("signup_password");
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

const Register_btn = document.querySelector("#signup_btn");
Register_btn.addEventListener("click", RegisterFunction);
async function RegisterFunction(event) {
  Register_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
  try {
    // event.preventDefault();
    // let all_input_tags = document.querySelectorAll("#register input");
    let name = document.querySelector("#signup_name").value;
    let email = document.querySelector("#signup_email").value;
    let pass = document.querySelector("#signup_password").value;
    let labels = document.querySelectorAll("#signup_form label");
    labels.forEach(label => {
      label.style.color = "grey";
    });
    if (!name && !email && !pass) {
      // alert("Please fill all fields")
      labels.forEach(label => {
        label.style.color = "red";
      });
    }
    else if (!name && !email) {
      labels[0].style.color = "red";
      labels[1].style.color = "red";
    }
    else if (!name && !pass) {
      labels[0].style.color = "red";
      labels[2].style.color = "red";
    }
    else if (!pass && !email) {
      labels[2].style.color = "red";
      labels[1].style.color = "red";
    }
    else if (!name) {
      labels[0].style.color = "red";
    }
    else if (!email) {
      labels[1].style.color = "red";
    }
    else if (!pass) {
      labels[2].style.color = "red";
    }
    else if (pass.length < 8) {
      labels[2].style.color = "red";
      labels[2].innerText = "Password must be at least 8 characters*";
    }
    else if (pass.length >= 8) {
      const specialChars = ['*', '&', '%', '#', '$', '@', '!'];
      for (let i = 0; i < pass.length; i++) {
        // if (pass[i] == '*' || pass[i] == '&' || pass[i] == '%' || pass[i] == '#' || pass[i] == '$' || pass[i] == '@' || pass[i] == '!') {
        if (specialChars.includes(pass[i])) {
          let userObj = {
            name,
            email,
            pass
          };

          labels[2].style.color = "grey";
          labels[2].innerText = "Password*";

          let register_request = await fetch(`${baseUrl}/users/otp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj)
          })
            .then(res => res.json())
            .then(data => {
              // alert("Verify your otp")
              localStorage.setItem("keys", JSON.stringify(userObj));
              localStorage.setItem("back", JSON.stringify(data))
              // window.location.href = "../html/otp.html"
              const signup_form = document.getElementById("signup_form");
              signup_form.innerHTML = "";
              signup_form.innerHTML = `
                <div class="container">
                <header>
                  <i class="bx bxs-check-shield"></i>
                </header>
                <h4>Enter OTP Code</h4>
                <form action="#">
                  <div class="input-field">
                    <input id="first" type="number" />
                    <input id="second" type="number" disabled />
                    <input id="third" type="number" disabled />
                    <input id="fourth" type="number" disabled />
                  </div>
                  <button id="otpbutton">Verify OTP</button>
                </form>
              </div>
                `
              // document.head.innerHTML += '<script src="../script/otp.js" defer></script>';
              document.head.innerHTML += '<link rel="stylesheet" href="../style/otp.css" />';
              // alert(data)   
              let url = "https://lillyput.onrender.com"
              const inputs = document.querySelectorAll("input"),
                button = document.querySelector("button");


              inputs.forEach((input, index1) => {
                input.addEventListener("keyup", (e) => {
                  const currentInput = input,
                    nextInput = input.nextElementSibling,
                    prevInput = input.previousElementSibling;
                  if (currentInput.value.length > 1) {
                    currentInput.value = "";
                    return;
                  }
                  if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                    nextInput.removeAttribute("disabled");
                    nextInput.focus();
                  }

                  if (e.key === "Backspace") {

                    inputs.forEach((input, index2) => {
                      if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                      }
                    });
                  }
                  if (!inputs[3].disabled && inputs[3].value !== "") {
                    button.classList.add("active");
                    return;
                  }
                  button.classList.remove("active");
                });
              });
              window.addEventListener("load", () => inputs[0].focus());

              // //////////////
              const otpbutton = document.querySelector("#otpbutton");
              otpbutton.addEventListener("click", fun);

              async function fun(event) {
                otpbutton.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
                try {
                  event.preventDefault();
                  // let all_input_tags = document.querySelectorAll("#register input");
                  let first = document.querySelector("#first").value;
                  let second = document.querySelector("#second").value;
                  let third = document.querySelector("#third").value;
                  let fourth = document.querySelector("#fourth").value;
                  // let userObj = {
                  //     name,
                  //     email,
                  //    pass
                  // };
                  let bag = ""
                  bag += first + second + third + fourth
                  let jhola = (bag)
                  // console.log(jhola)

                  let arr = localStorage.getItem("keys")
                  let otparr = localStorage.getItem("back")
                  console.log(otparr)
                  // let arr=[1,2,3]
                  let p = JSON.parse(arr)
                  let userObj = {
                    name: p.name,
                    email: p.email,
                    pass: p.pass,
                    otp: jhola
                  };
                  // console.log(userObj)

                  let register_request = await fetch(`${url}/users/signup`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userObj)
                  })
                  let response = await register_request.json();
                  // console.log(response)
                  if (bag == otparr) {
                    alert(response.msg);
                    window.location.href = "../html/login.html"
                    localStorage.clear();
                  }
                  else if (bag != otparr) {
                    alert("Wrong OTP");
                    document.querySelector("#first").value = null;
                    document.querySelector("#second").value = null;
                    document.querySelector("#third").value = null;
                    document.querySelector("#fourth").value = null;
                  } else {
                    window.location.href = "../html/signup.html"
                  }
                  // .then(res => res.json())
                  // .then(data => {
                  //   // console.log(data)
                  //   if (bag == otparr) {
                  //     alert(data.msg);
                  //     window.location.href = "../html/login.html"
                  //     localStorage.clear()
                  //   }
                  //   //     else if(data==="registered successfully"){
                  //   //  alert("Registered successfully")
                  //   // window.location.href="../login.html"
                  //   //   }


                  //   else if(data==="registered successfully"){

                  // window.location.href="../login.html"
                  //   }
                  //   else{
                  //     window.location.href="../signup.html"
                  //   }

                  // alert(data)      
                  // })
                  // .catch(err => console.log(err))
                } catch (error) {
                  alert("Something went wrong. Please try again later.");
                  console.log(error);
                }
                otpbutton.innerHTML = "Verify";
              }
            })
            .catch(err => console.log(err))

        }
        else {
          labels[2].style.color = "red";
          labels[2].innerText = "Atleast one special character expected*";
        }
      }

    }
  }
  catch (error) {
    alert("Something went wrong. Please try again later.");
  }
  Register_btn.innerHTML = "Sign Up";
}