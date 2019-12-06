import React, { Component } from "react";

/* Controls and displays the list of songs currently in the song pool (the ones that the new playlist will contain based on the filters) */
export default class SongPool extends Component {
  render() {
    return (
      <div id="song-pool" className="rows-wrapper">
        <div
          className={
            this.props.isLoadingSongs ? "spinner-songs-wrapper" : "hidden"
          }
        >
          <div className="spinner-songs">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
        <div className={this.props.isLoadingSongs ? "hidden" : ""}>
          {this.props.songPool.map(song => {
            console.log(song);
            return (
              <div className="song-row" key={song.track.name}>
                <button
                  className="remove-song-button"
                  aria-label="remove-song"
                  onClick={() => {
                    this.props.removeSongFromPool(song);
                  }}
                >
                  ✖
                </button>
                <span className="song-title">{song.track.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
