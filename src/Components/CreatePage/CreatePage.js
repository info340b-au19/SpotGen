import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists";

import { getUserData, getUserPlaylists } from "../../Helper";
import { access } from "fs";

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
    let userPlaylists = await getUserPlaylists(
      userData.id,
      this.props.accessToken
    );
    this.setState({
      userData: userData,
      userPlaylists: userPlaylists
    });
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
