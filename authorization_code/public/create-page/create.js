function getAccessToken() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams.access_token;
}

let accessToken = getAccessToken();

function getUserData(accessToken) {
    return $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
}

async function getUserDatas(accessToken) {
    let url = 'https://api.spotify.com/v1/me';
    let userData = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    let jsonUserData = await userData.json();
    console.log(jsonUserData);
    $("#username").text(jsonUserData.display_name);
}

getUserDatas(accessToken);

async function testSearch(accessToken) {
    var url = new URL("https://api.spotify.com/v1/search"),
    params = {q:"lady gaga", type: "album"}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    let search = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    let jsonSearch = await search.json();
    console.log(jsonSearch);
}

console.log(window.localStorage.getItem('name'));

// var url = new URL("https://api.spotify.com/v1/search"),
// params = {q:"lady gaga", type: "album"}
// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
// fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//         'Authorization': 'Bearer ' + accessToken
//     },
// }).then((response) => {
//     let dataPromise = response.json(); 
//     return dataPromise;  
// }).then((data) => {
//     console.log(data);
// });


testSearch(accessToken);