import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="top-bar">
                <div id="logo-wrapper">
                    <img src={process.env.PUBLIC_URL + "images/spotgen-logo.png"} alt="spotgen-logo" />
                    {/* <a href="/explore" class="tab selected">Explore</a>
                    <a href="/create" class="tab">Create</a> */}
                    <Link to='/explore' className="tab">Explore</Link>
                    <Link to='/create' className="tab">Create</Link>


                </div>
                <div id="profile-wrapper">
                    <span class="username"></span>
                    <img src={process.env.PUBLIC_URL + "images/profile.svg"} alt="profile-icon" />
                </div>
            </div>);
    }
}