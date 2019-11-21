import React, { Component } from "react";

/* Controls and displays the list of songs currently in the song pool (the ones that the new playlist will contain based on the filters) */
export default class SongPool extends Component {
  render() {
    return (
      <div id="song-pool" className="rows-wrapper">
        {this.props.songPool.map(song => {
          return (
            <div className="song-row" key={song.track.name}>
              <span className="song-title">{song.track.name}</span>
              {/* {" - "}
              <span className="song-artist">Artist Name 1</span> */}
            </div>
          );
        })}
      </div>
    );
  }
}
