import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="login">
                <div id="login-page">
                    <div id="login-card">
                        <div id="logo">
                            <img src={process.env.PUBLIC_URL + "images/spotgen-logo.png"} alt="spotgen-logo" />
                        </div>
                        <h1>SpotGen</h1>
                        <h2>Expand your musical horizons</h2>
                        <button id="login-button" className="button" onClick={() => {
                            window.location="http://localhost:8888/spotify-login"
                        }}>Login to Spotify</button>
                    </div>
                </div>
            </div >
        );
    }
}