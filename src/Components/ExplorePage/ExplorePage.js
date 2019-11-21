import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";

import { getUserData } from "../../Helper";
import { getSong } from "../../Helper";
import { getAllSongs } from "../../Helper";
import { get50Songs } from "../../Helper";
import { getNumberOfSongsInGenre } from "../../Helper";
import { highestPopularity } from "../../Helper";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: [],
      currentlyPlayingObj: null
    };
  }

  async componentDidMount() {
    let genreObjects = [
      {
        genreAPI: "alt-rock",
        genreName: "Alternative Rock",
        description:
          "A style of rock music that emerged from the independent music underground\
        of the 1970s andbecame widely popular in the 1980s."
      },
      {
        genreAPI: "hip-hop",
        genreName: "Rap",
        description:
          "A style of popular music in which an insistent, recurring beat pattern provides\
        the background and counterpoint for rapid, slangy, and often boastful\
        rhyming patter glibly intoned by a vocalist or vocalists."
      },
      {
        genreAPI: "country",
        genreName: "Country",
        description:
          "A genre of popular music that originated in the southern United States in the early 1920s.\
        It takes its roots from genres such as American folk music and blues."
      },
      {
        genreAPI: "folk",
        genreName: "Folk",
        description:
          "Includes traditional folk music and the genre that evolved from it during the 20th-century\
      folk revival. Some types of folk music may be called world music."
      },
      {
        genreAPI: "hard-rock",
        genreName: "Hard-Rock",
        description:
          "A loosely defined subgenre of rock music that began in the mid-1960s, with the garage,\
        psychedelic and blues rock movements. It is typified by a heavy use of aggressive vocals,\
        distorted electric guitars, bass guitar, drums, and often accompanied with keyboards."
      },
      {
        genreAPI: "classical",
        genreName: "Classical",
        description:
          "Art music produced or rooted in the traditions of Western culture, including both liturgical\
        (religious) and secular music."
      },
      {
        genreAPI: "jazz",
        genreName: "Jazz",
        description:
          "A music genre that originated in the African-American communities of New Orleans, United\
        States. It originated in the late 19th and early 20th centuries, and developed from roots in blues\
        and ragtime. Jazz is seen by many as 'America's classical music.'"
      }
    ];
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
      genreObjects[i].currentAudio = null;
    }

    this.setState({
      userData: userData,
      genres: genreObjects
    });
  }

  updatePlaying = genreObj => {
    this.setState(currentState => {
      let audio = new Audio(genreObj.previewUrl);
      // currentState.currentlyPlaying Obj  // current
      // currentState.currentlyPlayingObj = genreObj; // new
      //console.log(currentState.currentlyPlayingObj);
      currentState.currentlyPlayingObj = genreObj;
      currentState.currentlyPlayingObj.currentAudio = audio;
      currentState.currentlyPlayingObj.currentAudio.play(); // current
      console.log(currentState.currentlyPlayingObj.currentAudio);
      console.log(currentState.currentlyPlayingObj);
    });
    return genreObj;
  };

  // state variable that contains the currently playing genreObject
  // in the updatePlaying => pause the currently playing genreObject in the state and
  // reassign the state variable genre object to the genreObj passed in

  updatePausing = genreObj => {
    this.setState(currentState => {
      // currentState.currentlyPlaying Obj  // current
      // currentState.currentlyPlayingObj = genreObj; // new
      // console.log(currentState.currentlyPlayingObj);
      console.log(currentState.currentlyPlayingObj.currentAudio);
      console.log(genreObj.currentAudio);
      currentState.currentlyPlayingObj = genreObj;
      currentState.currentlyPlayingObj.currentAudio.pause(); // current
    });
    return genreObj;
  };

  pauseThenPlay = genreObj => {
    this.setState(currentState => {
      genreObj.pause();
      let audio = new Audio(genreObj.previewUrl);
      currentState.currentlyPlayingObj = genreObj;
      currentState.currentlyPlayingObj.currentAudio = audio;
      currentState.currentlyPlayingObj.currentAudio.play();
      console.log(currentState.currentlyPlayingObj.currentAudio);
      console.log(genreObj.currentAudio);
    });
    return genreObj;
  };
  // for (let i = 0; i < this.state.genres.length; i++) {
  //   if (this.state.genres[i].currentlyPlaying === true) {
  //     let currentIndexPlaying = i;
  //     this.state.genres[i].currentlyPlaying = false;
  //     this.state.genres[i].currentAudio.pause();
  //     this.state.genres[i].currentAudio = null;
  //   }
  //   // let currentIndexPlaying = 1;
  //   // genreObject[currentIndexPlaying].currentPlaying = false;
  //   // genreObject[justClicked].currentPlaying = true;
  //   // currentIndexPlaying = justClicked;
  // }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main>
          <button
            onClick={() => {
              console.log(this.state);
            }}
          >
            test
          </button>
          <div className="genre-cards-wrapper">
            {this.state.genres.map(genreObject => {
              return (
                <GenreCard
                  genreObject={genreObject}
                  updatePlaying={this.updatePlaying}
                  updatePausing={this.updatePausing}
                  pauseThenPlay={this.pauseThenPlay}
                  currentlyPlayingObj={this.currentlyPlayingObj}
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
