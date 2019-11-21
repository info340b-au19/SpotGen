import React, { Component } from "react";

import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes
} from "../../SpotifyConfig";

export default class Login extends Component {
  render() {
    return (
      <div id="login">
        <div id="login-page">
          <div id="login-card">
            <div id="logo">
              <img
                src={process.env.PUBLIC_URL + "images/spotgen-logo.png"}
                alt="spotgen-logo"
              />
            </div>
            <h1>SpotGen</h1>
            <h2>Expand your musical horizons</h2>
            <button
              id="login-button"
              className="button"
              onClick={() => {
                window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`;
              }}
            >
              Login to Spotify
            </button>
          </div>
        </div>
      </div>
    );
  }
}
