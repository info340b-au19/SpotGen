import React, { Component } from "react";
import PlayPause from "./PlayPause"

export default class GenreCard extends Component {
    render() {
        return (
            <>
                <div class="genre-cards-wrapper">
                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="alt-rock" src="https://upload.wikimedia.org/wikipedia/en/2/25/Viva_la_Vida_or_Death_and_All_His_Friends.jpg"
                                alt="viva-la-vida" />
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Alternative Rock</h2>
                            <p>A style of rock music that emerged from the independent music underground of the 1970s and
                            became widely popular in the 1980s.</p>
                        </div>
                    </div>

                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="hip-hop" src="../images/rap.svg" alt="hip hop"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Rap</h2>
                            <p>A style of popular music in which an insistent, recurring beat pattern provides
                                the background and counterpoint for rapid, slangy, and often boastful
                            rhyming patter glibly intoned by a vocalist or vocalists.</p>
                        </div>
                    </div>

                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="country" src="../images/country.svg" alt="country"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Country</h2>
                            <p>A genre of popular music that originated in the southern United States in the early 1920s.
                            It takes its roots from genres such as American folk music and blues.</p>
                        </div>
                    </div>

                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="folk" src="../images/folk.svg" alt="folk"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Folk</h2>
                            <p>Includes traditional folk music and the genre that evolved from it during the 20th-century
                                folk revival.
                            Some types of folk music may be called world music.</p>
                        </div>
                    </div>

                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="hard-rock" src="https://www.laweekly.com/wp-content/uploads/2019/05/pentagram.jpg" alt="hard rock"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Hard Rock</h2>
                            <p>A loosely defined subgenre of rock music that began in the mid-1960s, with the garage,
                                psychedelic and blues rock movements. It is typified by a heavy use of aggressive vocals,
                            distorted electric guitars, bass guitar, drums, and often accompanied with keyboards.</p>
                        </div>
                    </div>

                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="classical" src="https://library.wustl.edu/wp-content/uploads/2016/02/mghl_visual.jpg" alt="classical"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Classical</h2>
                            <p>Art music produced or rooted in the traditions of Western culture, including both liturgical
                            (religious) and secular music.</p>
                        </div>
                    </div>


                    <div class="genre-card">
                        <div class="image-wrapper">
                            <img id="jazz" src="https://www.udiscovermusic.com/wp-content/uploads/2015/10/VERVE_LPCOVERS_0066-copy.jpg" alt="jazz"></img>
                            <PlayPause />
                        </div>
                        <div class="genre-card-description">
                            <h2>Jazz</h2>
                            <p>A music genre that originated in the African-American communities of New Orleans, United
                                States.
                                It originated in the late 19th and early 20th centuries, and developed from roots in blues
                                and ragtime.
                            Jazz is seen by many as "America's classical music.</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}