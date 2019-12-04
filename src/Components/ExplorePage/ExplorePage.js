import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";

import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";
import ExplorePageActions from "./ExplorePageActions";
import {
  getUserData,
  getSong,
  getAllSongs,
  highestPopularity
} from "../../Helper";
import { cardAttributes } from "./CardAttributes";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: [],
      currentlyPlayingGenre: null,
      isLoadingGenres: false,
      savedSongs: {}
    };
  }

  // Sets the attributes of the genre objects
  async componentDidMount() {
    this.setState({ isLoadingGenres: true });
    let userData = await getUserData(this.props.accessToken);
    this.setState({ userData: userData });

    let genreObjects = cardAttributes();

    for (let i = 0; i < genreObjects.length; i++) {
      let genreAttributes = await this.getGenreAttributes(genreObjects[i]);

      genreObjects[i].genreSongs = genreAttributes.songsInGenre;
      let index = genreObjects[i].genreSongs[genreAttributes.indexTop];
      genreObjects[i].topImg = index.album.images[0].url;
      genreObjects[i].alt = index.album.name;
      genreObjects[i].previewUrl = index.preview_url;
      genreObjects[i].audio = new Audio(genreObjects[i].previewUrl);
    }

    // Updates the state with appropriate information calculated from componentDidMount()
    let savedSongs = await this.getSavedSongs();
    this.setState({
      genres: genreObjects,
      isLoadingGenres: false,
      savedSongs: savedSongs
    });
  }

  async getGenreAttributes(genreObject) {
    let songs = await getSong(genreObject.genreAPI, this.props.accessToken);
    let songsInGenre = await getAllSongs(
      this.props.accessToken,
      genreObject.genreAPI
    );
    let indexTop = await highestPopularity(
      genreObject.genreAPI,
      this.props.accessToken
    );
    return {
      songs: songs,
      songsInGenre: songsInGenre,
      indexTop: indexTop
    };
  }

  // Update the status of whether song is playing
  updatePlaying(genreObj) {
    // Currently already playing
    if (this.state.currentlyPlayingGenre === genreObj.genreName) {
      this.setState({ currentlyPlayingGenre: null });
    } else {
      this.setState({ currentlyPlayingGenre: genreObj.genreName });
    }
  }

  /* Creates DOM objects for our genre object cards */
  createGenreDOMObjects() {
    console.log("Creating new ones");
    return this.state.genres.map(genreObject => {
      return (
        <GenreCard
          key={genreObject.genreName}
          genreObject={genreObject}
          updatePlaying={cardClicked => {
            this.updatePlaying(cardClicked);
          }}
          currentlyPlayingGenre={this.state.currentlyPlayingGenre}
          pressSaveSongButton={songID => this.pressSaveSongButton(songID)}
          songSaved={this.isSongInSavedSongs(
            genreObject,
            this.state.savedSongs
          )}
        />
      );
    });
  }

  async pressSaveSongButton(genreObject) {
    let usersRef = firebase.database().ref("users");
    let spotifyID = this.state.userData.id;
    let savedSongs = await this.getSavedSongs();
    if (this.isSongInSavedSongs(genreObject, savedSongs)) {
      // un save
      let likedSongID = this.getLikedSongID(genreObject.alt, savedSongs);
      usersRef
        .child(spotifyID)
        .child("likedSongs")
        .child(likedSongID)
        .remove();
    } else {
      //save
      usersRef
        .child(spotifyID)
        .child("likedSongs")
        .push(genreObject);
    }
    savedSongs = await this.getSavedSongs();
    this.setState({ savedSongs: savedSongs });
  }

  async getSavedSongs() {
    let userLikedSongsRef = firebase
      .database()
      .ref("users/" + this.state.userData.id + "/likedSongs");
    const snapshot = await userLikedSongsRef.once("value");
    const likedSongs = snapshot.val();
    return likedSongs;
  }

  getLikedSongID(songName, savedSongs) {
    // let userLikedSongsRef = firebase
    //   .database()
    //   .ref("users/" + this.state.userData.id + "/likedSongs");
    // const snapshot = await userLikedSongsRef.once("value");
    // const likedSongs = snapshot.val();
    console.log(songName);
    console.log(savedSongs);
    for (let songID in savedSongs) {
      if (songName === savedSongs[songID].alt) {
        return songID;
      }
    }
    return "Not found";
  }

  isSongInSavedSongs(song, savedSongs) {
    for (let songID in savedSongs) {
      if (song.alt === savedSongs[songID].alt) {
        // console.log("Found a match");
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main>
          <div
            className={
              this.state.isLoadingGenres
                ? "spinner-songs-wrapper spinner-genres"
                : "hidden"
            }
          >
            <div className="spinner-songs">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
          <ExplorePageActions />
          <div
            className={
              this.props.isLoadingGenres ? "hidden" : "genre-cards-wrapper"
            }
          >
            {this.createGenreDOMObjects()}
          </div>
        </main>
        <footer>
          <p>2019 Kha &amp; David ©</p>
          <p>Contact at kha.vng@gmail.com or dchiang0@uw.edu</p>
          <p>Data collected through Spotify Web API</p>
        </footer>
      </div>
    );
  }
}
