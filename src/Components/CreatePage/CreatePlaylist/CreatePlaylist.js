import React, { Component } from "react";

import {
  getNumberOfSongsInPlaylist,
  getHundredSongsFromPlaylist,
  createPlaylist,
  addTracksToPlaylist
} from "../../../Helper";

export default class CreatePlaylist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: "",
      isLoading: false,
      showingSuccessMessage: false
    };
  }

  async getSongPool(selectedPlaylists, accessToken) {
    let songPool = [];
    console.log(selectedPlaylists);
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

  async createPlaylist(selectedPlaylists, accessToken) {
    this.setState({ isLoading: true });
    /* Create the playlist */
    let parameters = {
      name: this.state.playlistName,
      public: false,
      description: "Enjoy your new playlist made with Spotgen!"
    };
    let createdPlaylist = await createPlaylist(
      this.props.userData.id,
      parameters,
      this.props.accessToken
    );

    let songPool = await this.getSongPool(selectedPlaylists, accessToken);
    let songPoolURIs = songPool.map(song => song.track.uri);

    /* Add songs to the playlist */
    for (let songIndex = 0; songIndex < songPoolURIs.length; songIndex += 100) {
      /* Can only add 100 songs per request */
      addTracksToPlaylist(
        createdPlaylist,
        songPoolURIs.slice(songIndex, songIndex + 100),
        accessToken
      );
    }
    this.setState({ isLoading: false });
    this.setState({ showingSuccessMessage: true });
    setTimeout(() => {
      this.setState({ showingSuccessMessage: false });
    }, 3000);
  }
  async test() {
    console.log(
      await this.getSongPool(
        this.props.selectedPlaylists,
        this.props.accessToken
      )
    );
  }

  render() {
    return (
      <section id="name-playlist">
        {/* <button
          onClick={() => {
            this.test();
          }}
        >
          test
        </button> */}
        <div className="step">
          <div className="step-number">3</div>
          <div>
            <h2>Name Your New Playlist</h2>
          </div>
        </div>
        <div id="playlist-name-input-wrapper" className="input-row-wrapper">
          <input
            id="playlist-name-input"
            className="text-input"
            type="text"
            placeholder="Slow, smooth jazz beats"
            value={this.state.playlistName}
            onChange={event => {
              this.setState({ playlistName: event.target.value });
            }}
          />
        </div>
        <button
          id="create-playlist-button"
          className="button"
          onClick={() =>
            this.createPlaylist(
              this.props.selectedPlaylists,
              this.props.accessToken
            )
          }
        >
          Create New Playlist
        </button>
        {this.state.isLoading && (
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        )}
        {this.state.showingSuccessMessage && (
          <div id="success-message-wrapper">
            <span id="success-message">
              Successfully created your playlist. Check Spotify!
            </span>
          </div>
        )}
      </section>
    );
  }
}
