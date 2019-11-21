import CreatePlaylist from "./Components/CreatePage/CreatePlaylist/CreatePlaylist";

/* -- Defines general helper methods -- */

/* Helper function from: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/ */
export function standardDeviation(values) {
  let avg = average(values);
  let squareDiffs = values.map(function(value) {
    let diff = value - avg;
    let sqrDiff = diff * diff;
    return sqrDiff;
  });
  let avgSquareDiff = average(squareDiffs);
  let stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

/* Helper function from: https://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/ */
export function average(data) {
  let sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);
  let avg = sum / data.length;
  return avg;
}

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
  if (data.status === 401) {
    console.log("Expired Token");
    return "Expired Token";
  }
  let userData = await data.json();
  return userData;
}

export async function getSong(genre, accessToken) {
  let endpoint = "https://api.spotify.com/v1/search";
  let parameters = "?q=" + genre + "&type=track" + "&limit=50";
  let url = endpoint + parameters;
  let data = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let songs = await data.json();
  return songs;
}

export async function getAllSongs(accessToken, genre) {
  let songsInGenre = [];
  let first50 = await get50Songs(genre, 0, accessToken);
  songsInGenre = songsInGenre.concat(first50);
  let numberOfSongsTotalInGenre = await getNumberOfSongsInGenre(
    genre,
    accessToken
  );
  let offset = 50;
  while (offset < numberOfSongsTotalInGenre / 100) {
    // 1% of the songs
    let next50Songs = await get50Songs(genre, offset, accessToken);
    songsInGenre = songsInGenre.concat(next50Songs);
    offset += 50;
  }
  return songsInGenre;
}

export async function get50Songs(genre, offset, accessToken) {
  let url = new URL(
    "https://api.spotify.com/v1/search" +
      "?q=" +
      genre +
      "&type=track" +
      "&limit=50"
  );
  let params = { offset: 0 };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  let data = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let response = await data.json();
  return response.tracks.items;
}

export async function getNumberOfSongsInGenre(genre, accessToken) {
  let url =
    "https://api.spotify.com/v1/search" +
    "?q=" +
    genre +
    "&type=track" +
    "&limit=50";
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let response = await data.json();
  return response.tracks.total;
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
  for (let playlist of playlists.items) {
    playlistsMap[playlist.id] = playlist.name;
  }
  return playlistsMap;
}

export async function getNumberOfSongsInPlaylist(playlistID, accessToken) {
  let url = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let response = await data.json();
  return response.total;
}

export async function getHundredSongsFromPlaylist(
  playlistID,
  offset,
  accessToken
) {
  let url = new URL(
    "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks"
  );
  let params = { offset: offset };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let response = await data.json();
  return response.items;
}

export async function highestPopularity(genre, accessToken) {
  let allSongs = await getAllSongs(accessToken, genre);
  let index = 0;
  let highestPop = 0;
  for (let i = 0; i < allSongs.length; i++) {
    if (allSongs[i].popularity > highestPop) {
      if (allSongs[i].preview_url != null) {
        highestPop = allSongs[i].popularity;
        index = i;
      }
    }
  }
  return index;
}

export async function createPlaylist(userID, parameters, accessToken) {
  let createPlaylistURL =
    "https://api.spotify.com/v1/users/" + userID + "/playlists";
  let data = await fetch(createPlaylistURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parameters)
  });
  let playlist = await data.json();
  return playlist;
}

export async function addTracksToPlaylist(playlist, tracksToAdd, accessToken) {
  let addSongsToPlaylistURL =
    "https://api.spotify.com/v1/playlists/" + playlist.id + "/tracks";
  let addSongsData = await fetch(addSongsToPlaylistURL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uris: tracksToAdd
    })
  });
  return addSongsData;
}

export async function getSongFeaturesMultiple(songs, accessToken) {
  let url = new URL("https://api.spotify.com/v1/audio-features"),
    params = { ids: songs };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  let data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let songFeatures = await data.json();
  return songFeatures;
}
