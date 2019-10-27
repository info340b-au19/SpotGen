function getAccessToken() {
    var accessToken = document.cookie.match('(^|[^;]+)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)');
    return accessToken ? accessToken.pop() : '';
}

let accessToken = getAccessToken();
console.log(accessToken);

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
