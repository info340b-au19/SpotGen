import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div id="top-bar">
        <div id="logo-wrapper">
          <img
            src={process.env.PUBLIC_URL + "images/spotgen-logo.png"}
            alt="spotgen-logo"
          />
          <Link to="/explore" className="tab" activeClassName="selected">
            Explore
          </Link>
          <Link to="/create" className="tab" activeClassName="selected">
            Create
          </Link>
        </div>
        <div id="profile-wrapper">
          <span className="username">
            {this.props.userData ? this.props.userData.display_name : "User"}
          </span>
          <img
            src={process.env.PUBLIC_URL + "images/profile.svg"}
            alt="profile-icon"
          />
        </div>
      </div>
    );
  }
}
