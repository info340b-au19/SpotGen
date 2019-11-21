import React, { Component } from "react";

export default class PlayPause extends Component {
  constructor(props) {
    super(props);
    // this.isPlaying = new Set();
  }

  // How do I access the state of the previous card?
  // Use a set to keep track of current one?
  handleClick() {
    //let audio = new Audio(this.props.genreObject.previewUrl);

    // Play when nothing is playing
    if (!this.props.genreObject.currentlyPlaying && this.props.genreObject) {
      console.log(this.props.genreObject.currentlyPlaying);
      this.props.genreObject.currentlyPlaying = true;
      console.log(this.props.genreObject.currentlyPlaying);
      this.props.updatePlaying(this.props.genreObject);
      console.log("here");

      // this.isPlaying.add(audio);
      // console.log("here");
      // console.log(this.isPlaying);
      // this.props.genreObject.currentlyPlaying = true;
      // console.log(this.props.genreObject.currentlyPlaying);
      // this.props.genreObject.currentAudio = audio;
      // this.props.genreObject.currentAudio.play();

      // Pause the one that is playing
    } else if (
      this.props.genreObject.currentlyPlaying &&
      this.props.genreObject
    ) {
      this.props.genreObject.currentlyPlaying = false;
      console.log(this.props.genreObject.currentlyPlaying);
      this.props.updatePausing(this.props.genreObject);
      console.log(this.props.genreObject.currentlyPlaying);
      console.log("what");

      // this.isPlaying.clear();
      // console.log(this.isPlaying);
      // this.props.genreObject.currentlyPlaying = false;
      // console.log(this.props.genreObject.currentlyPlaying);
      // this.props.genreObject.currentAudio.pause();
      // this.props.genreObject.currentAudio = null;

      // Pause the one currently playing and play new one
    } else if (
      !this.props.genreObject.currentlyPlaying &&
      !this.props.genreObject
    ) {
      // console.log("hi");
      // this.props.genreObject.currentAudio.pause();
      // this.props.genreObject.currentAudio = audio;
      // this.props.genreObject.currentAudio.play();

      this.props.genreObject.currentlyPlaying = true;
      this.props.pauseThenPlay(this.props.genreObject);
      console.log("hi");
    }
  }

