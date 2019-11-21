import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";

import { getUserData } from "../../Helper";
import { getSong } from "../../Helper";
import { getAllSongs } from "../../Helper";
import { get50Songs } from "../../Helper";
import { getNumberOfSongsInGenre } from "../../Helper";
import { highestPopularity } from "../../Helper";
import { cardAttributes } from "./CardAttributes";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: [],
      currentlyPlayingGenre: null
    };
  }

  // Sets the attributes of the genre objects
  async componentDidMount() {
    let genreObjects = cardAttributes();

    let userData, songs, songsInGenre, items, numSongs, indexTop;
    for (let i = 0; i < genreObjects.length; i++) {
      userData = await getUserData(this.props.accessToken);
      songs = await getSong(genreObjects[i].genreAPI, this.props.accessToken);
      songsInGenre = await getAllSongs(
        this.props.accessToken,
        genreObjects[i].genreAPI
      );
      items = await get50Songs(
        genreObjects[i].genreAPI,
        0,
        this.props.accessToken
      );
      numSongs = await getNumberOfSongsInGenre(
        genreObjects[i].genreAPI,
        this.props.accessToken
      );
      indexTop = await highestPopularity(
        genreObjects[i].genreAPI,
        this.props.accessToken
      );
      genreObjects[i].genreSongs = songsInGenre;
      genreObjects[i].topImg =
        genreObjects[i].genreSongs[indexTop].album.images[0].url;
      genreObjects[i].alt = genreObjects[i].genreSongs[indexTop].album.name;
      genreObjects[i].previewUrl =
        genreObjects[i].genreSongs[indexTop].preview_url;
      genreObjects[i].audio = new Audio(genreObjects[i].previewUrl);
    }

    // Updates the state with appropriate information calculated from
    // componentDidMount()
    this.setState({
      userData: userData,
      genres: genreObjects
    });
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

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main>
          <div className="genre-cards-wrapper">
            {this.state.genres.map(genreObject => {
              return (
                <GenreCard
                  genreObject={genreObject}
                  updatePlaying={cardClicked => {
                    this.updatePlaying(cardClicked);
                  }}
                  currentlyPlayingGenre={this.state.currentlyPlayingGenre}
                />
              );
            })}
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
