
// base url
const baseUrl = "http://localhost:2020";
const userId = localStorage.getItem("user");

// navigation elements
const url_list_btn = document.getElementById("nav-element-urls");
const stats_btn = document.getElementById("nav-element-stats");
const url_list = document.getElementById("main-shortener-box");
const stats = document.getElementById("main-graph-chart");

// overview elements
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");
const this_month = document.getElementById("this-month");
const inc_this_month = document.getElementById("inc-this-month");

// shrink form
const shrink_form = document.getElementById("shortener-input");
const shrink_full_url = document.getElementById("full-url");

// stats elements
const total_click = document.getElementById("total-click-chart");
const devices_click = document.getElementById("devices-click-chart");
const platforms_click = document.getElementById("platform-click-chart");
const location_click = document.getElementById("location-click-chart");
const browser_click = document.getElementById("browser-click-chart");

// url list elements
const url_list_box = document.getElementById("url-list-box");

// making a get request to server for getting user information
async function getUserInfo() {
    const response = await fetch(`${baseUrl}/short/user/${userId}`);
    const userInfo = await response.json();
    console.log(userInfo);
    displayStats(userInfo);
}
getUserInfo();


// navigaiton events
url_list_btn.addEventListener("click", () => {
    url_list.style.display = "block";
    stats.style.display = "none";
})

stats_btn.addEventListener("click", () => {
    url_list.style.display = "none";
    stats.style.display = "flex";
})