  render() {
    return (
      <button
        onClick={() => {
          this.handleClick();
        }}
        className="music-control-button"
        aria-label="play-song-button"
      >
        {!this.props.genreObject.currentlyPlaying && (
          <svg className="play">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-14.000000, -9.000000)">
                <rect></rect>
                <path
                  d="M15.1666667,13.6932133 C15.1666667,11.82958 17.2436833,10.7180033 18.7943,11.7517633 L40.2544333,26.0586667 C41.6399667,26.9822 41.6399667,29.0178 40.2544333,29.9415667 L18.7943,44.2481667 C17.24366,45.2820667 15.1666667,44.1704667 15.1666667,42.3068333 L15.1666667,13.6932133 Z"
                  fill="#00D361"
                ></path>
                <path
                  d="M15.1666667,13.6932133 C15.1666667,11.82958 17.2436833,10.7180033 18.7943,11.7517633 L40.2544333,26.0586667 C41.6399667,26.9822 41.6399667,29.0178 40.2544333,29.9415667 L18.7943,44.2481667 C17.24366,45.2820667 15.1666667,44.1704667 15.1666667,42.3068333 L15.1666667,13.6932133 Z"
                  fill-opacity="0.01"
                  fill="#60A3BC"
                ></path>
                <path
                  d="M19.39266,10.4667033 C17.0633633,8.96931 14,10.64175 14,13.4108333 L14,19.59496 C14,20.3709333 14.6290433,21 15.40504,21 C16.1238,21 16.7165133,20.4602767 16.8,19.76401 L16.8,14.2678433 C16.8,13.3453367 17.8201333,12.7877633 18.59662,13.2858833 L40.0026667,27.0181333 C40.7183,27.4771 40.7183,28.5229 40.0026667,28.9818667 L18.59662,42.7142333 C17.8201333,43.2121667 16.8,42.6547333 16.8,41.7321333 L16.8,36.2359667 C16.7165133,35.5397 16.1238,35 15.40504,35 C14.6290433,35 14,35.6290667 14,36.4051333 L14,42.5891667 C14,45.3581333 17.0633633,47.0306667 19.39266,45.5333667 L42.0870333,30.9442 C44.2299667,29.5663667 44.2299667,26.4336333 42.0868,25.0558 L19.39266,10.4667033 Z M16.8,31.4307 L16.8,24.5693 C16.7165133,23.8730333 16.1238,23.3333333 15.40504,23.3333333 C14.6290433,23.3333333 14,23.9624 14,24.7384667 L14,31.2615333 C14,32.0376 14.6290433,32.6666667 15.40504,32.6666667 C16.1238,32.6666667 16.7165133,32.1269667 16.8,31.4307 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </g>
          </svg>
        )}
        {this.props.genreObject.currentlyPlaying && (
          <svg className="pause">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-14.000000, -11.000000)">
                <rect></rect>
                <path
                  d="M19.8333333,12.8333333 C17.2560033,12.8333333 15.1666667,14.92267 15.1666667,17.5 L15.1666667,38.5 C15.1666667,41.0774 17.2560033,43.1666667 19.8333333,43.1666667 C22.4106633,43.1666667 24.5,41.0774 24.5,38.5 L24.5,17.5 C24.5,14.92267 22.4106633,12.8333333 19.8333333,12.8333333 Z M36.1666667,12.8333333 C33.5892667,12.8333333 31.5,14.92267 31.5,17.5 L31.5,38.5 C31.5,41.0774 33.5892667,43.1666667 36.1666667,43.1666667 C38.7440667,43.1666667 40.8333333,41.0774 40.8333333,38.5 L40.8333333,17.5 C40.8333333,14.92267 38.7440667,12.8333333 36.1666667,12.8333333 Z"
                  fill="#00D361"
                ></path>
                <path
                  d="M15.1666667,17.5 C15.1666667,14.92267 17.2560033,12.8333333 19.8333333,12.8333333 C22.4106633,12.8333333 24.5,14.92267 24.5,17.5 L24.5,22.8050433 L24.5,38.5 C24.5,41.0774 22.4106633,43.1666667 19.8333333,43.1666667 C17.2560033,43.1666667 15.1666667,41.0774 15.1666667,38.5 L15.1666667,30.9311333 L15.1666667,17.5 Z"
                  fill-opacity="0.3"
                  fill="#A4B0BE"
                ></path>
                <path
                  d="M19.8333333,11.6666667 C16.6116767,11.6666667 14,14.2783433 14,17.5 L14,27.7666667 C14,28.5399333 14.6268033,29.1666667 15.4,29.1666667 C16.1731967,29.1666667 16.8,28.5399333 16.8,27.7666667 L16.8,25.6666667 L16.8,17.5 C16.8,15.8247367 18.15807,14.4666667 19.8333333,14.4666667 C21.5085967,14.4666667 22.8666667,15.8247367 22.8666667,17.5 L22.8666667,38.5 C22.8666667,40.1753333 21.5085967,41.5333333 19.8333333,41.5333333 C18.15807,41.5333333 16.8,40.1753333 16.8,38.5 L16.8,35 L16.8,34.0666667 C16.8,33.2934 16.1731967,32.6666667 15.4,32.6666667 C14.6268033,32.6666667 14,33.2934 14,34.0666667 L14,38.5 C14,41.7216333 16.6116767,44.3333333 19.8333333,44.3333333 C23.05499,44.3333333 25.6666667,41.7216333 25.6666667,38.5 L25.6666667,17.5 C25.6666667,14.2783433 23.05499,11.6666667 19.8333333,11.6666667 Z M30.3333333,17.5 C30.3333333,14.2783433 32.9450333,11.6666667 36.1666667,11.6666667 C39.3883,11.6666667 42,14.2783433 42,17.5 L42,38.5 C42,41.7216333 39.3883,44.3333333 36.1666667,44.3333333 C32.9450333,44.3333333 30.3333333,41.7216333 30.3333333,38.5 L30.3333333,28.2333333 C30.3333333,27.4600667 30.9600667,26.8333333 31.7333333,26.8333333 C32.5066,26.8333333 33.1333333,27.4600667 33.1333333,28.2333333 L33.1333333,29.1666667 L33.1333333,38.5 C33.1333333,40.1753333 34.4913333,41.5333333 36.1666667,41.5333333 C37.842,41.5333333 39.2,40.1753333 39.2,38.5 L39.2,17.5 C39.2,15.8247367 37.842,14.4666667 36.1666667,14.4666667 C34.4913333,14.4666667 33.1333333,15.8247367 33.1333333,17.5 L33.1333333,21 L33.1333333,21.9333333 C33.1333333,22.70653 32.5066,23.3333333 31.7333333,23.3333333 C30.9600667,23.3333333 30.3333333,22.70653 30.3333333,21.9333333 L30.3333333,17.5 Z"
                  fill="#FFFFFF"
                ></path>
              </g>
            </g>
          </svg>
        )}
      </button>
    );
  }
}
