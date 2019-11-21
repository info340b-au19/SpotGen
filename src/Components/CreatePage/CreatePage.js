import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists/SelectPlaylists";
import FilterSongs from "./FilterSongs/FilterSongs";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";

import {
  getUserData,
  getUserPlaylists,
  getNumberOfSongsInPlaylist,
  getHundredSongsFromPlaylist
} from "../../Helper";

/* Page that allows users to create new playlists based on different inputs and filtering choices */
export default class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userPlaylists: {},
      songPool: [],
      filterByArtistsEnabled: false,
      artists: "",
      filterByLoudnessEnabled: false,
      loudness: 50
    };
    this.selectedPlaylists = new Set();
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    if (userData === "Expired Token") {
      this.props.history.push("/login");
    } else {
      let userPlaylists = await getUserPlaylists(
        userData.id,
        this.props.accessToken
      );
      // console.log(userPlaylists);
      this.setState({
        userData: userData,
        userPlaylists: userPlaylists
      });
    }
  }

  handleTogglePlaylistCheckbox(playlistID) {
    if (!this.selectedPlaylists.has(playlistID)) {
      this.selectedPlaylists.add(playlistID);
    } else {
      this.selectedPlaylists.delete(playlistID);
    }
    this.updateSongPool();
  }

  toggleFilteringByArtists(checked) {
    this.setState({ filterByArtistsEnabled: checked });
    this.updateSongPool();
  }

  handleInputArtists(artists) {
    this.setState({
      artists: artists
    });
    this.updateSongPool();
  }

  toggleFilteringByLoudness(checked) {
    this.setState({ filterByLoudnessEnabled: checked });
    this.updateSongPool();
  }

  handleInputLoudness(loudness) {
    this.setState({
      loudness: loudness
    });
    this.updateSongPool();
  }

  async updateSongPool() {
    /* Get songs from selected playlists */
    let songPool = await this.getSongPool(
      this.selectedPlaylists,
      this.props.accessToken
    );
    songPool = this.filterOutLocalSongs(songPool);
    songPool = this.filterOutDuplicateSongs(songPool);
    if (this.state.filterByArtistsEnabled) {
      songPool = this.getSongsMatchingArtist(this.state.artists, songPool);
    }
    this.setState({
      songPool: songPool
    });
  }

  filterOutLocalSongs(songPool) {
    return songPool.filter(song => !song.track.uri.includes("local"));
  }

  filterOutDuplicateSongs(songPool) {
    return songPool.filter(
      (song, index, self) =>
        self.findIndex(s => s.track.name === song.track.name) === index
    );
  }

  async getSongPool(selectedPlaylists, accessToken) {
    let songPool = [];
    let selectedPlaylistsArray = [...selectedPlaylists];
    for (let playlist of selectedPlaylistsArray) {
      let songsInPlaylist = await this.getSongsInPlaylist(
        playlist,
        accessToken
      );
      songPool = songPool.concat(songsInPlaylist);
    }
    return songPool;
  }

  async getSongsInPlaylist(playlistID, accessToken) {
    let songsInPlaylist = [];
    let firstHundred = await getHundredSongsFromPlaylist(
      playlistID,
      0,
      accessToken
    );
    songsInPlaylist = songsInPlaylist.concat(firstHundred);
    let numberOfSongsTotalInPlaylist = await getNumberOfSongsInPlaylist(
      playlistID,
      accessToken
    );
    /* Get the rest of the songs based on the total number of songs in playlist */
    for (
      let offset = 100;
      offset < numberOfSongsTotalInPlaylist;
      offset += 100
    ) {
      let nextChunkOfSongs = await getHundredSongsFromPlaylist(
        playlistID,
        offset,
        accessToken
      );
      songsInPlaylist = songsInPlaylist.concat(nextChunkOfSongs);
    }

    return songsInPlaylist;
  }

  getSongsMatchingArtist(desiredArtists, songPool) {
    desiredArtists = desiredArtists.split(",");
    desiredArtists = desiredArtists.map(artist => artist.trim().toLowerCase());
    let songsMatchingDesiredArtists = [];
    for (let song of songPool) {
      let songArtists = [];
      for (let songArtist of song.track.artists) {
        songArtists.push(songArtist.name.toLowerCase());
      }
      if (this.songContainsMatchingArtist(songArtists, desiredArtists)) {
        songsMatchingDesiredArtists.push(song);
      }
    }
    return songsMatchingDesiredArtists;
  }

  songContainsMatchingArtist(songArtists, desiredArtists) {
    for (let songArtist of songArtists) {
      for (let desiredArtist of desiredArtists) {
        if (songArtist.includes(desiredArtist)) {
          return true;
        }
      }
    }
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Test
        </button>
        <main id="create-page-main">
          <SelectPlaylists
            userPlaylists={this.state.userPlaylists}
            handleTogglePlaylistCheckbox={playlistID => {
              this.handleTogglePlaylistCheckbox(playlistID);
            }}
          />
          <FilterSongs
            filterByArtistsEnabled={this.state.filterByArtistsEnabled}
            toggleFilteringByArtists={checked => {
              this.toggleFilteringByArtists(checked);
            }}
            artists={this.artists}
            setArtists={artists => {
              this.handleInputArtists(artists);
            }}
            filterByLoudnessEnabled={this.state.filterByLoudnessEnabled}
            toggleFilteringByLoudness={checked => {
              this.toggleFilteringByLoudness(checked);
            }}
            loudness={this.loudness}
            setLoudness={loudness => {
              this.handleInputLoudness(loudness);
            }}
          />
          <CreatePlaylist
            userData={this.state.userData}
            songPool={this.state.songPool}
            accessToken={this.props.accessToken}
          />
        </main>
      </div>
    );
  }
}
