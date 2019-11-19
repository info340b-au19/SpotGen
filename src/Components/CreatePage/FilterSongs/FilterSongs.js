import React, { Component } from "react";
import TextFilter from "./TextFilter";
import RangeFilter from "./RangeFilter";

export default class FilterSongs extends Component {
  render() {
    return (
      <div id="filter-songs">
        <div className="step">
          <div className="step-number">2</div>
          <div>
            <h2>Filter</h2>
          </div>
        </div>
        <p className="section-description">
          Select each checkbox to enable the corresponding filter. <br /> Adjust
          filters to fine tune what songs will be picked for your new playlist.
          <br />
          <br />
          <i>
            Note: values are based relatively to other songs in your playlists
          </i>
        </p>
        <TextFilter
          filterType="Artists"
          filterPlaceholder="Kygo, Avicii, Lady Gaga"
          filterEnabled={this.props.filterByArtistsEnabled}
          toggleFilter={checked => {
            this.props.toggleFilteringByArtists(checked);
          }}
          value={this.props.artists}
          setValue={artists => {
            this.props.setArtists(artists);
          }}
        />
        <RangeFilter
          filterType="Loudness"
          lowLabel="Soft"
          highLabel="Loud"
          filterEnabled={this.props.filterByLoudnessEnabled}
          toggleFilter={checked => {
            this.props.toggleFilteringByLoudness(checked);
          }}
          value={this.props.loudness}
          setValue={loudness => {
            this.props.setLoudness(loudness);
          }}
        />
      </div>
    );
  }
}
