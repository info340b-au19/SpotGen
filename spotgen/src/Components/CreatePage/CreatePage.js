import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists"

export default class CreatePage extends Component {
    constructor() {
        super();
    }

    getAccessToken() {
        let accessToken = document.cookie.match('(^|[^;]+)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)');
        return accessToken ? accessToken.pop() : '';
    }

   
    

    render() {
        return (
            <div className="page">
                <Navbar />
                <main id="create-page-main">
                    <SelectPlaylists />
                </main>
            </div>
        );
    }
}