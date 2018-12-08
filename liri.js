require("dotenv").config();

var spotifyKeys = require("keys.js")

var spotify = new Spotify(keys.spotify);

//commands
//  concert-this
        //node liri.js concert-this <artits/band name here>
        //Search Bands in Town, artist events, API
        //("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        //Render: Name of the venue
        //  Venue location
        //  Date of the Event (use moment to format this as "MM/DD/YYYY")
//  spotify-this-song
//  movie-this
//  do-what-it-says