let url="http://localhost:2020"
function myFunction() {
    var x = document.getElementById("pass");
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

// document.getElementById("signup_page").addEventListener("click",signup_page);

// function signup_page(){
//     window.location.replace("./signup.html");
// }

// document.getElementById("login_page").addEventListener("click",login_page);

// function login_page(){
//     window.location.replace("./login.html");
// }
const Register_btn = document.querySelector("#signup_btn");
Register_btn.addEventListener("click",RegisterFunction);
async function RegisterFunction(event) {
  try {
    // event.preventDefault();
    // let all_input_tags = document.querySelectorAll("#register input");
    let name=document.querySelector("#name").value;
let email=document.querySelector("#email").value;
let pass=document.querySelector("#pass").value;
    let userObj = {
        name,
        email,
       pass
    };

    

    let register_request = await fetch(`${url}/users/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj)
    })
    .then(res=>res.json())
    .then(data=>  {
      alert("verify your otp")
      localStorage.setItem("keys", JSON.stringify(userObj));
      localStorage.setItem("back",JSON.stringify(data))
    window.location.href="./otp/otp.html"
        // alert(data)      
})
    .catch(err=>console.log(err))
  } catch (error) {
    alert("Something went wrong. Please try again later.");
  }
}