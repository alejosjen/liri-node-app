var fs = require("fs")
require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
moment().format();
var bandsintown = require("bandsintown-events");
var spotify = require("node-spotify-api");


var keys = require("./keys.js");

//commands
var command = process.argv[2];
var userRequest = process.argv.slice(3).join('+')

if (command === 'concert-this') {
        console.log(userRequest);

        axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=" + keys.bandsintown.bandsAPI).then(
                function (response, error) {
                        if (error) {
                                console.log("What's going on?")
                                return console.log(error);
                        } else if (response.data.length === 0) {
                                console.log("No information available, maybe not on tour at this time.");
                                return; //makeRequest();
                        } else {
                                var concertData = response.data;

                                for (var i = 0; i < concertData.length; i++) {
                                        //Get venue name
                                        console.log(`Venue: ${concertData[i].venue.name}`);
                                        console.log(`Location: ${concertData[i].venue.city}, ${concertData[i].venue.region}`);
                                        var date = concertData[i].datetime;
                                        date = moment(date).format("MM/DD/YYYY");
                                        console.log(`Date: ${date}`);
                                }
                        }
                }
        )
} else if (command === 'spotify-this-song') {

} else if (command === 'movie-this') {
        axios.get("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy").then(
                function (response, error) {
                        if (error) {
                                return console.log(error);
                        } else if (userRequest === "") {
                                axios.get(`http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=${keys.omdb.moviesAPI}`).then(
                                console.log(`
                                        Title & Year: ${response.data.Title} and made in ${response.data.Year}\n
                                        IMdB's rating is: ${response.data.imdbRating}\n
                                        Rotton Tomatoes says: ${response.data.Ratings[1].Value}\n
                                        Country where prodcued: ${response.data.Country}\n
                                        Language: ${response.data.Language}\n
                                        Plot: ${response.data.Plot}\n
                                        Actors: ${response.data.Actors}
                                `))
                        } else {
                                var moviesData = response.data;
                                console.log(`
                                        Title & Year: ${moviesData.Title} and made in ${moviesData.Year}\n
                                        IMdB's rating is: ${moviesData.imdbRating}\n
                                        Rotton Tomatoes says: ${moviesData.Ratings[1].Value}\n
                                        Country where prodcued: ${moviesData.Country}\n
                                        Language: ${moviesData.Language}\n
                                        Plot: ${moviesData.Plot}\n
                                        Actors: ${moviesData.Actors}
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
//         ]).then(answers => {
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
