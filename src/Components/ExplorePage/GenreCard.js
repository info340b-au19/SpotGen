import React, { Component } from "react";
import PlayPause from "./PlayPause";

export default class GenreCard extends Component {
  // Sets the content of each genre card
  render() {
    return (
      <>
        <div className="genre-card">
          <div className="image-wrapper">
            <img
              id={this.props.genreObject.genreAPI}
              src={this.props.genreObject.img}
              alt={this.props.genreObject.alt}
            />
            <PlayPause
              genreObject={this.props.genreObject}
              updatePlaying={cardClicked => {
                this.props.updatePlaying(cardClicked);
              }}
              pauseAllSongs={() => {
                this.props.pauseAllSongs();
              }}
              currentlyPlayingGenre={this.props.currentlyPlayingGenre}
            />
          </div>
          <div className="genre-card-description">
            <h2>{this.props.genreObject.genreName}</h2>
            <p>{this.props.genreObject.description}</p>
            <div className="song-playing-row">
              <button
                className={
                  this.props.songSaved
                    ? "save-song-button save-song-button-filled"
                    : "save-song-button"
                }
                aria-label="add song to saved songs"
                onClick={() => {
                  this.props.pressSaveSongButton(this.props.genreObject);
                }}
              >
                <svg width="24" height="24">
                  <rect width="24" height="24" fill="none" rx="0" ry="0" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.2788 4.74C19.1588 3.62 17.6688 3 16.0888 3C14.5588 3 13.1188 3.58 11.9988 4.64C10.8888 3.58 9.44878 3 7.90878 3C6.32878 3 4.84878 3.62 3.72878 4.74C1.42878 7.06 1.42878 10.82 3.72878 13.12L11.2988 20.71C11.4888 20.89 11.7488 21 12.0088 21C12.2788 21 12.5288 20.89 12.7188 20.71L20.2788 13.12C22.5688 10.81 22.5688 7.05 20.2788 4.74Z"
                    stroke="#d20606"
                    strokeWidth="2px"
                    fill="#d20606"
                    fillOpacity="0.0"
                  />
                </svg>
              </button>
              <span className="song-title">{this.props.genreObject.name}</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
