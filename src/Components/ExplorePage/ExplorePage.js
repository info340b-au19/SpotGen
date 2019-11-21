import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";

import { getUserData } from "../../Helper";
import { getSong } from "../../Helper";
import { getAllSongs } from "../../Helper";
import { highestPopularity } from "../../Helper";
import { cardAttributes } from "./CardAttributes";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: [],
      currentlyPlayingGenre: null,
      isLoadingGenres: false
    };
  }

  // Sets the attributes of the genre objects
  async componentDidMount() {
    this.setState({ isLoadingGenres: true });
    let userData = await getUserData(this.props.accessToken);
    this.setState({ userData: userData });

    let genreObjects = cardAttributes();

    // let userData, songs, songsInGenre, items, numSongs, indexTop;
    for (let i = 0; i < genreObjects.length; i++) {
      let genreAttributes = await this.getGenreAttributes(genreObjects[i]);

      genreObjects[i].genreSongs = genreAttributes.songsInGenre;
      genreObjects[i].topImg =
        genreObjects[i].genreSongs[
          genreAttributes.indexTop
        ].album.images[0].url;
      genreObjects[i].alt =
        genreObjects[i].genreSongs[genreAttributes.indexTop].album.name;
      genreObjects[i].previewUrl =
        genreObjects[i].genreSongs[genreAttributes.indexTop].preview_url;
      genreObjects[i].audio = new Audio(genreObjects[i].previewUrl);
    }

    // Updates the state with appropriate information calculated from
    // componentDidMount()
    this.setState({
      genres: genreObjects,
      isLoadingGenres: false
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
    return this.state.genres.map(genreObject => {
      return (
        <GenreCard
          key={genreObject.genreName}
          genreObject={genreObject}
          updatePlaying={cardClicked => {
            this.updatePlaying(cardClicked);
          }}
          currentlyPlayingGenre={this.state.currentlyPlayingGenre}
        />
      );
    });
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
