import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "whatwg-fetch";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyALhioOKF9xhH1b9WS2I5Gey9Y6dckRmf4",
  authDomain: "spotgen-66b72.firebaseapp.com",
  databaseURL: "https://spotgen-66b72.firebaseio.com",
  projectId: "spotgen-66b72",
  storageBucket: "spotgen-66b72.appspot.com",
  messagingSenderId: "249803825294",
  appId: "1:249803825294:web:6f29918f18629422cca9df",
  measurementId: "G-2WRFLTW6H8"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
