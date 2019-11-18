import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists/SelectPlaylists";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";

import { getUserData, getUserPlaylists } from "../../Helper";

/* Page that allows users to create new playlists based on different inputs and filtering choices */
export default class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userPlaylists: {}
    };
    this.selectedPlaylists = new Set();
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    if (userData === "Expired Token") {
      this.props.history.push("/login");
    } else {
      let userPlaylists = await getUserPlaylists(
        userData.id,
        this.props.accessToken
      );
      console.log(userPlaylists);
      this.setState({
        userData: userData,
        userPlaylists: userPlaylists
      });
    }
  }

  handleToggleCheckbox(playlistID) {
    if (!this.selectedPlaylists.has(playlistID)) {
      this.selectedPlaylists.add(playlistID);
    } else {
      this.selectedPlaylists.delete(playlistID);
    }
    console.log(this.selectedPlaylists);
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main id="create-page-main">
          <SelectPlaylists
            userPlaylists={this.state.userPlaylists}
            handleToggleCheckbox={playlistID => {
              this.handleToggleCheckbox(playlistID);
            }}
          />
          <div></div>
          <CreatePlaylist
            userData={this.state.userData}
            selectedPlaylists={this.selectedPlaylists}
            accessToken={this.props.accessToken}
          />
        </main>
      </div>
    );
  }
}
