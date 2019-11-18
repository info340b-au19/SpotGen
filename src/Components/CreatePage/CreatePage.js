import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists/SelectPlaylists";

import { getUserData, getUserPlaylists } from "../../Helper";

export default class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userPlaylists: {}
    };
    this.selectedCheckboxes = new Set();
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
    if (!this.selectedCheckboxes.has(playlistID)) {
      this.selectedCheckboxes.add(playlistID);
    } else {
      this.selectedCheckboxes.delete(playlistID);
    }
    console.log(this.selectedCheckboxes);
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
        </main>
      </div>
    );
  }
}
