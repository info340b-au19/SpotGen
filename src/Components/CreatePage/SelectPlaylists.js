import React, { Component } from "react";
import PlaylistCheckbox from "./PlaylistCheckbox";

export default class SelectPlaylists extends Component {
  constructor() {
    super();
    this.selectedCheckboxes = new Set();
  }

  handleToggleCheckbox(playlistID) {
    if (this.selectedCheckboxes.has(playlistID)) {
      this.selectedCheckboxes.delete(playlistID);
    } else {
      this.selectedCheckboxes.add(playlistID);
    }
  }

  createPlaylistCheckboxes() {
    let userPlaylists = this.props.userPlaylists;
    return Object.keys(userPlaylists).map(key => {
      return (
        <PlaylistCheckbox
          key={key}
          playlistID={key}
          playlistName={userPlaylists[key]}
          handleToggleCheckbox={() => {
            this.handleToggleCheckbox(key);
          }}
        />
      );
    });
  }

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
        <div id="playlists-wrapper">{this.createPlaylistCheckboxes()}</div>
      </div>
    );
  }
}
