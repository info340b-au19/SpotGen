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

export async function createPlaylist(userID, parameters, accessToken) {
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
