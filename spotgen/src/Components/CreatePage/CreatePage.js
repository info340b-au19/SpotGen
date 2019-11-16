import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar";

export default class CreatePage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="page">
                <Navbar />
                <h1>Create</h1>
            </div>
        );
    }
}