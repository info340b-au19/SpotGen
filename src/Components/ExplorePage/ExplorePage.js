import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";

import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";
import ExplorePageActions from "./ExplorePageActions";
import { getUserData, songsWithinGenre, shuffleSongs } from "../../Helper";
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

  // Sets user data and the attributes of the genre objects
  async componentDidMount() {
    this.setState({ isLoadingGenres: true });
    let userData = await getUserData(this.props.accessToken);
    this.setState({ userData: userData });
    await this.assignSongsToGenres();

    let savedSongs = await this.getSavedSongs();
    this.setState({
      isLoadingGenres: false,
      savedSongs: savedSongs
    });
  }

  // Sets the attributes of the genre objects
  async assignSongsToGenres() {
    this.setState({ isLoadingGenres: true });

    let genreObjects = cardAttributes();
    for (let i = 0; i < genreObjects.length; i++) {
      let genreAttributes = await this.getGenreAttributes(genreObjects[i]);

      genreObjects[i].genreSongs = genreAttributes.songsInGenre;
      let index = genreObjects[i].genreSongs[genreAttributes.randomIndex];
      genreObjects[i].id = index.id;

      genreObjects[i].img = index.album.images[0].url;
      genreObjects[i].alt = index.album.name;
      genreObjects[i].previewUrl = index.preview_url;
      genreObjects[i].audio = new Audio(genreObjects[i].previewUrl);
    }
    this.setState({ genres: genreObjects, isLoadingGenres: false });
  }

  // Get songs in genre and index of randomized song
  async getGenreAttributes(genreObject) {
    let songsInGenre = await songsWithinGenre(
      this.props.accessToken,
      genreObject.genreAPI
    );
    let randomIndex = shuffleSongs(songsInGenre);
    return {
      songsInGenre: songsInGenre,
      randomIndex: randomIndex
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

  // Stores user information to Firebase database
  async pressSaveSongButton(genreObject) {
    let usersRef = firebase.database().ref("users");
    let spotifyID = this.state.userData.display_name;
    let savedSongs = this.state.savedSongs;
    // let likedSongID = this.getLikedSongID(genreObject.alt, savedSongs);
    if (this.isSongInSavedSongs(genreObject, savedSongs)) {
      // unsave
      delete savedSongs[genreObject.id];
      this.setState({ savedSongs: savedSongs });
      usersRef
        .child(spotifyID)
        .child("savedSongs")
        .child(genreObject.id)
        .remove();
    } else {
      // save
      savedSongs[genreObject.id] = genreObject;
      this.setState({ savedSongs: savedSongs });
      usersRef
        .child(spotifyID)
        .child("savedSongs")
        .child(genreObject.id)
        .set(genreObject);
    }
  }

  // Retrieves the songs that user saved
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

  // Retrieves the ID of favorited song
  getLikedSongID(songName, savedSongs) {
    // let usersavedSongsRef = firebase
    //   .database()
    //   .ref("users/" + this.state.userData.id + "/savedSongs");
    // const snapshot = await usersavedSongsRef.once("value");
    // const savedSongs = snapshot.val();
    console.log(songName);
    console.log(savedSongs);
    for (let songID in savedSongs) {
      if (songName === savedSongs[songID].alt) {
        return songID;
      }
    }
    return "Not found";
  }

  // Checks if current song is in saved ones
  isSongInSavedSongs(song, savedSongs) {
    for (let songID in savedSongs) {
      if (song.alt === savedSongs[songID].alt) {
        // console.log("Found a match");
        return true;
      }
    }
    return false;
  }

  // Update the status of genre cards when shuffled
  updateShufflePlay() {
    this.setState({ isLoadingGenres: true });
    this.setState({ currentlyPlayingGenre: null });
    this.assignSongsToGenres();
    this.setState({ isLoadingGenres: false });
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
          <ExplorePageActions
            randomize={() => {
              this.updateShufflePlay();
            }}
            customClass={
              this.state.isLoadingGenres
                ? "hidden"
                : "explore-page-action-buttons-wrapper"
            }
          />
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
