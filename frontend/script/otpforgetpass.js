let url="http://localhost:2020"
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
otpbutton.addEventListener("click",fun);
async function fun(event) {
  try {
    event.preventDefault();
    // let all_input_tags = document.querySelectorAll("#register input");
    let first=document.querySelector("#first").value;
let second=document.querySelector("#second").value;
let third=document.querySelector("#third").value;
let fourth=document.querySelector("#fourth").value;
    // let userObj = {
    //     name,
    //     email,
    //    pass
    // };
    let bag=""
    bag+=first+second+third+fourth
    let jhola=(bag)
    // console.log(jhola)

  
    let otparr=localStorage.getItem("back")
    console.log(otparr)
   if(bag==otparr){
    document.querySelector("body").innerHTML=""
    document.querySelector("body").innerHTML=`  <input id="upass"  type="text" placeholder="enter updated password" />
    <button  id="update">Updated Password</button>`
    const forpass = document.querySelector("#update");
    forpass.addEventListener("click",funs)

   }else{
    alert("wrong otp")
    
   }
   
    
  } catch (error) {
    alert("Something went wrong. Please try again later.");
    console.log(error);
  }
}


////////////////////////////////////////////////
// const forpass = document.querySelector("#update");
// forpass.addEventListener("click",function(){
//   console.log("ki")
// })
async function funs(event) {
  try {
    event.preventDefault();
    // let all_input_tags = document.querySelectorAll("#register input");
      let arr=localStorage.getItem("keys")
      let d=JSON.parse(arr)

    let updatedpass=document.querySelector("#upass").value;
    let obj = {
        email:d.email,
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
    .then(res=>res.json())
    .then(data=>  {
      // console.log(data)
      alert(data)
      window.location.href ="../html/login.html"
      localStorage.clear()
     
    
})
    .catch(err=>console.log(err))
  } catch (error) {
    alert("Something went wrong. Please try again later.");
    console.log(error);
  }
}