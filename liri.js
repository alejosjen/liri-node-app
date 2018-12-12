var fs = require("fs")
require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var bands = require("bandsintown-events");



var keys = require("./keys.js");
/* var spotify = new Spotify(keys.spotify);
 */
//commands
var command = process.argv[2];
var request = process.argv[3];


if (command === 'concert-this') {
        console.log(process.env.BANDS_KEY);
        console.log(request);
        axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=" + keys.bandsintown.bands_API).then(
                function (response) {
                        if (response.data.length === 0) {
                                console.log("Not on tour at this time.");
                                return;
                        }
                        console.log(response.data);
                }
        );
} else if (command === 'spotify-this-song') {

} else if (command === 'movie-this') {
        axios.get("http://www.omdbapi.com/?t=r" + request + "&y=&plot=short&apikey=" + process.env.OMBD_KEY).then(
                function (response) {
                        console.log("The movie's rating is: " + response.data.imdbRating);
                }
        );
}

/* var search = artist
 *///  concert-this
        //node liri.js concert-this <artits/band name here>
        //Search Bands in Town, artist events, API
        //("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        //Render: Name of the venue
        //  Venue location
        //  Date of the Event (use moment to format this as "MM/DD/YYYY")
//  spotify-this-song
    //Use node-spotify-api
        //node liri.js spotify-this-song '<song name here>'
        //  Render: Artist(s)
        //  The song's name
        //  A preview link of the song from Spotify
        //  The album that the song is from
            //  If no song, default to "The Sign" by Ace of Base
//  movie-this
    //axios to retrieve OMDB API
    //API key trilogy
        //node liri.js movie-this '<movie name here>'
        //Render: Title, Year, Rating, Rotten Tomatoes rating, country where produced,
        //language of movie, plot, actors
            //If no movie, default to "Mr. Nobody" http://www.imdb.com/title/tt0485947/
//  do-what-it-says
    //fs Node package, take random.txt and use it call a command
        //node liri.js do-what-it-says
        //Should run spotify-this-song for "I Want it That Way" from random.txt
        //Test text in random.txt for movie-this and concert-this
//Bonus
    //Log output to log.txt
    //Append each command to log.txt, do not overwrite the file each time
