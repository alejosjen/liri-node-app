var fs = require("fs")
require("dotenv").config();
var inquirer = require("inquirer");

var spotifyKeys = require("./keys.js")
/* var spotify = new Spotify(keys.spotify);
 */
//commands
var command = process.argv[2]
console.log(process.argv[2])

 if(command === 'concert-this'){

 } else if (command === 'spotify-this-song'){

 } else if (command === 'movie-this') {
         
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
