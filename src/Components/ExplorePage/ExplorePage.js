import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { summarizers } from "istanbul-lib-report";

export default class ExplorePage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page">
        <Navbar />
        <h1>Explore</h1>
        <span>{this.props.accessToken}</span>
      </div>
    );
  }
}
