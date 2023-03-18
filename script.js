const api1Url = "https://dummyjson.com/posts";
const api2Url = "https://dummyjson.com/products";
const api3Url = "https://dummyjson.com/todos";

function fetchDataFromApi1(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.posts);
                    resolve(data.posts);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchDataFromApi2(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.products);
                    resolve(data.products);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchDataFromApi3(apiUrl, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data.todos);
                    resolve(data.todos);
                })
                .catch(error => {
                    reject(error);
                });
        }, delay);
    });
}

function fetchApiData() {
    const tableBody = document.querySelector("#data-table tbody");
    const api1Promise = fetchDataFromApi1(api1Url, 1000);
    const api2Promise = api1Promise.then(() => fetchDataFromApi2(api2Url, 2000));
    const api3Promise = api2Promise.then(() => fetchDataFromApi3(api3Url, 3000));

    api1Promise
        .then(api1Data => {
            api1Data.forEach(item => {
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
                tableBody.appendChild(row);
            });

            return true;
        })
        .then(api1Resolved => {
            if (api1Resolved) {
                return api2Promise;
            }
        })
        .then(api2Data => {
            api2Data.forEach(item => {
                const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.title;
                row.appendChild(cell);
            });

            return true;
        })
        .then(api2Resolved => {
            if (api2Resolved) {
                return api3Promise;
            }
        })
        .then(api3Data => {
            api3Data.forEach(item => {
                const row = document.querySelector(`#data-table tbody tr:nth-child(${item.id})`);
                const cell = document.createElement("td");
                cell.innerText = item.completed;
                row.appendChild(cell);
            });
        })
        .catch(error => {
            console.error(error);
        });
}


const fetchDataButton = document.querySelector("#fetch-data-button");
fetchDataButton.addEventListener("click", fetchApiData);
















