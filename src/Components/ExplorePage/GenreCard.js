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
              src={this.props.genreObject.topImg}
              alt={this.props.genreObject.alt}
            />
            <PlayPause
              genreObject={this.props.genreObject}
              updatePlaying={cardClicked => {
                this.props.updatePlaying(cardClicked);
              }}
              currentlyPlayingGenre={this.props.currentlyPlayingGenre}
            />
          </div>
          <div className="genre-card-description">
            <h2>{this.props.genreObject.genreName}</h2>
            <p>{this.props.genreObject.description}</p>
          </div>
        </div>
      </>
    );
  }
}
