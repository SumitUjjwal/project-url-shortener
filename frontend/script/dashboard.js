
// base url
const baseUrl = "http://localhost:2020";
const userId = "63f5cb185e460cb9c7de5ba3";

// navigation elements
const url_list_btn = document.getElementById("nav-element-urls");
const stats_btn = document.getElementById("nav-element-stats");
const url_list = document.getElementById("main-shortener-box");
const stats = document.getElementById("main-graph-chart");

// overview elements
const all_links = document.getElementById("all-links");
const all_clicks = document.getElementById("all-clicks");

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
    // overview elements
    all_links.innerText = userInfo.links.length;
    let clickCount = 0;
    for (let i = 0; i < userInfo.clicks.length; i++) {
        clickCount += userInfo.clicks[i]._id;
    }
    all_clicks.innerText = clickCount;

    // console.log(userInfo.system[0]._id)
    let xValues = ["19/02", "20/02", "21/02", "22/02", "23/02", "24/02", "25/02", "26/02", "27/02", "28/02"];
    new Chart(total_click, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: [10, 40, 100, 60, 270, 110, 130, 221, 330, 178, 210, 331, 319],
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
            labels: [userInfo.devices[0]._id, userInfo.devices[1]._id, 'Car', 'TV', 'Other'],
            datasets: [{
                label: '# of Votes',
                data: [userInfo.devices[0].count, userInfo.devices[1].count, 3, 5, 2],
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
            labels: [
                userInfo.system[0]._id,
                userInfo.system[1]._id,
                'Windows',
                'Android',
                'iOS'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [userInfo.system[0].count, userInfo.system[1].count, 1, 3, 4],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        }
    });

    xValues = [userInfo.location[0]._id, "Uttar Pradesh", "Karnatka", "Bihar", "Delhi", "Tamil Nadu", "Andhra Pradesh", "Himachal Pradesh", "Madhya Pradesh", "Assam"];
    new Chart(location_click, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                data: [userInfo.location[0].count, 40, 10, 11, 17, 15, 30, 22, 07, 21],
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
            labels: ['Chrome', 'Bing', 'Safari', 'Brave', 'chromium'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
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
        })
    });

    // delete the link
    let delete_url_btn_arr = document.querySelectorAll('#shortUrl-delete')
    delete_url_btn_arr.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            console.log(e.target.alt);
            const id = e.target.alt;
            let confirmation = confirm("Are you sure you want to delete this link?");
            if (confirmation) {
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
                alert("Link deleted successfully")
                window.location.reload();
            } else {
                console.log("Not sure");
            }
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
    window.location.reload();
})

