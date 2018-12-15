var fs = require("fs")
require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
moment().format();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
});


//commands
var command = process.argv[2];
var userRequest = process.argv.slice(3).join('+');
var divider = "-------------------------------";

if (command === 'concert-this') {
        console.log(userRequest);
        if (!userRequest) {
                userRequest = "Coldplay";
        }
        axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=" + keys.bandsintown.bandsAPI).then(
                function (response, error) {
                        if (error) {
                                return console.log(error);
                        } else if (response.data.length === 0) {
                                console.log("No information available, maybe not on tour at this time.");
                                return; //makeRequest();
                        } else {
                                var concertData = response.data;
                                for (var i = 0; i < concertData.length; i++) {
                                        console.log(`Venue: ${concertData[i].venue.name}`);
                                        console.log(`Location: ${concertData[i].venue.city} ${concertData[i].venue.region}`);
                                        var date = concertData[i].datetime;
                                        date = moment(date).format("MM/DD/YYYY");
                                        console.log(`Date: ${date}`);
                                        console.log(divider)
                                }
                        }
                }
        )
} else if (command === 'spotify-this-song') {
        if (!userRequest) {
                userRequest = "The Sign, Ace of Base";
        }
        spotify.search({ type: 'track', query: userRequest }, function (err, data) {
                if (err) {
                        return console.log('Error occurred: ' + err);
                }
                var albumData = data.tracks.items;
                for (var i = 0; i < albumData.length; i++) {
                        var albumInfo = albumData[i].album;
                        var artistName = albumInfo.artists;
                        var songName = albumData[i].name;
                        var songPreview = albumData[i].preview_url;
                        var albumName = albumData[i].album.name;

                        for (var j = 0; j < artistName.length; j++) {
                                console.log(`Artist(s): ${artistName[j].name}`); //artists
                                console.log(`Name of song: ${songName}`); //name of album
                                console.log(`Preview link from Spotify: ${songPreview}`);
                                console.log(`Album: ${albumName}}`);
                                console.log(divider)
                        };
                };
        });
} else if (command === 'movie-this') {
        if (!userRequest) {
                userRequest = "Mr. Nobody";
        }
        axios.get("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=" + keys.omdb.moviesAPI).then(

                function (response, error) {

                        //console.log(response);
                        if (error) {
                                console.log(error);
                                return;
                        } else {
                                var moviesData = response.data;
                                console.log(`
                                        \nTitle & Year: ${moviesData.Title}, made in ${moviesData.Year}
                                        \nIMdB's rating is: ${moviesData.imdbRating}
                                        \nRotton Tomatoes says: ${moviesData.Ratings[1].Value}
                                        \nCountry where produced: ${moviesData.Country}
                                        \nLanguage: ${moviesData.Language}
                                        \nPlot: ${moviesData.Plot}
                                        \nActors: ${moviesData.Actors}
                                        \n${divider}
                                `)
                        }
                }
        );
} else if (command === "do-what-it-says") {

} else {
        console.log("Enter a command, please")
};

// function bands() {
//         console.log(userRequest);
//         axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=" + keys.bandsintown.bandsAPI).then(
//                 function (response) {
//                         console.log(JSON.parse(response, null, 2));
//                 })
// }



// function makeRequest() {
// inquirer
//         .prompt([{
//                 type: "list",
//                 message: "What would you like to search?",
//                 name: "options",
//                 choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
//         }, {
//                 type: "input",
//                 message: "Enter your request.",
//                 name: "request"
//         }
//         ]).then(function(answers) {
//                 if (answers.choices === "concert-this") {
//                         return bands();
//                 }
//                 if (answers.choices === "spotify-this-song") {
//                         return songs();
//                 }
//                 if (answers.choices === "movie-this") {
//                         return movies();
//                 }
//                 if (answers.choices === "do-what-it-says") {
//                         return other();
//                 }
//         });        
//}




//  spotify-this-song
    //Use node-spotify-api
        //node liri.js spotify-this-song '<song name here>'
        //  Render: Artist(s)
        //  The song's name
        //  A preview link of the song from Spotify
        //  The album that the song is from
            //  If no song, default to "The Sign" by Ace of Base

//  do-what-it-says
    //fs Node package, take random.txt and use it call a command
        //node liri.js do-what-it-says
        //Should run spotify-this-song for "I Want it That Way" from random.txt
        //Test text in random.txt for movie-this and concert-this
//Bonus
    //Log output to log.txt
    //Append each command to log.txt, do not overwrite the file each time
