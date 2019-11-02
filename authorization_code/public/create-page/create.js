
/* Retrieve the access token stored in the browser cookie */
/* Credit: https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript */

function getAccessToken() {
    var accessToken = document.cookie.match('(^|[^;]+)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)');
    return accessToken ? accessToken.pop() : '';
}


async function getUserData(accessToken) {
    let url = 'https://api.spotify.com/v1/me';
    let data = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    let userData = await data.json();
    $("#username").text(userData.display_name);
    let userID = userData.id;
    state["userID"] = userID;
    state["userPlaylists"] = await getUserPlaylists(userID, accessToken);
}


async function testSearch(accessToken) {
    var url = new URL("https://api.spotify.com/v1/search"),
        params = { q: "lady gaga", type: "album" }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    let search = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    let jsonSearch = await search.json();
    // console.log(jsonSearch);
}

async function getUserPlaylists(userID, accessToken) {
    var url = "https://api.spotify.com/v1/users/" + userID + "/playlists"
    let data = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    let playlists = await data.json();
    let playlistsMap = {};
    for (const playlist of playlists.items) {
        playlistsMap[playlist.name] = playlist.id;
        var playlistCheckboxRow = $(`<div class="playlist-checkbox-wrapper">
        <div class="pretty p-svg p-curve p-bigger">
            <input type="checkbox" class="playlistCheckbox" />
            <div class="state">
                <svg class="svg svg-icon" viewBox="0 0 14 14">
                    <path
                        d="M10.8856,1.42401 C11.5365,0.77313 12.5917,0.77313 13.2427,1.42401 C13.8935,2.07488 13.8935,3.13016 13.2427,3.78103 L8.0237,9 L6.4477,10.576 C5.79687,11.2268 4.74157,11.2268 4.09069,10.576 C3.43982,9.9251 3.43982,8.8698 4.09069,8.2189 L9.7071,2.60252 L10.8856,1.42401 Z"
                        id="Path" fill="#00D361"></path>
                    <path
                        d="M1.06519,7.54884 C0.41432,6.89798 0.41432,5.84271 1.06519,5.19184 C1.71606,4.54095 2.77134,4.54095 3.42222,5.19184 L4.93406,6.70364 L6.4459,8.2155 C7.0968,8.8664 7.0968,9.9216 6.4459,10.5725 C5.795,11.2234 4.73976,11.2234 4.08888,10.5725 L3.22519,9.7088 L1.18299,7.66664 L1.06519,7.54884 Z"
                        id="Path" fill="#FFFFFF"></path>
                    <path
                        d="M1.06519,7.54884 C0.41432,6.89798 0.41432,5.84271 1.06519,5.19184 C1.71606,4.54095 2.77134,4.54095 3.42222,5.19184 L4.60072,6.37031 L6.4459,8.2155 C7.0968,8.8664 7.0968,9.9216 6.4459,10.5725 C5.795,11.2234 4.73976,11.2234 4.08888,10.5725 L3.84966,10.3333 L1.18299,7.66664 L1.06519,7.54884 Z"
                        id="Path" fill-opacity="0.01" fill="#000000"></path>

                </svg>
                <label></label>
            </div>
        </div>
    </div>`);
        $(playlistCheckboxRow).find("label").text(playlist.name);
        $("#playlists-wrapper").append(playlistCheckboxRow);
    }
    return playlistsMap;
}

function getSelectedPlaylists() {
    let selectedPlaylists = [];
    let checkedPlaylists = $('.playlistCheckbox:checkbox:checked');
    for (let playlist of checkedPlaylists) {
        let state = playlist.nextSibling.nextSibling;
        let playlistName = $(state).find("label")[0].innerText;
        selectedPlaylists.push(playlistName);
    }
    return selectedPlaylists;
}

async function getSongsInPlaylist(playlistID, accessToken) {
    let songsInPlaylist = [];
    let firstHundred = await getHundredSongsFromPlaylist(playlistID, 0, accessToken);
    songsInPlaylist = songsInPlaylist.concat(firstHundred);
    let numberOfSongsTotalInPlaylist = await getNumberOfSongsInPlaylist(playlistID, accessToken);
    /* Get the rest of the songs based on the total number of songs in playlist */
    let offset = 100;
    while (offset < numberOfSongsTotalInPlaylist) {
        let nextHundredSongs = await getHundredSongsFromPlaylist(playlistID, offset, accessToken);
        songsInPlaylist = songsInPlaylist.concat(nextHundredSongs);
        offset += 100;
    }
    return songsInPlaylist;
}

