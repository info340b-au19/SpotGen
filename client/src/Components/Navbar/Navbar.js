import React, { Component } from 'react';

export default class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="top-bar">
                <div id="logo-wrapper">
                    <img src="../images/spotgen-logo.png" alt="spotgen-logo" />
                    <a href="/explore" class="tab selected">Explore</a>
                    <a href="/create" class="tab">Create</a>

                </div>

                <div id="profile-wrapper">
                    <span class="username"></span>
                    <img src="../images/profile.svg" alt="profile-icon" />
                </div>
            </div>);
    }
}