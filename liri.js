require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)

//Converts user input into a string
var userInput = process.argv[3];
if (process.argv.length > 4) {
    for (i = 4; i < process.argv.length; i++) {
        userInput = userInput + " " + process.argv[i];
    }
};

//CLI Command Processor
var command = process.argv[2];
switch (command) {
    case "concert-this":
        concertThis();
        break;
    // case "spotify-this-song":
    //     spotifyThisSong();
    //break;
    case "movie-this":
        movieThis();
        break;
    // case "do-what-it-says":
    //     doWhatItSays();
    //break;
};

//concert-this
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date of the Event: " + moment(response.data[i].datetime).format("L"));
            }
        });
};

//spotify-this-song
function spotifyThisSong() {

};

//movie-this
function movieThis() {
    if (!userInput) {
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            if (response.data.Ratings[1]){
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            }
            else {
                console.log("Rotten Tomatoes Rating: Not Available");
            }
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Cast: " + response.data.Actors);
        });
};

//do-what-it-says
function doWhatItSays() {

};