require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

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
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
};

//concert-this
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                doubleLog("Venue Name: " + response.data[i].venue.name);
                doubleLog("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                doubleLog("Date of the Event: " + moment(response.data[i].datetime).format("L"));
            }
        });
};

//spotify-this-song
function spotifyThisSong() {
    if (!userInput) {
        userInput = "The Sign Ace of Base";
    }
    spotify.search({type: "track", query: userInput})
        .then(function (response) {
            var userSong = response.tracks.items;
            doubleLog("Artist(s): " + userSong[0].artists[0].name);
            doubleLog("Song Name: " + userSong[0].name);
            doubleLog("Preview Link: " + userSong[0].preview_url);
            doubleLog("Album: " + userSong[0].album.name);
        });

};

//movie-this
function movieThis() {
    if (!userInput) {
        userInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            doubleLog("Title: " + response.data.Title);
            doubleLog("Release Year: " + response.data.Year);
            doubleLog("IMDB Rating: " + response.data.imdbRating);
            if (response.data.Ratings[1]){
                doubleLog("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            }
            else {
                doubleLog("Rotten Tomatoes Rating: Not Available");
            }
            doubleLog("Country: " + response.data.Country);
            doubleLog("Language: " + response.data.Language);
            doubleLog("Plot: " + response.data.Plot);
            doubleLog("Cast: " + response.data.Actors);
        });
};

//do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, response) {
        var randomInput = response.split(",");
        userInput = randomInput[1];
        switch (randomInput[0]) {
            case "concert-this":
                concertThis();
                break;
            case "spotify-this-song":
                spotifyThisSong();
                break;
            case "movie-this":
                movieThis();
                break;
        };
    })
};

function doubleLog (input) {
    console.log(input);
    fs.appendFile("log.txt", "\n" + input, function(error){});
};