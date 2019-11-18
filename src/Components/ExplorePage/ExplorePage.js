import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

import { getUserData } from "../../Helper";

export default class ExplorePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    this.setState({
      userData: userData
    });
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <h1>Explore</h1>
        <span></span>
      </div>
    );
  }
}
