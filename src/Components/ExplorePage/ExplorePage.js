import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

export default class ExplorePage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page">
        <Navbar />
        <h1>Explore</h1>
        <span>
          {this.props.userData ? this.props.userData.display_name : "User"}
        </span>
      </div>
    );
  }
}
