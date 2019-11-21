import React, { Component } from "react";
import SongPool from "./SongPool";

import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";

import { createPlaylist, addTracksToPlaylist } from "../../../Helper";

export default class CreatePlaylist extends Component {
  constructor() {
    super();
    this.state = {
      playlistName: "",
      isLoading: false
    };
    notifier.configure({
      autoClose: 3000,
      width: 375,
      position: "bottom-center",
      delay: 0,
      closeOnClick: true,
      pauseOnHover: true,
      onlyLast: false,
      rtl: false,
      newestOnTop: true,
      animation: {
        in: "fadeIn",
        out: "fadeOut",
        duration: 400
      }
    });
  }

  async createPlaylist(songPool, accessToken) {
    if (!this.state.playlistName) {
      notifier.error("You must name your playlist before creating it!");
      return;
    }
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
    notifier.success(
      "Your playlist has been created and added to your Spotify account! Enjoy!"
    );
  }

  render() {
    return (
      <section id="name-playlist">
        <div className="step">
          <div className="step-number">3</div>
          <div>
            <h2>Create Your New Playlist</h2>
          </div>
        </div>
        <label className="input-row-label">Songs In Your New Playlist</label>

        <SongPool
          isLoadingSongs={this.props.isLoadingSongs}
          songPool={this.props.songPool}
          removeSongFromPool={song => {
            this.props.removeSongFromPool(song);
          }}
        />
        <div id="playlist-name-input-wrapper" className="input-row-wrapper">
          <label className="input-row-label">Playlist Name</label>
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
            this.createPlaylist(this.props.songPool, this.props.accessToken)
          }
        >
          Create
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
      </section>
    );
  }
}
