import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

import { ProductCard } from "react-ui-cards";
import { getUserData, getSongInfo } from "../../Helper";

export default class SongInfo extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      loadingSongInfo: false,
      songInfo: null
    };
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    this.setState({ userData: userData });
    let songInfo = await getSongInfo(
      this.props.accessToken,
      this.props.match.params.songid
    );
    this.setState({ songInfo: songInfo });
  }

  /* Helper function from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript */
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  makeStringFromArtistsArray(artistsArray) {
    let result = "";
    for (let index = 0; index < artistsArray.length; index++) {
      result = result + artistsArray[index].name;
      if (index !== artistsArray.length - 1) {
        result += ", ";
      }
    }
    return result;
  }

  render() {
    return (
      <div className="song-info-page">
        <Navbar userData={this.state.userData} customSub=".." />
        <div id="song-info-page-top-wrapper" className="song-page-top-wrapper">
          <button
            className="back-button"
            aria-label="back to saved page button"
            onClick={() => {
              this.props.history.push("/saved");
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
            <h1>Song Info</h1>
          </div>
        </div>
        <div
          className={
            this.state.loadingSongInfo
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
        <ProductCard
          className="song-info-card"
          photos={
            this.state.songInfo ? [this.state.songInfo.album.images[0].url] : []
          }
          productName={this.state.songInfo ? this.state.songInfo.name : ""}
          description={
            this.state.songInfo
              ? this.makeStringFromArtistsArray(
                  this.state.songInfo.album.artists
                )
              : ""
          }
          buttonText="Song Link"
          url={
            this.state.songInfo ? this.state.songInfo.external_urls.spotify : ""
          }
        />
      </div>
    );
  }
}
