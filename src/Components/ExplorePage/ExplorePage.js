import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

export default class ExplorePage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.props.userData} />
        <h1>Explore</h1>
        <span></span>
      </div>
    );
  }
}
