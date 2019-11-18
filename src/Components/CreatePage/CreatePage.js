import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists";

export default class CreatePage extends Component {
  render() {
    return (
      <div className="page">
        <Navbar userData={this.props.userData} />
        <main id="create-page-main">
          <SelectPlaylists />
        </main>
      </div>
    );
  }
}
