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

export async function getGenres(accessToken) {
  let url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
  let data = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Authorization': 'Bearer ' + accessToken
      },
  });
  let genres = await data.json();
  return genres;
}

export async function getSong(genre, accessToken) {
  let endpoint = "https://api.spotify.com/v1/search";
  let parameters = "?q=" + genre + "&type=track" + "&limit=50";
  let url = endpoint + parameters;
  let data = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Authorization': 'Bearer ' + accessToken
      },
  });
  let songs = await data.json();
  return songs;
}

export async function getAllSongs(accessToken, genre) {
  let songsInGenre = [];
  let first50 = await get50Songs(genre, 0, accessToken);
  songsInGenre = songsInGenre.concat(first50);
  let numberOfSongsTotalInGenre = await getNumberOfSongsInGenre(genre, accessToken);
  let offset = 50;
  while (offset < numberOfSongsTotalInGenre / 100) { // 1% of the songs
      let next50Songs = await get50Songs(genre, offset, accessToken);
      songsInGenre = songsInGenre.concat(next50Songs);
      offset += 50;
  }
  return songsInGenre;
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
  console.log(playlists);
  let playlistsMap = {};
  for (let playlist of playlists.items) {
    playlistsMap[playlist.name] = playlist.id;
  }
  return playlistsMap;
}
