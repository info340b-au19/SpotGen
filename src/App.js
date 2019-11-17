import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import ExplorePage from "./Components/ExplorePage/ExplorePage";
import CreatePage from "./Components/CreatePage/CreatePage";

export default class App extends Component {
  constructor() {
    super();
    const token = this.getAccessToken();
    this.state = {
      loggedIn: token ? true : false,
      accessToken: token,
      userData: this.getUserData(token)
    };
    console.log(this.state);
  }

  getAccessToken() {
    let accessToken = document.cookie.match(
      "(^|[^;]+)\\s*" + "accessToken" + "\\s*=\\s*([^;]+)"
    );
    return accessToken ? accessToken.pop() : "";
  }

  async getUserData(accessToken) {
    let url = "https://api.spotify.com/v1/me";
    let data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    let userData = await data.json();
    return userData;
    // let userID = userData.id;
    // state["userID"] = userID;
    // state["userPlaylists"] = await getUserPlaylists(userID, accessToken);
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <Redirect to="/login" />}
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/"
          render={routerProps => (
            <ExplorePage
              {...routerProps}
              accessToken={this.state.accessToken}
            />
          )}
        />
        <Route
          exact
          path="/explore"
          render={routerProps => (
            <ExplorePage
              {...routerProps}
              accessToken={this.state.accessToken}
            />
          )}
        />
        <Route exact path="/create" component={CreatePage} />
      </div>
    );
  }
}