// display data
function displayStats(userInfo) {
    // graph variables
    let date = [], date_wise_clicks = [];
    let devices = [], devices_wise_clicks = [];
    let platforms = [], platforms_wise_clicks = [];
    let locations = [], locations_wise_clicks = [];
    let browsers = [], browsers_wise_clicks = [];


    for (let i = 0; i < userInfo.date.length; i++) { date.push(userInfo.date[i]._id); date_wise_clicks.push(userInfo.date[i].count); }
    date.sort((a, b) => { return a - b });

    for (let i = 0; i < userInfo.devices.length; i++) { devices.push(userInfo.devices[i]._id); devices_wise_clicks.push(userInfo.devices[i].count); }

    for (let i = 0; i < userInfo.system.length; i++) { platforms.push(userInfo.system[i]._id); platforms_wise_clicks.push(userInfo.system[i].count); }

    for (let i = 0; i < userInfo.location.length; i++) { locations.push(userInfo.location[i]._id); locations_wise_clicks.push(userInfo.location[i].count); }

    for (let i = 0; i < userInfo.browsers.length; i++) { browsers.push(userInfo.browsers[i]._id); browsers_wise_clicks.push(userInfo.browsers[i].count); }

    // overview elements
    all_links.innerText = userInfo.links.length;

    let clickCount = 0;
    for (let i = 0; i < userInfo.clicks.length; i++) {
        clickCount += userInfo.clicks[i]._id;
    }
    all_clicks.innerText = clickCount;

    if (!clickCount) {
        url_list.style.display = "block";
        stats.style.display = "none";
    }

    let thisMonth = date;
    const d = new Date();
    let m = d.getMonth();
    let count = 0, lastCount = 0;
    thisMonth.forEach((date) => {
        let month = date.split("/");
        console.log(month[1], d)
        if (month[1] == m + 1) {
            count++;
        }
        else if (month[1] - 1 == m) {
            lastCount++;
        }
    })
    this_month.innerText = count;
    inc_this_month.innerText = count - lastCount;




    // console.log(userInfo.system[0]._id)
    let xValues = date;
    new Chart(total_click, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: date_wise_clicks,
                borderColor: 'rgb(255, 99, 132)',
                fill: true,
                backgroundColor: "#f7e8e7"
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(devices_click, {
        type: 'doughnut',
        data: {
            labels: devices,
            datasets: [{
                label: '# of Votes',
                data: devices_wise_clicks,
                borderWidth: 1,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    '#4BC0C0',
                    '#C9CBCF'
                ],
                hoverOffset: 4
            }]
        }
    });

    new Chart(platforms_click, {
        type: 'polarArea',
        data: {
            labels: platforms,
            datasets: [{
                label: 'My First Dataset',
                data: platforms_wise_clicks,
                backgroundColor: [
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        }
    });

    xValues = locations;
    new Chart(location_click, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                data: locations_wise_clicks,
                borderColor: "red",
                fill: true,
                backgroundColor: "#f7e8e7"
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(browser_click, {
        type: 'pie',
        data: {
            labels: browsers,
            datasets: [{
                label: '# of Votes',
                data: browsers_wise_clicks,
                borderWidth: 1,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    '#4BC0C0',
                    '#C9CBCF'
                ],
                hoverOffset: 4
            }]
        }
    });

    // links
    url_list_box.innerHTML = userInfo.data.map(element => {
        return `
            <div class="url-list" id="url-list">
                <a target="_blank" class="fullUrl" id="fullUrl" href=${element.full}>${element.full}</a>
                <hr>
                <div class="shortUrl-box" id="shortUrl-box">
                    <div>
                        <a target="_blank" class="shortUrl" id="shortUrl" href=${baseUrl}/short/${element.short}>${baseUrl}/short/${element.short}</a>
                        <div>
                            <img id="shortUrl-clipboard" src="../resources/dashboard/url-list/copy.png" alt=${baseUrl}/short/${element.short}>
                            <img id="shortUrl-delete" src="../resources/dashboard/url-list/delete.png" alt=${element._id}>
                        </div>
                    </div>
                    <button><span><img src="../resources/dashboard/overview/link.png" alt=""></span>
                        <p>${element.clicks}</p>Clicks
                    </button>
                </div>
            </div>
        `
    }).join("")

    // copy url to clipboard
    let copy_url_btn_arr = document.querySelectorAll('#shortUrl-clipboard')
    copy_url_btn_arr.forEach(btn => {
        btn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(e.target.alt);
            alertWindow("Link copied to clipboard")
        })
    });

    // delete the link
    let delete_url_btn_arr = document.querySelectorAll('#shortUrl-delete')
    delete_url_btn_arr.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            console.log(e.target.alt);
            const id = e.target.alt;
            function confirmWindow() {
                var box = document.createElement("div");
                box.className = "prompt-box";
                var div = document.createElement("div");
                var ok = document.createElement("button");
                var cancel = document.createElement("button");
                ok.innerHTML = "OK";
                cancel.innerHTML = "Cancel";
                ok.onclick = function () {
                    sureDelete();
                    document.body.removeChild(box);
                };
                cancel.onclick = function () { document.body.removeChild(box) }
                var text = document.createTextNode("Are you sure you want to delete this link?");
                // var input = document.createElement("textarea");
                box.appendChild(text);
                // box.appendChild(input);
                div.appendChild(ok);
                div.appendChild(cancel);
                box.appendChild(div);

                box.style.position = "fixed";
                box.style.left = (window.innerWidth / 2) - 100;
                box.style.top = "200px";
                document.body.appendChild(box);
            }
            // let confirmation = confirm("Are you sure you want to delete this link?");
            let confirmation = confirmWindow();
            async function sureDelete() {
                console.log(confirmation);
                console.log("sure to delete");
                const request = await fetch(`${baseUrl}/short/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "userId": userId
                    }
                })
                const response = await request.json();
                console.log(response);
                alertWindow("Link deleted successfully!!");
                // alert("Link deleted successfully");
                // window.location.reload();
            }
            // if (confirmation) {
            //     console.log("sure to delete");
            //     const request = await fetch(`${baseUrl}/short/delete/${id}`, {
            //         method: "DELETE",
            //         headers: {
            //             "Content-Type": "application/json",
            //             "userId": userId
            //         }
            //     })
            //     const response = await request.json();
            //     console.log(response);
            //     alert("Link deleted successfully");
            //     window.location.reload();
            // } else {
            //     console.log("Not sure");
            // }
        })
    });
}

// shrink url
shrink_form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const full = shrink_full_url.value;
    console.log(full);

    const request = await fetch(`${baseUrl}/short`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userId": userId
        },
        body: JSON.stringify({ full })
    })
    const response = await request.json();
    console.log(response);
    // window.location.reload();
    alertWindow("URL shrinked Successfully!!")
})

// alert box
function alertWindow(msg) {
    var box = document.createElement("div");
    box.className = "prompt-box";
    var div = document.createElement("div");
    var ok = document.createElement("button");
    // var cancel = document.createElement("button");
    ok.innerHTML = "OK";
    // cancel.innerHTML = "Cancel";
    ok.onclick = function () {
        // sureDelete();
        window.location.reload();
        document.body.removeChild(box);
    };
    // cancel.onclick = function() { document.body.removeChild(box) }
    var text = document.createTextNode(msg);
    // var input = document.createElement("textarea");
    box.appendChild(text);
    // box.appendChild(input);
    div.appendChild(ok);
    // div.appendChild(cancel);
    box.appendChild(div);

    box.style.position = "fixed";
    box.style.left = (window.innerWidth / 2) - 100;
    box.style.top = "200px";
    document.body.appendChild(box);
}