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
      genreAPI: "ambient",
      genreName: "Ambient",
      description:
        "A genre of music that emphasizes tone and atmosphere over traditional musical structure or rhythm.\
          A form of instrumental music, it may lack net composition, beat, or structured melody.\
          It uses textural layers of sound which can reward both passive and active listening\
          and encourage a sense of calm or contemplation."
    },
    {
      genreAPI: "bluegrass",
      genreName: "Bluegrass",
      description:
        "A kind of country music influenced by jazz and blues and characterized by\
          virtuosic playing of banjos and guitars and high-pitched, close-harmony vocals.\
          It include vocal harmonies featuring two, three, or four parts, often featuring\
          a dissonant or modal sound in the highest voice."
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
      genreAPI: "classical",
      genreName: "Classical",
      description:
        "Has two meanings: the broader meaning includes all Western art music from the Medieval era\
          to the 2000s, and the specific meaning refers to the art music from the 1750s to the early\
          1820s—the era of Wolfgang Amadeus Mozart, Joseph Haydn, and Ludwig van Beethoven."
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
      genreAPI: "dubstep",
      genreName: "Dubstep",
      description:
        "The use of instruments attracting music lovers for its bass and rhythm,\
          this falls in the electronic music genre. People consider it to be a darker\
          form of music, but since its birth in the late 1990s, this genre has successfully\
          made its place in the industry."
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
      genreAPI: "edm",
      genreName: "Electronic Dance Music",
      description:
        "Generally referred as EDM, this form of music is produced by DJs who add dozens\
        of tones to a piece to create unique music. You can hear them in clubs or even live,\
        depending upon your accessibility for the same."
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
      genreAPI: "funk",
      genreName: "Funk",
      description:
        "A music genre that originated in African-American communities in the mid-1960s when\
        African-American musicians created a rhythmic, danceable new form of music through\
        a mixture of soul music, jazz, and rhythm and blues."
    },
    {
      genreAPI: "gospel",
      genreName: "Gospel",
      description:
        "Essentially Southern in origin and performed by large, soulful choirs, which\
        in themselves are natural extensions of the rehearsed and arranged community\
        choirs of the southern churches, both black and white. The creation, performance,\
        significance, and even the definition of gospel music varies according to culture\
        and social context."
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
      genreAPI: "hip-hop",
      genreName: "Hip Hop",
      description:
        "A style of popular music in which an insistent, recurring beat pattern provides\
          the background and counterpoint for rapid, slangy, and often boastful\
          rhyming patter glibly intoned by a vocalist or vocalists."
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
      genreAPI: "indian",
      genreName: "Indian",
      description:
        "Includes multiple varieties of Punjabi Music, classical music, folk music, filmi,\
          Indian rock, and Indian pop. India's classical music tradition, including Hindustani\
          music and Carnatic, has a history spanning millennia and developed over several areas."
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
      genreAPI: "j-pop",
      genreName: "J-pop",
      description:
        "An abbreviation of Japanese pop. It refers to Western-influenced Japanese popular music.\
          The term J-pop was coined by J-Wave, an FM radio station, to denote what was once called\
          “New Music.” The term is widely used in Japan to describe many different musical genres\
          including pop, rock, dance, rap, and soul."
    },
    {
      genreAPI: "latino",
      genreName: "Latino",
      description:
        "Due to its highly syncretic nature, Latin American music encompasses a wide variety of styles,\
        including influential genres such as cumbia, bachata, bossa nova, merengue, rumba, salsa, samba,\
        son, and tango. Latin American music is performed in Spanish, Portuguese, and to a lesser extent,\
        French."
    },
    {
      genreAPI: "mandopop",
      genreName: "Mandopop",
      description:
        "Categorized as a subgenre of commercial Chinese-language music within C-pop.\
        Popular music sung in Mandarin was the first variety of popular music in Chinese\
        to establish itself as a viable industry. It originated in Shanghai, and later\
        Hong Kong, Taipei and Beijing also emerged as important centers of the Mandopop music industry."
    },
    {
      genreAPI: "opera",
      genreName: "Opera",
      description:
        "A form of theatre in which music has a leading role and the parts are taken by singers,\
        but is distinct from musical theater. In traditional number opera, singers employ two\
        styles of singing: recitative, a speech-inflected style, and self-contained arias."
    },
    {
      genreAPI: "piano",
      genreName: "Piano",
      description:
        "An acoustic, stringed musical instrument invented in Italy by Bartolomeo Cristofori\
        around the year 1700 (the exact year is uncertain), in which the strings are struck\
        by hammers. It is played using a keyboard, which is a row of keys (small levers) that\
        the performer presses down or strikes with the fingers and thumbs of both hands to\
        cause the hammers to strike the strings."
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
      genreAPI: "raggae",
      genreName: "Raggae",
      description:
        "Incorporates some of the musical elements of rhythm and blues (R&B), jazz, mento,\
          calypso, African, and Latin American music, as well as other genres. Reggae scenes\
          consist of two guitars, one for rhythm and one for lead—drums, congas, and keyboards,\
          with a couple vocalists."
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
      genreAPI: "salsa",
      genreName: "Salsa",
      description:
        "A popular dance music genre that initially arose in New York City during the 1960s.\
        Salsa is the product of various musical genres including the Afro-Cuban son montuno,\
        guaracha, cha cha chá, mambo, and to a certain extent bolero, and the Puerto Rican\
        bomba and plena."
    },
    {
      genreAPI: "ska",
      genreName: "Ska",
      description:
        "Originated in Jamaica in the late 1950s and was the precursor to rocksteady and reggae.\
          It combined elements of Caribbean mento and calypso with American jazz and rhythm and blues.\
          Ska is characterized by a walking bass line accented with rhythms on the off beat."
    },
    {
      genreAPI: "sleep",
      genreName: "Sleep",
      description:
        "Relaxing music triggers changes to the body that in many ways mimic a sleep state.\
          A slower heart rate, slower breathing, and lower blood pressure are all physiological\
          changes that make possible the process of falling asleep and staying asleep."
    },
    {
      genreAPI: "tango",
      genreName: "Tango",
      description:
        "A style of music in or time that originated among European immigrant populations of\
          Argentina and Uruguay. It is traditionally played on a solo guitar, guitar duo, or an\
          ensemble, known as the orquesta típica, which includes at least two violins, flute, piano,\
          double bass, and at least two bandoneóns."
    },
    {
      genreAPI: "trance",
      genreName: "Trance",
      description:
        "A genre of electronic music that emerged from the British new-age music scene and\
          the early 1990s German techno and hardcore scenes. At the same time trance music\
          was developing in Europe, the genre was also gathering a following in the Indian\
          state of Goa."
    }
    // {
    //   genreAPI: "blues",
    //   genreName: "Blues",
    //   description:
    //     "A music genre and musical form which was originated in the Deep South of the\
    //       United States around the 1870s by African-Americans from roots in African\
    //       musical traditions, African-American work songs, and spirituals."
    // },
    // {
    //   genreAPI: "classical",
    //   genreName: "Classical",
    //   description:
    //     "Hass two meanings: the broader meaning includes all Western art music from the Medieval era\
    //       to the 2000s, and the specific meaning refers to the art music from the 1750s to the early\
    //       1820s—the era of Wolfgang Amadeus Mozart, Joseph Haydn, and Ludwig van Beethoven."
    // },
    // {
    //   genreAPI: "country",
    //   genreName: "Country",
    //   description:
    //     "A popular genre of American music which originated in the 1920s, country music\
    //       has its roots from American folk and western music. It is formed using simple forms\
    //       of instruments ranging from electric and steel guitars to drums and mandolin or mouth organ."
    // },
    // {
    //   genreAPI: "dubstep",
    //   genreName: "Dubstep",
    //   description:
    //     "The use of instruments attracting music lovers for its bass and rhythm,\
    //       this falls in the electronic music genre. People consider it to be a darker\
    //       form of music, but since its birth in the late 1990s, this genre has successfully\
    //       made its place in the industry."
    // },
    // {
    //   genreAPI: "electro",
    //   genreName: "Electro",
    //   description:
    //     "A perfect blend of hip hop and electronic music, electro or electro-funk\
    //       uses drum machine, vocoder and talkbox helping it to distinguish itself from\
    //       another similar form of music, “Disco”."
    // },
    // {
    //   genreAPI: "edm",
    //   genreName: "Electronic Dance Music",
    //   description:
    //     "Generally referred as EDM, this form of music is produced by DJs who add dozens\
    //     of tones to a piece to create unique music. You can hear them in clubs or even live,\
    //     depending upon your accessibility for the same."
    // },
    // {
    //   genreAPI: "folk",
    //   genreName: "Folk",
    //   description:
    //     "Defined in several ways: as music transmitted orally, music with unknown composers,\
    //       or music performed by custom over a long period of time. It has been contrasted with\
    //       commercial and classical styles. The term originated in the 19th century, but folk music\
    //       extends beyond that."
    // },
    // {
    //   genreAPI: "funk",
    //   genreName: "Funk",
    //   description:
    //     "A music genre that originated in African-American communities in the mid-1960s when\
    //     African-American musicians created a rhythmic, danceable new form of music through\
    //     a mixture of soul music, jazz, and rhythm and blues."
    // },
    // {
    //   genreAPI: "gospel",
    //   genreName: "Gospel",
    //   description:
    //     "Essentially Southern in origin and performed by large, soulful choirs, which\
    //     in themselves are natural extensions of the rehearsed and arranged community\
    //     choirs of the southern churches, both black and white. The creation, performance,\
    //     significance, and even the definition of gospel music varies according to culture\
    //     and social context."
    // },
    // {
    //   genreAPI: "hard-rock",
    //   genreName: "Hard-Rock",
    //   description:
    //     "A loosely defined subgenre of rock music that began in the mid-1960s, with the garage,\
    //       psychedelic and blues rock movements. It is typified by a heavy use of aggressive vocals,\
    //       distorted electric guitars, bass guitar, drums, and often accompanied with keyboards."
    // },
    // {
    //   genreAPI: "hip-hop",
    //   genreName: "Hip Hop",
    //   description:
    //     "A style of popular music in which an insistent, recurring beat pattern provides\
    //       the background and counterpoint for rapid, slangy, and often boastful\
    //       rhyming patter glibly intoned by a vocalist or vocalists."
    // },
    // {
    //   genreAPI: "holidays",
    //   genreName: "Holidays",
    //   description:
    //     "Primarily confined to the Christmas season, at which time classics like “White Christmas”\
    //       make their annual return to radio playlists and choir songbooks; in the strictest sense,\
    //       however, its music is typically heard in celebration of a given holiday event."
    // },
    // {
    //   genreAPI: "indian",
    //   genreName: "Indian",
    //   description:
    //     "Includes multiple varieties of Punjabi Music, classical music, folk music, filmi,\
    //       Indian rock, and Indian pop. India's classical music tradition, including Hindustani\
    //       music and Carnatic, has a history spanning millennia and developed over several areas."
    // },
    // {
    //   genreAPI: "jazz",
    //   genreName: "Jazz",
    //   description:
    //     "A music genre that originated in the African-American communities of New Orleans, United\
    //       States. It originated in the late 19th and early 20th centuries, and developed from\
    //       roots in blues and ragtime. Jazz is seen by many as “America's classical music.”"
    // },
    // {
    //   genreAPI: "j-pop",
    //   genreName: "J-pop",
    //   description:
    //     "An abbreviation of Japanese pop. It refers to Western-influenced Japanese popular music.\
    //       The term J-pop was coined by J-Wave, an FM radio station, to denote what was once called\
    //       “New Music.” The term is widely used in Japan to describe many different musical genres\
    //       including pop, rock, dance, rap, and soul."
    // },
    // {
    //   genreAPI: "latino",
    //   genreName: "Latino",
    //   description:
    //     "Due to its highly syncretic nature, Latin American music encompasses a wide variety of styles,\
    //     including influential genres such as cumbia, bachata, bossa nova, merengue, rumba, salsa, samba,\
    //     son, and tango. Latin American music is performed in Spanish, Portuguese, and to a lesser extent,\
    //     French."
    // },
    // {
    //   genreAPI: "mandopop",
    //   genreName: "Mandopop",
    //   description:
    //     "Categorized as a subgenre of commercial Chinese-language music within C-pop.\
    //     Popular music sung in Mandarin was the first variety of popular music in Chinese\
    //     to establish itself as a viable industry. It originated in Shanghai, and later\
    //     Hong Kong, Taipei and Beijing also emerged as important centers of the Mandopop music industry."
    // },
    // {
    //   genreAPI: "opera",
    //   genreName: "Opera",
    //   description:
    //     "A form of theatre in which music has a leading role and the parts are taken by singers,\
    //     but is distinct from musical theater. In traditional number opera, singers employ two\
    //     styles of singing: recitative, a speech-inflected style, and self-contained arias."
    // },
    // {
    //   genreAPI: "piano",
    //   genreName: "Piano",
    //   description:
    //     "An acoustic, stringed musical instrument invented in Italy by Bartolomeo Cristofori\
    //     around the year 1700 (the exact year is uncertain), in which the strings are struck\
    //     by hammers. It is played using a keyboard, which is a row of keys (small levers) that\
    //     the performer presses down or strikes with the fingers and thumbs of both hands to\
    //     cause the hammers to strike the strings."
    // },
    // {
    //   genreAPI: "pop",
    //   genreName: "Pop",
    //   description:
    //     "“Pop” is a term derived from “Popular” and thus Pop Music is known to be a\
    //       genre of popular music. With its roots in the rock & roll style, this form can\
    //       include any form of music ranging from urban and dance to rock, country and Latin.\
    //       Instruments highly used are electric guitars, synthesizer drums as well as bass."
    // },
    // {
    //   genreAPI: "raggae",
    //   genreName: "Raggae",
    //   description:
    //     "Incorporates some of the musical elements of rhythm and blues (R&B), jazz, mento,\
    //       calypso, African, and Latin American music, as well as other genres. Reggae scenes\
    //       consist of two guitars, one for rhythm and one for lead—drums, congas, and keyboards,\
    //       with a couple vocalists."
    // },
    // {
    //   genreAPI: "rock",
    //   genreName: "Rock",
    //   description:
    //     "Originated as “Rock & Roll” in the United States, Rock music has been rocking\
    //       the world since the 1950s. It is a form of music that started actually around\
    //       string instruments, but now uses other modern instruments too making it a little\
    //       difficult to give it an accurate definition. Its loud and strong beats make it\
    //       popular among the youths."
    // },
    // {
    //   genreAPI: "salsa",
    //   genreName: "Salsa",
    //   description:
    //     "A popular dance music genre that initially arose in New York City during the 1960s.\
    //     Salsa is the product of various musical genres including the Afro-Cuban son montuno,\
    //     guaracha, cha cha chá, mambo, and to a certain extent bolero, and the Puerto Rican\
    //     bomba and plena."
    // },
    // {
    //   genreAPI: "ska",
    //   genreName: "Ska",
    //   description:
    //     "Originated in Jamaica in the late 1950s and was the precursor to rocksteady and reggae.\
    //       It combined elements of Caribbean mento and calypso with American jazz and rhythm and blues.\
    //       Ska is characterized by a walking bass line accented with rhythms on the off beat."
    // },
    // {
    //   genreAPI: "sleep",
    //   genreName: "Sleep",
    //   description:
    //     "Relaxing music triggers changes to the body that in many ways mimic a sleep state.\
    //       A slower heart rate, slower breathing, and lower blood pressure are all physiological\
    //       changes that make possible the process of falling asleep and staying asleep."
    // },
    // {
    //   genreAPI: "tango",
    //   genreName: "Tango",
    //   description:
    //     "A style of music in or time that originated among European immigrant populations of\
    //       Argentina and Uruguay. It is traditionally played on a solo guitar, guitar duo, or an\
    //       ensemble, known as the orquesta típica, which includes at least two violins, flute, piano,\
    //       double bass, and at least two bandoneóns."
    // },
    // {
    //   genreAPI: "trance",
    //   genreName: "Trance",
    //   description:
    //     "A genre of electronic music that emerged from the British new-age music scene and\
    //       the early 1990s German techno and hardcore scenes. At the same time trance music\
    //       was developing in Europe, the genre was also gathering a following in the Indian\
    //       state of Goa."
    // }
  ];
  return genreObjects;
}
