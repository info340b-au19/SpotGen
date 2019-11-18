import React, { Component } from "react";
import PlaylistCheckbox from "./PlaylistCheckbox";

export default class SelectPlaylists extends Component {
  render() {
    return (
      <div id="select-playlists">
        <div className="step">
          <div className="step-number">1</div>
          <div>
            <h2>Select Playlists</h2>
          </div>
        </div>
        <p className="section-description">
          Select playlists to grab songs from for your new playlist
        </p>
        <div id="playlists-wrapper">
          {Object.keys(this.props.userPlaylists).map(function(key, index) {
            return <PlaylistCheckbox playlistName={key} />;
          })}
        </div>
      </div>
    );
  }
}
