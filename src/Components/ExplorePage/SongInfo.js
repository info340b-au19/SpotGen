import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";

import { ProductCard } from "react-ui-cards";
import { getUserData, getSongInfo } from "../../Helper";

export default class SongInfo extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      loadingSongInfo: false,
      songInfo: {}
    };
  }

  async componentDidMount() {
    this.setState({ loadingSongInfo: true });

    let userData = await getUserData(this.props.accessToken);
    let songInfo = await getSongInfo(
      this.props.accessToken,
      this.props.match.params.songid
    );
    this.setState({ userData: userData, songInfo: songInfo });
  }

  render() {
    return (
      <div className="song-info-page">
        <ProductCard
          photos={[
            "https://i.imgur.com/jRVDeI8.jpg",
            "https://i.imgur.com/raPe27t.jpg",
            "https://i.imgur.com/IpEsYSH.jpg"
          ]}
          price="$99"
          productName="Headphones"
          description="Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet."
          buttonText="Add to cart"
          rating={3}
          url="https://github.com/nukeop"
        />
      </div>
    );
  }
}
