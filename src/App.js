import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Login from "./Components/Login/Login";
import ExplorePage from "./Components/ExplorePage/ExplorePage";
import CreatePage from "./Components/CreatePage/CreatePage";

import hash from "./Hash";

export default class App extends Component {
  constructor() {
    super();
    const token = hash.access_token;
    this.state = {
      loggedIn: token ? true : false,
      accessToken: token
    };
  }

  render() {
    return (
      <div className="App">
        {!this.state.loggedIn && <Redirect to="/login" />}
        <Route
          exact
          path="/login"
          render={routerProps => <Login {...routerProps} />}
        />
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
        <Route
          exact
          path="/create"
          render={routerProps => (
            <CreatePage {...routerProps} accessToken={this.state.accessToken} />
          )}
        />
      </div>
    );
  }
}