async function getHundredSongsFromPlaylist(playlistID, offset, accessToken) {
    let hundredSongs = [];
    var url = new URL("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks");
    params = { offset: 0 };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    let response = await data.json();
    return response.items;
}

async function getNumberOfSongsInPlaylist(playlistID, accessToken) {
    var url = "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";
    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    });
    let response = await data.json();
    return response.total;
}

/* Returns an array containing all the songs in the playlists that the user
selected. The new playlist will gather songs based on this pool of songs */
async function getSongPool(accessToken) {
    let songPool = [];
    let selectedPlaylists = getSelectedPlaylists();
    let playlistsMap = state["userPlaylists"];
    for (let playlist of selectedPlaylists) {
        let songsInPlaylist = await getSongsInPlaylist(playlistsMap[playlist], accessToken);
        songPool = songPool.concat(songsInPlaylist);
    }
    return songPool;
}

async function getUserInputs(accessToken) {
    let songPool = await getSongPool(accessToken);
    let desiredArtists = $("#artists-input")[0].value;
    let desiredDanceability = $("#danceability-slider")[0].value;
    let desiredLoudness = $("#loudness-slider")[0].value;
    let desiredTempo = $("#tempo-slider")[0].value;
    let newPlaylistName = $("#playlist-name-input")[0].value;
    return {
        songPool: songPool,
        desiredArtists: desiredArtists,
        desiredDanceability: desiredDanceability,
        desiredLoudness: desiredLoudness,
        desiredTempo: desiredTempo,
        newPlaylistName: newPlaylistName
    }
}

function getSongsMatchingArtist(desiredArtists, songPool) {
    desiredArtists = desiredArtists.split(",");
    desiredArtists = desiredArtists.map(artist => artist.trim().toLowerCase());
    // console.log("Desired artists: " + desiredArtists);
    let songsMatchingDesiredArtists = [];

    for (let song of songPool) {
        let songArtists = [];
        for (let songArtist of song.track.artists) {
            songArtists.push(songArtist.name.toLowerCase());
        }
        // console.log("This song's artists are: " + songArtists);
        for (let artist of desiredArtists) {
            if (songArtists.includes(artist)) {
                songsMatchingDesiredArtists.push(song);
                continue;
            }
        }
    }
    // console.log(songsMatchingDesiredArtists);
    return songsMatchingDesiredArtists;
}

async function createNewPlaylist(accessToken) {
    let userInputs = await getUserInputs(accessToken);
    let newPlaylist = getSongsMatchingArtist(userInputs["desiredArtists"], userInputs["songPool"]);
    let newPlaylistURIs = newPlaylist.map(song => song.track.uri);

    /* Create the playlist */
    let parameters = {
        name: userInputs["newPlaylistName"],
        public: false,
        description: "Enjoy your new playlist made with Spotgen!"
    }
    var createPlaylistURL = "https://api.spotify.com/v1/users/" + state["userID"] + "/playlists";
    let data = await fetch(createPlaylistURL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    });
    let playlist = await data.json();

    /* Add songs to the playlist */
    var addSongsToPlaylistURL = "https://api.spotify.com/v1/playlists/" + playlist.id + "/tracks";
    let addSongsData = await fetch(addSongsToPlaylistURL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: newPlaylistURIs
        })
    });
    let generatedPlaylist = await addSongsData.json();
}

function loadData(accessToken) {
    getUserData(accessToken);
    $("#danceability-checkbox").disabled = true;
    $("#danceability-checkbox").change(function() {
        console.log("Checked? : " + this.checked);
        document.getElementById("danceability-slider").disabled = !this.checked;
    });
    $("#create-playlist-button").click(() => {
        createNewPlaylist(accessToken);
    });
}
let state = {};
state["accessToken"] = getAccessToken();
loadData(state["accessToken"]);
