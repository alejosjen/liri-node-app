var fs = require("fs")
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
moment().format();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var command = process.argv[2];
var userInput = process.argv.splice(3).join("+");
var divider = "-------------------------------";

function makeChoice() {
    if (command === "concert-this") {
            bandName = userInput.replace(/\"/g, '');
            if (!bandName) {
                bandName = "Coldplay";
            }
            axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + keys.bandsintown.bandsAPI).then(
                function (response) {
                    if (response.data.length === 0 || typeof response.data !== 'object') {
                        console.log("No information available, may be not on tour at this time.");
                    } else {
                        try {
                            var concertData = response.data;
                            for (var i = 0; i < concertData.length; i++) {
                                var venue = concertData[i].venue.name;
                                var location = concertData[i].venue.city
                                var region = concertData[i].venue.region

                                console.log(divider);
                                console.log("Artist/Band: " + userInput.split("+").join(" "))
                                console.log(`Venue: ${venue}`);
                                console.log(`Location: ${location} ${region}`);
                                var date = concertData[i].datetime;
                                date = moment(date).format("MM/DD/YYYY");
                                console.log(`Date: ${date}`);
                                console.log(divider);

                                fs.appendFileSync("log.txt",
                                    "Artist/Band: " + bandName +
                                    "\nVenue: " + venue +
                                    "\nLocation " + location + " " + region +
                                    "\nDate: " + date +
                                    "\n-----------------\n",
                                    function (error) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log("Search results stored!");
                                        };
                                    });
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }, function (error) {
                    console.log("test error: ");
                    if (error) {
                        console.log(error);
                    }
                }
            )
    }
    else if (command === "spotify-this-song") {
            if (!userInput) {
                userInput = "The Sign, Ace of Base";
            }
            spotify.search({ type: 'track', query: userInput })
                .then(function (response) {
                    try {
                        var albumData = response.tracks.items;
                        for (var i = 0; i < albumData.length; i++) {
                            var albumInfo = albumData[i].album;
                            var artistName = albumInfo.artists;
                            var songName = albumData[i].name;
                            var songPreview = albumData[i].preview_url;
                            var albumName = albumData[i].album.name;

                            for (var j = 0; j < artistName.length; j++) {
                                var artistsNames = artistName[j].name;
                                console.log(`Artist(s): ${artistsNames}`);
                                console.log(`Name of song: ${songName}`);
                                console.log(`Preview link from Spotify: ${songPreview}`);
                                console.log(`Album: ${albumName}`);
                                console.log(divider)
                            }
                        }
                        fs.appendFileSync("log.txt", "Artist(s): " + artistsNames +
                            "\nName of song: " + songName +
                            "\nPreview link from Spotify: " + songPreview +
                            "\nAlbum: " + albumName +
                            "\n-----------------\n",
                            function (error) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Search results stored!");
                                };
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }, function (error) {
                    console.log("Error: ");
                    if (error) {
                        console.log(error);
                    }
                }
                )
    }
    else if (command === "movie-this") {
            if (!userInput) {
                userInput = "Mr. Nobody";
            }
            axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + keys.omdb.moviesAPI).then(
                function (response) {
                    try {
                        var moviesData = response.data;
                        var movieTitle = moviesData.Title;
                        var movieYear = moviesData.Year;
                        var imdbRating = moviesData.imdbRating;
                        var rottenRating = moviesData.Ratings[1].Value;
                        var country = moviesData.Country;
                        var language = moviesData.Language;
                        var plot = moviesData.Plot;
                        var actors = moviesData.Actors;

                        console.log(`${divider}`);
                        console.log(`Title & Year: ${movieTitle}, made in ${movieYear}`);
                        console.log(`IMdB's rating is: ${imdbRating}`);
                        console.log(`Rotton Tomatoes says: ${rottenRating}`);
                        console.log(`Country where produced: ${country}`);
                        console.log(`Language: ${language}`);
                        console.log(`Plot: ${plot}`);
                        console.log(`Actors: ${actors}`);
                        console.log(`${divider}`);

                        fs.appendFileSync("log.txt", "Title & Year: " + moviesData.Title + ", " + moviesData.Year +
                            "\nIMdB's rating is: " + moviesData.imdbRating + ", Rotton Tomatoes says: " + moviesData.Ratings[1].Value +
                            "\nCountry where produced: " + moviesData.Country + ", Language: " + moviesData.Language +
                            "\nPlot: " + moviesData.Plot + "\nActors: " + moviesData.Actors + "\n-----------------\n",
                            function (error) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("Search results stored!");
                                };
                            });

                    } catch (error) {
                        console.log("Error: " + error);
                    }
                }, function (error) {
                    console.log("Error: ");
                    if (error) {
                        console.log(error);
                    }
                }
            );
    }
    else if (command === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                var textFile = data.split(",");
                command = textFile[0];
                userInput = textFile[1];
                makeChoice();
            })
    }
}
makeChoice();