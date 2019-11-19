import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import SelectPlaylists from "./SelectPlaylists/SelectPlaylists";
import FilterSongs from "./FilterSongs/FilterSongs";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";

import {
  getUserData,
  getUserPlaylists,
  getNumberOfSongsInPlaylist,
  getHundredSongsFromPlaylist,
  getSongFeaturesMultiple,
  standardDeviation,
  average
} from "../../Helper";

/* Page that allows users to create new playlists based on different inputs and filtering choices */
export default class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      userPlaylists: {},
      selectedPlaylists: new Set(),
      songsFromSelectedPlaylists: [],
      songPool: [],
      artists: "",
      filterByArtistsEnabled: false,
      filterByLoudnessEnabled: false,
      loudness: 50,
      filterByTempoEnabled: false,
      tempo: 50,
      filterByDanceabilityEnabled: false,
      danceability: 50
    };
  }

  async componentDidMount() {
    let userData = await getUserData(this.props.accessToken);
    if (userData === "Expired Token") {
      this.props.history.push("/login");
    } else {
      let userPlaylists = await getUserPlaylists(
        userData.id,
        this.props.accessToken
      );
      this.setState({
        userData: userData,
        userPlaylists: userPlaylists
      });
    }
  }

  async handleTogglePlaylistCheckbox(playlistID) {
    if (!this.state.selectedPlaylists.has(playlistID)) {
      this.state.selectedPlaylists.add(playlistID);
    } else {
      this.state.selectedPlaylists.delete(playlistID);
    }
    await this.updateSongsFromSelectedPlaylists();
    this.updateSongPool();
  }

  toggleFilteringByArtists(checked) {
    this.setState({ filterByArtistsEnabled: checked });
    this.updateSongPool(checked, this.state.artists);
  }

  handleInputArtists(artists) {
    this.setState({ artists: artists });
    this.updateSongPool(this.state.filterByArtistsEnabled, artists);
  }

  toggleFilteringByLoudness(checked) {
    this.setState({ filterByLoudnessEnabled: checked });
    this.updateSongPool();
  }

  handleInputLoudness(loudness) {
    this.setState({
      loudness: loudness
    });
    this.updateSongPool();
  }

  toggleFilteringByTempo(checked) {
    this.setState({ filterByTempoEnabled: checked });
    this.updateSongPool();
  }

  handleInputTempo(tempo) {
    this.setState({
      tempo: tempo
    });
    this.updateSongPool();
  }

  async updateSongsFromSelectedPlaylists() {
    let songsFromSelectedPlaylists = await this.getSongsFromSelectedPlaylists(
      this.state.selectedPlaylists,
      this.props.accessToken
    );
    songsFromSelectedPlaylists = this.filterOutLocalSongs(
      songsFromSelectedPlaylists
    );
    songsFromSelectedPlaylists = this.filterOutDuplicateSongs(
      songsFromSelectedPlaylists
    );
    this.setState({ songsFromSelectedPlaylists: songsFromSelectedPlaylists });
  }

  /* Apply filters to the song pool */
  async updateSongPool(filterByArtistsEnabled, artists) {
    console.log("Updating our song pool");
    let songPool = this.state.songsFromSelectedPlaylists;
    if (filterByArtistsEnabled) {
      console.log("Filtering by artist " + artists);
      console.log(songPool);
      songPool = this.getSongsMatchingArtist(artists, songPool);
      console.log(songPool);
    }
    let audioFilteringOptions = {
      filterByLoudnessEnabled: this.state.filterByLoudnessEnabled,
      filterByTempoEnabled: this.state.filterByTempoEnabled,
      filterByDanceabilityEnabled: this.state.filterByDanceabilityEnabled,
      desiredLoudness: this.state.loudness / 100.0,
      desiredTempo: this.state.tempo / 100.0,
      desiredDanceability: this.state.danceability / 100.0
    };
    if (
      this.state.filterByLoudnessEnabled ||
      this.state.filterByTempoEnabled ||
      this.state.filterByDanceabilityEnabled
    ) {
      songPool = await this.getSongsMatchingAudioFeatures(
        audioFilteringOptions,
        songPool,
        this.props.accessToken
      );
    }
    this.setState({ songPool: songPool });
  }

  filterOutLocalSongs(songPool) {
    return songPool.filter(song => !song.track.uri.includes("local"));
  }

  filterOutDuplicateSongs(songPool) {
    return songPool.filter(
      (song, index, self) =>
        self.findIndex(s => s.track.name === song.track.name) === index
    );
  }

  async getSongsFromSelectedPlaylists(selectedPlaylists, accessToken) {
    let songPool = [];
    let selectedPlaylistsArray = [...selectedPlaylists];
    for (let playlist of selectedPlaylistsArray) {
      let songsInPlaylist = await this.getSongsInPlaylist(
        playlist,
        accessToken
      );
      songPool = songPool.concat(songsInPlaylist);
    }
    return songPool;
  }

  async getSongsInPlaylist(playlistID, accessToken) {
    let songsInPlaylist = [];
    let firstHundred = await getHundredSongsFromPlaylist(
      playlistID,
      0,
      accessToken
    );
    songsInPlaylist = songsInPlaylist.concat(firstHundred);
    let numberOfSongsTotalInPlaylist = await getNumberOfSongsInPlaylist(
      playlistID,
      accessToken
    );
    /* Get the rest of the songs based on the total number of songs in playlist */
    for (
      let offset = 100;
      offset < numberOfSongsTotalInPlaylist;
      offset += 100
    ) {
      let nextChunkOfSongs = await getHundredSongsFromPlaylist(
        playlistID,
        offset,
        accessToken
      );
      songsInPlaylist = songsInPlaylist.concat(nextChunkOfSongs);
    }

    return songsInPlaylist;
  }

  getSongsMatchingArtist(desiredArtists, songPool) {
    desiredArtists = desiredArtists.split(",");
    desiredArtists = desiredArtists.map(artist => artist.trim().toLowerCase());
    let songsMatchingDesiredArtists = [];
    for (let song of songPool) {
      let songArtists = [];
      for (let songArtist of song.track.artists) {
        songArtists.push(songArtist.name.toLowerCase());
      }
      if (this.songContainsMatchingArtist(songArtists, desiredArtists)) {
        songsMatchingDesiredArtists.push(song);
      }
    }
    return songsMatchingDesiredArtists;
  }

  songContainsMatchingArtist(songArtists, desiredArtists) {
    for (let songArtist of songArtists) {
      for (let desiredArtist of desiredArtists) {
        if (songArtist.includes(desiredArtist)) {
          return true;
        }
      }
    }
  }

  async getSongsMatchingAudioFeatures(
    audioFilteringOptions,
    songPool,
    accessToken
  ) {
    let desiredLoudness = audioFilteringOptions["desiredLoudness"];
    let desiredTempo = audioFilteringOptions["desiredTempo"];
    let desiredDanceability = audioFilteringOptions["desiredDanceability"];

    let loudnessValues = [];
    let tempoValues = [];
    let danceabilityValues = [];
    for (let songIndex = 0; songIndex < songPool.length; songIndex += 100) {
      let hundredSongs = songPool.slice(songIndex, songIndex + 100);
      let hundredSongIDs = hundredSongs.map(song => song.track.id);
      let hundredSongFeatures = await getSongFeaturesMultiple(
        hundredSongIDs,
        accessToken
      );
      for (let songFeature of hundredSongFeatures.audio_features) {
        loudnessValues.push(songFeature.loudness);
        tempoValues.push(songFeature.tempo);
        danceabilityValues.push(songFeature.danceability);
      }
    }

    /* Convert our input values (from a 0.0 - 1.0 range) to their equivalents 
    in terms of what we are measuring (loudness in db, tempo, etc.)  based on 
    averages (relative to to other songs in the song pool */

    let averageLoudness = average(loudnessValues);
    let standardDevLoudness = standardDeviation(loudnessValues);
    let lowLoudness = averageLoudness - 3 * standardDevLoudness;
    let highLoudness = averageLoudness + 3 * standardDevLoudness;
    desiredLoudness =
      lowLoudness + desiredLoudness * (highLoudness - lowLoudness);

    let averageTempo = average(tempoValues);
    let standardDevTempo = standardDeviation(tempoValues);
    let lowTempo = averageTempo - 3 * standardDevTempo;
    let highTempo = averageTempo + 3 * standardDevTempo;
    desiredTempo = lowTempo + desiredTempo * (highTempo - lowTempo);

    let averageDanceability = average(danceabilityValues);
    let standardDevDanceability = standardDeviation(danceabilityValues);
    let lowDanceability = averageDanceability - 3 * standardDevDanceability;
    let highDanceability = averageDanceability + 3 * standardDevDanceability;
    desiredDanceability =
      lowDanceability +
      desiredDanceability * (highDanceability - lowDanceability);

    let songsMatchingFilters = [];
    for (let songIndex = 0; songIndex < songPool.length; songIndex++) {
      /* Song passes filter if it's within a standard deviation in {filter value} of the average {filter value} of songs in the playlist */
      let passesLoudnessFilter = true;
      let passesTempoFilter = true;
      let passesDanceabilityFilter = true;

      /* Apply filters if the user checked the checkbox for the filter */
      if (audioFilteringOptions["filterByLoudnessEnabled"]) {
        passesLoudnessFilter =
          loudnessValues[songIndex] < desiredLoudness + standardDevLoudness &&
          loudnessValues[songIndex] > desiredLoudness - standardDevLoudness;
      }

      if (audioFilteringOptions["filterByTempoEnabled"]) {
        passesTempoFilter =
          tempoValues[songIndex] < desiredTempo + standardDevTempo &&
          tempoValues[songIndex] > desiredTempo - standardDevTempo;
      }
      if (audioFilteringOptions["filterByDanceabilityEnabled"]) {
        passesDanceabilityFilter =
          danceabilityValues[songIndex] <
            desiredDanceability + standardDevDanceability &&
          danceabilityValues[songIndex] >
            desiredDanceability - standardDevDanceability;
      }
      if (
        passesLoudnessFilter &&
        passesTempoFilter &&
        passesDanceabilityFilter
      ) {
        songsMatchingFilters.push(songPool[songIndex]);
      }
    }
    return songsMatchingFilters;
  }

  render() {
    return (
      <div className="page">
        <Navbar userData={this.state.userData} />
        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Test
        </button>
        <main id="create-page-main">
          <SelectPlaylists
            userPlaylists={this.state.userPlaylists}
            handleTogglePlaylistCheckbox={playlistID => {
              this.handleTogglePlaylistCheckbox(playlistID);
            }}
          />
          <FilterSongs
            filterByArtistsEnabled={this.state.filterByArtistsEnabled}
            toggleFilteringByArtists={checked => {
              this.toggleFilteringByArtists(checked);
            }}
            artists={this.artists}
            setArtists={artists => {
              this.handleInputArtists(artists);
            }}
            filterByLoudnessEnabled={this.state.filterByLoudnessEnabled}
            toggleFilteringByLoudness={checked => {
              this.toggleFilteringByLoudness(checked);
            }}
            loudness={this.loudness}
            setLoudness={loudness => {
              this.handleInputLoudness(loudness);
            }}
            filterByTempoEnabled={this.state.filterByTempoEnabled}
            toggleFilteringByTempo={checked => {
              this.toggleFilteringByTempo(checked);
            }}
            tempo={this.tempo}
            setTempo={tempo => {
              this.handleInputTempo(tempo);
            }}
          />
          <CreatePlaylist
            userData={this.state.userData}
            songPool={this.state.songPool}
            accessToken={this.props.accessToken}
          />
        </main>
      </div>
    );
  }
}
