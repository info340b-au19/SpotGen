import React, { Component } from "react";
import PlaylistCheckbox from "./PlaylistCheckbox";

export default class SelectPlaylists extends Component {
  /* Creates multiple playlist checkboxes based on the user's playlists */
  createPlaylistCheckboxes() {
    let userPlaylists = this.props.userPlaylists;
    return Object.keys(userPlaylists).map(playlistID => {
      return (
        <PlaylistCheckbox
          key={playlistID}
          playlistID={playlistID}
          playlistName={userPlaylists[playlistID]}
          handleTogglePlaylistCheckbox={() => {
            this.props.handleTogglePlaylistCheckbox(playlistID);
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
        <div className="rows-wrapper">{this.createPlaylistCheckboxes()}</div>
      </div>
    );
  }
}
