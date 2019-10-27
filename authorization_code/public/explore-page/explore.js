/* Retrieve the access token stored in the browser cookie */
/* Credit: https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript */
function getAccessToken() {
    var accessToken = document.cookie.match('(^|[^;]+)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)');
    return accessToken ? accessToken.pop() : '';
}

let accessToken = getAccessToken();