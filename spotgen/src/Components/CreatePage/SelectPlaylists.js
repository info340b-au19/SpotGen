import React, { Component } from 'react';

export default class SelectPlaylists extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="select-playlists">
                <div class="step">
                    <div class="step-number">
                        1
                    </div>
                    <div>
                        <h2>Select Playlists</h2>
                    </div>
                </div>
                <p class="section-description">Select playlists to grab songs from for your new playlist</p>
                <div id="playlists-wrapper">
                </div>
            </div>);
    }
}