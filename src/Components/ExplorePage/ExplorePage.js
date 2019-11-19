import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";

import { getUserData } from "../../Helper";
import { getSong } from "../../Helper";
import { getAllSongs } from "../../Helper";
import { get50Songs } from "../../Helper";
import { getNumberOfSongsInGenre } from "../../Helper";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: {}
    };
  }

  async componentDidMount() {
    let genreObjects = [
      {
        genreAPI: "alt-rock",
        genreName: "Alternative Rock",
        description: "A style of rock music that emerged from the independent music underground\
        of the 1970s andbecame widely popular in the 1980s."
      },
      {
        genreAPI: "hip-hop",
        genreName: "Rap",
        description: "A style of popular music in which an insistent, recurring beat pattern provides\
        the background and counterpoint for rapid, slangy, and often boastful\
        rhyming patter glibly intoned by a vocalist or vocalists."
      },
      {
        genreAPI: "country",
        genreName: "Country",
        description: "A genre of popular music that originated in the southern United States in the early 1920s.\
        It takes its roots from genres such as American folk music and blues."
      },
      {
      genreAPI: "folk",
      genreName: "Folk",
      description: "Includes traditional folk music and the genre that evolved from it during the 20th-century\
      folk revival. Some types of folk music may be called world music."
      },
      {
        genreAPI: "hard-rock",
        genreName: "Hard-Rock",
        description: "A loosely defined subgenre of rock music that began in the mid-1960s, with the garage,\
        psychedelic and blues rock movements. It is typified by a heavy use of aggressive vocals,\
        distorted electric guitars, bass guitar, drums, and often accompanied with keyboards."
      },
      {
        genreAPI: "classical",
        genreName: "Classical",
        description: "Art music produced or rooted in the traditions of Western culture, including both liturgical\
        (religious) and secular music."
      },
      {
        genreAPI: "jazz",
        genreName: "Jazz",
        description: "A music genre that originated in the African-American communities of New Orleans, United\
        States. It originated in the late 19th and early 20th centuries, and developed from roots in blues\
        and ragtime. Jazz is seen by many as 'America's classical music.'"
      }
      
    ]
    let userData, songs, songsInGenre, items, numSongs;
    for (let i = 0; i < genreObjects.length; i++) {    
      userData = await getUserData(this.props.accessToken);
      songs = await getSong(genreObjects[i].genreAPI, this.props.accessToken);
      songsInGenre = await getAllSongs(this.props.accessToken, genreObjects[i].genreAPI);
      items = await get50Songs(genreObjects[i].genreAPI, 0, this.props.accessToken);
      numSongs = await getNumberOfSongsInGenre(genreObjects[i].genreAPI, this.props.accessToken);
      genreObjects[i].genreSongs = songsInGenre;
    }

    let genres = genreObjects.map((name) => {
      let obj = {};
      obj['genre'] = name;
      return obj;
    });

    this.setState({
      userData: userData,
      genres: genres
    });

    console.log(this.state);
    console.log(this.state.genres); // Equivalent as GenreCard line 12
    console.log(this.state.genres[0]); // Equivalent as GenreCard line 13
    console.log(this.state.genres[0].genre);
    console.log(this.state);

  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main>
          <div className="genre-cards-wrapper">
          {this.state.genres.map((genreObject) => {
            return <GenreCard genreObject={genreObject}/>;
          })}
        </div>
          </main>
      </div>
    );
  }
}
