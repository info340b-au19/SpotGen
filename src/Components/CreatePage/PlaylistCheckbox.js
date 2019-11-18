import React, { Component } from "react";
import "pretty-checkbox/dist/pretty-checkbox.min.css";

export default class PlaylistCheckbox extends Component {
  render() {
    return (
      <div className="playlist-checkbox-wrapper">
        <div className="pretty p-svg p-curve p-bigger">
          <input type="checkbox" className="playlistCheckbox" />
          <div className="state">
            <svg className="svg svg-icon" viewBox="0 0 14 14">
              <path
                d="M10.8856,1.42401 C11.5365,0.77313 12.5917,0.77313 13.2427,1.42401 C13.8935,2.07488 13.8935,3.13016 13.2427,3.78103 L8.0237,9 L6.4477,10.576 C5.79687,11.2268 4.74157,11.2268 4.09069,10.576 C3.43982,9.9251 3.43982,8.8698 4.09069,8.2189 L9.7071,2.60252 L10.8856,1.42401 Z"
                id="Path"
                fill="#00D361"
              ></path>
              <path
                d="M1.06519,7.54884 C0.41432,6.89798 0.41432,5.84271 1.06519,5.19184 C1.71606,4.54095 2.77134,4.54095 3.42222,5.19184 L4.93406,6.70364 L6.4459,8.2155 C7.0968,8.8664 7.0968,9.9216 6.4459,10.5725 C5.795,11.2234 4.73976,11.2234 4.08888,10.5725 L3.22519,9.7088 L1.18299,7.66664 L1.06519,7.54884 Z"
                id="Path"
                fill="#FFFFFF"
              ></path>
              <path
                d="M1.06519,7.54884 C0.41432,6.89798 0.41432,5.84271 1.06519,5.19184 C1.71606,4.54095 2.77134,4.54095 3.42222,5.19184 L4.60072,6.37031 L6.4459,8.2155 C7.0968,8.8664 7.0968,9.9216 6.4459,10.5725 C5.795,11.2234 4.73976,11.2234 4.08888,10.5725 L3.84966,10.3333 L1.18299,7.66664 L1.06519,7.54884 Z"
                id="Path"
                fill-opacity="0.01"
                fill="#000000"
              ></path>
            </svg>
            <label>{this.props.playlistName}</label>
          </div>
        </div>
      </div>
    );
  }
}
