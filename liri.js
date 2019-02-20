var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var dotenv = require("dotenv").config();
var request = require("request");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function errorFunction(respError) {
  if (respError) {
    return console.log(respError);
  }
}
// Spotify default
function searchSong(searchValue) {
  // console.log(searchValue)
  if (searchValue === "") {
    searchValue = "The Sign Ace of Base";
  }
  // use Spotify key
  console.log("Search Value = " + searchValue);
  var spotify = new Spotify(keys.spotify);
  spotify.search({ type: "track", query: searchValue, limit: 5 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log(data.tracks.items[0].artists);
  });
}

function concertThis(artist) {
    v 
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(function(response) {
    console.log("Venue Name: ", response.data[0].venue.name);
    console.log("Location: " + response.data[0].venue.city);

    var dateTime = response.data[0].datetime;
    console.log("Date Time: " + moment(dateTime).format("MM/DD/YYYY"));
  });
}

function movieThis(movie) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  axios.get(queryUrl).then(function(response) {
    //    console.log(response);

    console.log("Movie Title: " + response.data.Title);
    console.log("Releasing Date: " + response.data.Released);
    console.log("Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
  });
}
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      console.log(error);
    }
    // console.log(data.split(","));
    var arr = data.split(",");
    var command = arr[0];
    var input = arr[1];
    if (command === "spotify-this-song") {
      searchSong(input);
    } else if (command === "concert-this") {
      concertThis(input);
    } else if (command === "movie-this") {
      movieThis(input);
    } else {
      console.log("Not a valid entry");
    }
  });
}

switch (command) {
  case "concert-this":
    concertThis(input);
    break;
  case "spotify-this-song":
    searchSong(input);
    break;
  case "movie-this":
    movieThis(input);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Not a valid entry");
    break;
}
