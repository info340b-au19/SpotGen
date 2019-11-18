import React, { Component } from "react";

/* Controls and displays the list of songs currently in the song pool (the ones that the new playlist will contain based on the filters) */
export default class SongPool extends Component {
  render() {
    return (
      <div id="song-pool" className="rows-wrapper">
        <div className="song-row">
          <span className="song-title">Song 1</span>
          {" - "}
          <span className="song-artist">Artist Name 1</span>
        </div>
      </div>
    );
  }
}
