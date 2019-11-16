import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import ExplorePage from "./Components/ExplorePage/ExplorePage"

export default class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">
        {/* <a href='http://localhost:8888'>Login to Spotify</a> */}
        {/* <Login /> */}
        <Router>
          <Route exact path='/' component={ExplorePage} />
          <Route exact path='/login' component={Login} />
        </Router>
      </div>
    );
  }
}