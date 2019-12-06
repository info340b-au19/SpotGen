import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase/app";
import "firebase/database";
import notifier from "simple-react-notifications";

import { getUserData, createPlaylist, addTracksToPlaylist } from "../../Helper";

export default class SavedSongs extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      savedSongs: {},
      loadingSongs: false
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

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    this.setState({ userData: userData, loadingSongs: true });
    let savedSongs = await this.getSavedSongs();
    this.setState({
      savedSongs: savedSongs,
      loadingSongs: false
    });
  }

  /* Gets saved songs from firebase */
  async getSavedSongs() {
    let usersavedSongsRef = firebase
      .database()
      .ref("users/" + this.state.userData.id + "/savedSongs");
    const snapshot = await usersavedSongsRef.once("value");
    const savedSongs = snapshot.val();
    if (!savedSongs) {
      return {};
    }
    return savedSongs;
  }

  /* Create a playlist to the user's spotify account using the given saved songs */

  async createPlaylist(songPool, accessToken) {
    /* Create the playlist */
    let parameters = {
      name: "SpotGen Saved Songs",
      public: false,
      description: "Enjoy your new playlist made with Spotgen!"
    };
    let createdPlaylist = await createPlaylist(
      this.state.userData.id,
      parameters,
      this.props.accessToken
    );
    let songPoolURIs = [];
    for (let songID in songPool) {
      songPoolURIs.push(songPool[songID].uri);
    }

    /* Add songs to the playlist */
    for (let songIndex = 0; songIndex < songPoolURIs.length; songIndex += 100) {
      /* Can only add 100 songs per request */
      addTracksToPlaylist(
        createdPlaylist,
        songPoolURIs.slice(songIndex, songIndex + 100),
        accessToken
      );
    }
    notifier.success(
      "Your playlist has been created and added to your Spotify account! Enjoy!"
    );
  }

  /* Unsaves a song from database */
  async unsaveSong(song) {
    let usersRef = firebase.database().ref("users");
    let spotifyID = this.state.userData.id;
    let savedSongs = this.state.savedSongs;
    delete savedSongs[song.id];
    this.setState({ savedSongs: savedSongs });
    usersRef
      .child(spotifyID)
      .child("savedSongs")
      .child(song.id)
      .remove();
  }

  render() {
    return (
      <div id="saved-songs-page">
        <Navbar userData={this.state.userData} customSub="" />
        <div className="song-page-top-wrapper">
          <button
            className="back-button"
            aria-label="back to explore page button"
            onClick={() => {
              this.props.history.push("/explore");
            }}
          >
            <svg width="24" height="24">
              <rect width="24" height="24" fill="none" rx="0" ry="0" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.9999 9.78987H9.30992L11.5499 7.54987C11.9699 7.12987 12.1899 6.57987 12.1899 5.98987C12.1899 5.39987 11.9599 4.84987 11.5499 4.42987C10.7199 3.59987 9.26992 3.59987 8.43992 4.42987L2.43992 10.4299C2.33992 10.5299 2.24992 10.6499 2.16992 10.7699C2.13992 10.8099 2.10992 10.8599 2.06992 10.9499C2.02992 11.0099 1.99992 11.0799 1.96992 11.1499C1.93992 11.2099 1.91992 11.2699 1.88992 11.3999C1.87992 11.4199 1.84992 11.5299 1.83992 11.5599C1.77992 11.8499 1.77992 12.1299 1.83992 12.4199C1.84992 12.4699 1.86992 12.5299 1.89992 12.6499C1.91992 12.7099 1.93992 12.7699 1.96992 12.8299C1.99992 12.8999 2.02992 12.9599 2.08992 13.0699C2.09992 13.0899 2.15992 13.1899 2.16992 13.2099C2.24992 13.3299 2.33992 13.4399 2.44992 13.5499L8.44992 19.5499C8.86992 19.9699 9.41992 20.1899 10.0099 20.1899C10.5999 20.1899 11.1499 19.9599 11.5699 19.5499C12.4299 18.6899 12.4299 17.2999 11.5699 16.4399L9.32992 14.1999H19.9999C21.2099 14.1999 22.1999 13.2099 22.1999 11.9999C22.1999 10.7899 21.2099 9.78987 19.9999 9.78987Z"
                fill="#e1e1e1"
              />
            </svg>
          </button>
          <div id="saved-songs-title-wrapper">
            <h1>Saved Songs</h1>
          </div>
        </div>
        <div id="saved-songs-card">
          <div
            className={
              this.state.loadingSongs ? "spinner-songs-wrapper" : "hidden"
            }
          >
            <div className="spinner-songs">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
          <div className={this.props.isLoadingSongs ? "hidden" : ""}>
            {Object.keys(this.state.savedSongs).map(key => {
              return (
                <div className="song-row" key={key}>
                  <button
                    className="remove-song-button"
                    aria-label="remove-song"
                    onClick={() => {
                      this.unsaveSong(this.state.savedSongs[key]);
                    }}
                  >
                    ✖
                  </button>
                  <button
                    className="song-info-button song-title"
                    onClick={() => {
                      this.props.history.push(
                        "/song/" + this.state.savedSongs[key].id
                      );
                    }}
                  >
                    {this.state.savedSongs[key].name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button
          id="create-saved-songs-playlist-button"
          aria-label="create-playlist"
          className="button"
          onClick={() => {
            this.createPlaylist(this.state.savedSongs, this.props.accessToken);
          }}
        >
          Create Playlist
        </button>
      </div>
    );
  }
}
