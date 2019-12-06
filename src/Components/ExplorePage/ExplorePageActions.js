import React, { Component } from "react";

export default class ExplorePageActions extends Component {
  render() {
    return (
      <div className={this.props.customClass}>
        <button
          id="shuffle-songs-button"
          className="explore-page-action-button"
          aria-label="shuffle-button"
          onClick={() => {
            this.props.randomize();
          }}
        >
          <svg width="24" height="24">
            <rect width="24" height="24" fill="none" rx="0" ry="0" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.24 10.2101L22.57 6.89006C22.84 6.60006 23 6.22006 23 5.83006L23 5.82802L23 5.82007C23 5.34623 22.7816 4.92454 22.4398 4.64989L19.23 1.44006C18.64 0.850059 17.69 0.850059 17.11 1.44006C16.52 2.03006 16.52 2.98006 17.11 3.56006L17.87 4.32007H16.75C12.78 4.32007 9.55 7.55007 9.55 11.5201V12.9501C9.55 15.2701 7.67 17.1501 5.35 17.1501H2.5C1.67 17.1501 1 17.8201 1 18.6501C1 19.4801 1.67 20.1501 2.5 20.1501H5.35C9.32 20.1501 12.55 16.9201 12.55 12.9501V11.5201C12.55 9.20007 14.43 7.32007 16.75 7.32007H17.87L17.11 8.08006C16.52 8.67006 16.52 9.62006 17.11 10.2001C17.4 10.4901 17.79 10.6401 18.17 10.6401C18.55 10.6401 18.94 10.5001 19.24 10.2101ZM5.35 7.33008H2.5C1.67 7.33008 1 6.65008 1 5.83008C1 5.00008 1.67 4.33008 2.5 4.33008H5.35C6.94 4.33008 8.41 4.85008 9.6 5.73008C8.97 6.52008 8.46 7.41008 8.11 8.37008C7.38 7.72008 6.41 7.33008 5.35 7.33008ZM17.59 14.7401C18.17 14.1501 19.12 14.1501 19.71 14.7401L22.5081 17.5382C22.5786 17.6022 22.643 17.6727 22.7002 17.749C23.0221 18.1705 23.0869 18.7257 22.8946 19.2046C22.8095 19.4193 22.6762 19.6095 22.5081 19.762L19.71 22.5601C19.42 22.8501 19.03 23.0001 18.65 23.0001C18.27 23.0001 17.88 22.8501 17.59 22.5601C17 21.9801 17 21.0301 17.59 20.4401L17.88 20.1501H16.75C15.15 20.1501 13.68 19.6301 12.49 18.7501C13.12 17.9601 13.64 17.0701 13.99 16.1101C14.72 16.7601 15.69 17.1501 16.75 17.1501H17.88L17.59 16.8601C17 16.2801 17 15.3301 17.59 14.7401Z"
              fill="#ffffff"
              fillOpacity="0.85"
            />
          </svg>
          Shuffle Songs
        </button>
        <button
          id="view-saved-songs-button"
          className="explore-page-action-button"
          onClick={() => {
            this.props.history.push("/saved");
          }}
        >
          <svg width="24" height="24">
            <rect width="24" height="24" fill="none" rx="0" ry="0" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.2788 4.74C19.1588 3.62 17.6688 3 16.0888 3C14.5588 3 13.1188 3.58 11.9988 4.64C10.8888 3.58 9.44878 3 7.90878 3C6.32878 3 4.84878 3.62 3.72878 4.74C1.42878 7.06 1.42878 10.82 3.72878 13.12L11.2988 20.71C11.4888 20.89 11.7488 21 12.0088 21C12.2788 21 12.5288 20.89 12.7188 20.71L20.2788 13.12C22.5688 10.81 22.5688 7.05 20.2788 4.74Z"
              fill="#ffffff"
              fillOpacity="0.85"
            />
          </svg>
          View Saved Songs
        </button>
      </div>
    );
  }
}