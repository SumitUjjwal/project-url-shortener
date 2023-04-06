const baseUrl = "https://lillyput.onrender.com";
const admin_login_btn = document.getElementById("admin_login_btn");

function myFunctionlogin() {
    var x = document.getElementById("admin_password");
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

admin_login_btn.addEventListener("click", async () => {
    admin_login_btn.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`;
    const admin_email = document.getElementById("admin_email");
    const admin_password = document.getElementById("admin_password");

    let obj = {
        email: admin_email.value,
        password: admin_password.value
    }

    let request = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })

    let response = await request.json();
    // console.log(response);
    if (response.msg) {
        localStorage.setItem("admin", response.admin);
        window.location.href = "../admin/admin-dashboard.html";
    }
    else {
        alert(response.msg);
    }
    admin_login_btn.innerHTML = "login";
})