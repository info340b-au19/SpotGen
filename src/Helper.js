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

// Hash function from https://levelup.gitconnected.com/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6
export const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

export async function getUserData(accessToken) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function getSongInfo(accessToken, songID) {
  try {
    let url = new URL("https://api.spotify.com/v1/tracks/" + songID);
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let songInfo = await data.json();
    return songInfo;
  } catch (error) {
    console.error(error);
  }
}

export async function songsWithinGenre(accessToken, genre) {
  let songsInGenre = [];
  let first50 = await get50Songs(genre, 0, accessToken);
  songsInGenre = songsInGenre.concat(first50);

  let offset = 50;
  // Set limit to number of songs in each genre
  while (offset < 100) {
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
  let params = { offset: offset };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  let data = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  let response = await data.json();
  if (response.tracks) {
    return response.tracks.items;
  }
}

export async function getUserPlaylists(userID, accessToken) {
  try {
    let url = new URL(
      "https://api.spotify.com/v1/users/" + userID + "/playlists"
    );
    let params = { limit: 50 };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
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
  } catch (error) {
    console.error(error);
  }
}

export async function getNumberOfSongsInPlaylist(playlistID, accessToken) {
  try {
    let url = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let response = await data.json();
    return response.total;
  } catch (error) {
    console.error(error);
  }
}

export async function getHundredSongsFromPlaylist(
  playlistID,
  offset,
  accessToken
) {
  try {
    let url = new URL(
      "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks"
    );
    let params = { offset: offset };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let response = await data.json();
    return response.items;
  } catch (error) {
    console.error(error);
  }
}

export function shuffleSongs(songs) {
  let index = 0;
  index = Math.floor(Math.random() * songs.length);
  while (songs[index].preview_url === null) {
    index = Math.floor(Math.random() * songs.length);
  }
  return index;
}

export async function createPlaylist(userID, parameters, accessToken) {
  console.log(parameters);
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function addTracksToPlaylist(playlist, tracksToAdd, accessToken) {
  // console.log(tracksToAdd);
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function getSongFeaturesMultiple(songs, accessToken) {
  try {
    let url = new URL("https://api.spotify.com/v1/audio-features"),
      params = { ids: songs };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let songFeatures = await data.json();
    return songFeatures;
  } catch (error) {
    console.error(error);
  }
}
