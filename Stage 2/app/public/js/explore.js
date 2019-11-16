
/* Retrieve the access token stored in the browser cookie */
/* Credit: https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript */
function getAccessToken() {
    var accessToken = document.cookie.match('(^|[^;]+)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)');
    return accessToken ? accessToken.pop() : '';
}
let accessToken = getAccessToken();

let state = {};
state['currentlyPlaying'] = null;
state['currentAudio'] = null;

// Get spotify user data
async function getUserData(accessToken) {
    let url = 'https://api.spotify.com/v1/me';
    try {
        let data = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        let userData = await data.json();
        let username = document.querySelector('.username');
        username.textContent = userData.display_name;
    } catch (error) {
        document.querySelector(".alert").style.display = 'block';
    }
}

// Gets all the genres from Spotify API
async function getGenres(accessToken) {
    let url = "https://api.spotify.com/v1/recommendations/available-genre-seeds";
    try {
        let data = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        let genres = await data.json();
        return genres;
    } catch (error) {
        document.querySelector(".alert").style.display = 'block';
    }
}
let genre = getGenres(accessToken);

// Retrieves the songs for given genre
async function getSong(genre, accessToken) {
    let endpoint = "https://api.spotify.com/v1/search";
    let parameters = "?q=" + genre + "&type=track" + "&limit=50";
    let url = endpoint + parameters;
    try {
        let data = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        let songs = await data.json();
        return songs;
    } catch (error) {
        document.querySelector(".alert").style.display = 'block';
    }
}

// Gets all the total songs for the given genre
async function getAllSongs(accessToken, genre) {
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

// Returns 50 songs at a time
async function get50Songs(genre, offset, accessToken) {
    let url = new URL("https://api.spotify.com/v1/search" + "?q=" + genre + "&type=track" + "&limit=50");
    params = { offset: 0 };
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    try {
        let data = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        let response = await data.json();
        return response.tracks.items;
    } catch (error) {
        document.querySelector(".alert").style.display = 'block';
    }

}

// Returns the number of songs in that genre 
async function getNumberOfSongsInGenre(genre, accessToken) {
    let url = "https://api.spotify.com/v1/search" + "?q=" + genre + "&type=track" + "&limit=50";
    try {
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        let response = await data.json();
        return response.tracks.total;
    } catch (error) {
        document.querySelector(".alert").style.display = 'block';
    }
}

// Returns the img of the song of highest popularity (top song) in given genre
async function highestPopularity(genre, accessToken) {
    let genres = ["alt-rock", "hip-hop", "country", "folk", "hard-rock", "classical", "jazz"];
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
    associatedGenre(genres.indexOf(genre), index);

    // Play the associating song of the genre that user clicks on
    function associatedGenre(genreIndex, songIndex) {
        let button = $('.music-control-button:eq(' + genreIndex + ')')[0];
        updateMusic(button, allSongs[songIndex].preview_url)
    }

    let img = await getImg(index, allSongs, genre);
    return index;
}


// Changes the original img in html to img of top song of each genre
async function getImg(index, allSongs, genre) {
    let imgUrl = allSongs[index].album.images[0].url;
    let img = document.querySelector('#' + genre);
    img.src = imgUrl;
}

// Plays or pauses the music when user clicks play or pause
function updateMusic(button, playUrl) {
    let audio = new Audio(playUrl);

    button.addEventListener('click', function () {
        event.preventDefault();
        playPauseMusic(button, audio);
    });
}

// To display the play or pause button 
function playPauseMusic(button, audio) {
    // Play when nothing is playing
    if (state['currentlyPlaying'] === null) {
        state['currentlyPlaying'] = button;
        state['currentAudio'] = audio;
        state['currentAudio'].play();
        button.querySelector(".play").style.display = 'none';
        button.querySelector(".pause").style.display = 'block';
    }
    // Pause the one that is playing
    else if (state['currentlyPlaying'] == button) {
        state['currentAudio'].pause();
        state['currentlyPlaying'] = null;
        state['currentAudio'] = null;
        button.querySelector(".play").style.display = 'block';
        button.querySelector(".pause").style.display = 'none';
    }
    // Pause the old audio and play the new one
    else {
        state['currentAudio'].pause();
        state['currentlyPlaying'].querySelector(".play").style.display = 'block';
        state['currentlyPlaying'].querySelector(".pause").style.display = 'none';
        state['currentlyPlaying'] = button;
        state['currentAudio'] = audio;
        state['currentAudio'].play();
        button.querySelector(".play").style.display = 'none';
        button.querySelector(".pause").style.display = 'block';
    }
}

getUserData(accessToken);

let altRock = highestPopularity('alt-rock', accessToken);
let hipHop = highestPopularity('hip-hop', accessToken);
let country = highestPopularity('country', accessToken);
let folk = highestPopularity('folk', accessToken);
let hardRock = highestPopularity('hard-rock', accessToken);
let classical = highestPopularity('classical', accessToken);
let jazz = highestPopularity('jazz', accessToken);