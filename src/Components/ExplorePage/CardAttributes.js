/* eslint-disable no-multi-str */
// Sets all the initial attributes, including Spotify API name, actual name, and description.
export function cardAttributes() {
  let genreObjects = [
    {
      genreAPI: "alt-rock",
      genreName: "Alternative Rock",
      description:
        "A style of rock music that emerged from the independent music underground\
        of the 1970s and became widely popular in the 1980s. In this instance, the word\
        alternative refers to the genre's distinction from mainstream rock music."
    },
    {
      genreAPI: "hip-hop",
      genreName: "Rap",
      description:
        "A style of popular music in which an insistent, recurring beat pattern provides\
            the background and counterpoint for rapid, slangy, and often boastful\
            rhyming patter glibly intoned by a vocalist or vocalists."
    },
    {
      genreAPI: "country",
      genreName: "Country",
      description:
        "A popular genre of American music which originated in the 1920s, country music\
        has its roots from American folk and western music. It is formed using simple forms\
        of instruments ranging from electric and steel guitars to drums and mandolin or mouth organ."
    },
    {
      genreAPI: "folk",
      genreName: "Folk",
      description:
        "Defined in several ways: as music transmitted orally, music with unknown composers,\
        or music performed by custom over a long period of time. It has been contrasted with\
        commercial and classical styles. The term originated in the 19th century, but folk music\
        extends beyond that."
    },
    {
      genreAPI: "hard-rock",
      genreName: "Hard-Rock",
      description:
        "A loosely defined subgenre of rock music that began in the mid-1960s, with the garage,\
            psychedelic and blues rock movements. It is typified by a heavy use of aggressive vocals,\
            distorted electric guitars, bass guitar, drums, and often accompanied with keyboards."
    },
    {
      genreAPI: "classical",
      genreName: "Classical",
      description:
        "Hass two meanings: the broader meaning includes all Western art music from the Medieval era\
        to the 2000s, and the specific meaning refers to the art music from the 1750s to the early\
        1820s—the era of Wolfgang Amadeus Mozart, Joseph Haydn, and Ludwig van Beethoven."
    },
    {
      genreAPI: "jazz",
      genreName: "Jazz",
      description:
        "A music genre that originated in the African-American communities of New Orleans, United\
            States. It originated in the late 19th and early 20th centuries, and developed from\
            roots in blues and ragtime. Jazz is seen by many as “America's classical music.”"
    },
    {
      genreAPI: "holidays",
      genreName: "Holidays",
      description:
        "Primarily confined to the Christmas season, at which time classics like “White Christmas”\
        make their annual return to radio playlists and choir songbooks; in the strictest sense,\
        however, its music is typically heard in celebration of a given holiday event."
    },
    {
      genreAPI: "edm",
      genreName: "Electronic Dance Music",
      description:
        "Generally referred as EDM, this form of music is produced by DJs who add dozens\
      of tones to a piece to create unique music. You can hear them in clubs or even live, depending\
      upon your accessibility for the same."
    },
    {
      genreAPI: "rock",
      genreName: "Rock",
      description:
        "Originated as “Rock & Roll” in the United States, Rock music has been rocking\
        the world since the 1950s. It is a form of music that started actually around\
        string instruments, but now uses other modern instruments too making it a little\
        difficult to give it an accurate definition. Its loud and strong beats make it\
        popular among the youths."
    },
    {
      genreAPI: "blues",
      genreName: "Blues",
      description:
        "A music genre and musical form which was originated in the Deep South of the\
        United States around the 1870s by African-Americans from roots in African\
        musical traditions, African-American work songs, and spirituals."
    },
    {
      genreAPI: "pop",
      genreName: "Pop",
      description:
        "“Pop” is a term derived from “Popular” and thus Pop Music is known to be a\
        genre of popular music. With its roots in the rock & roll style, this form can\
        include any form of music ranging from urban and dance to rock, country and Latin.\
        Instruments highly used are electric guitars, synthesizer drums as well as bass."
    },
    {
      genreAPI: "electro",
      genreName: "Electro",
      description:
        "A perfect blend of hip hop and electronic music, electro or electro-funk\
        uses drum machine, vocoder and talkbox helping it to distinguish itself from\
        another similar form of music, “Disco”."
    },
    {
      genreAPI: "dubstep",
      genreName: "Dubstep",
      description:
        "The use of instruments attracting music lovers for its bass and rhythm,\
        this falls in the electronic music genre. People consider it to be a darker\
        form of music, but since its birth in the late 1990s, this genre has successfully\
        made its place in the industry."
    }
  ];
  return genreObjects;
}
