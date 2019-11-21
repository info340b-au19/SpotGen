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
      currentlyPlayingObj: null
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
      genreObjects[i].currentlyPlaying = false;
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
    // we are playing our first one
    if (this.state.currentlyPlayingObj === null) {
      genreObj.currentlyPlaying = true;
      this.setState({
        currentlyPlayingObj: genreObj
      });
    }
    // switching to a different card
    else if (this.state.currentlyPlayingObj !== genreObj) {
      this.setState({
        currentlyPlayingObj: {
          ...this.state.currentlyPlayingObj,
          currentlyPlaying: false
        }
      });
      genreObj.currentlyPlaying = true;
    } else if (this.state.currentlyPlayingObj === genreObj) {
      console.log("Pausing our current one");
      genreObj.currentlyPlaying = !genreObj.currentlyPlaying;
      this.setState({
        ...this.state
      });
      // this.setState({
      //   currentlyPlayingObj: {
      //     ...this.state.currentlyPlayingObj,
      //     currentlyPlaying: !this.state.currentlyPlayingObj.currentlyPlaying
      //   }
      // });
    }

    // if (this.state.currentlyPlayingObj) {
    //   console.log("Should pause");
    // }
    // if (this.state.currentlyPlayingObj !== genreObj) {
    //   console.log("We clicked the same card");
    //   genreObj.currentlyPlaying = !genreObj.currentlyPlaying;
    //   this.setState({ currentlyPlayingObj: genreObj });
    // }
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <button
          onClick={() => {
            console.log(this.state.genres);
          }}
        >
          test
        </button>
        <main>
          <div className="genre-cards-wrapper">
            {this.state.genres.map(genreObject => {
              return (
                <GenreCard
                  genreObject={genreObject}
                  updatePlaying={cardClicked => {
                    this.updatePlaying(cardClicked);
                  }}
                  currentlyPlayingObj={this.state.currentlyPlayingObj}
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
