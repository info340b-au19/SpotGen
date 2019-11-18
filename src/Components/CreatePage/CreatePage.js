import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists";

import { getUserData, getUserPlaylists } from "../../Helper";

export default class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userPlaylists: []
    };
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);

    this.setState(
      {
        userData: userData
      },
      function() {
        console.log("setState completed", this.state);
        this.loadUserPlaylists();
      }
    );
  }

  async loadUserPlaylists() {
    let userPlaylists = await getUserPlaylists(
      this.state.userData.id,
      this.props.accessToken
    );
    console.log(userPlaylists);
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <main id="create-page-main">
          <SelectPlaylists />
        </main>
      </div>
    );
  }
}
