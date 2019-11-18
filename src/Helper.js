/* Defines methods we wrote to query the Spotify API for different 
 things (user playlists, username, etc.) */

export function getAccessToken() {
  let accessToken = document.cookie.match(
    "(^|[^;]+)\\s*" + "accessToken" + "\\s*=\\s*([^;]+)"
  );
  return accessToken ? accessToken.pop() : "";
}

export async function getUserData(accessToken) {
  let url = "https://api.spotify.com/v1/me";
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let userData = await data.json();
  return userData;
}

export async function getUserPlaylists(userID, accessToken) {
  let url = new URL(
    "https://api.spotify.com/v1/users/" + userID + "/playlists"
  );
  let params = { limit: 50 };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let playlists = await data.json();
  let playlistsMap = {};
  for (const playlist of playlists.items) {
    playlistsMap[playlist.name] = playlist.id;
  }
  console.log(playlistsMap);
  return playlistsMap;
}
