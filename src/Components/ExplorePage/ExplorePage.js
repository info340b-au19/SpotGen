import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import GenreCard from "./GenreCard";

import { getUserData } from "../../Helper";
import { getGenres } from "../../Helper";
import { getSong } from "../../Helper";
import { getAllSongs } from "../../Helper";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      genres: {},
      songs: {},
      songsInGenre: {}
    };
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    let genres = await getGenres(this.props.accessToken);
    let songs = await getSong(genres, this.props.accessToken);
    let songsInGenre = await getAllSongs(this.props.accessToken, genres);
    this.setState({
      userData: userData,
      genres: genres,
      songs: songs,
      songsInGenre: songsInGenre
    });
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main><GenreCard /></main>
      </div>
    );
  }
}
