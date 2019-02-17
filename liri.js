var fs = require('fs'); 
require('dotenv').config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var dotenv = require("dotenv").config();
var request = require('request');
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function errorFunction(respError){
    if (respError){
        return console.log(respError);
    }
    
};
// Spotify default
function searchSong(searchValue){
    console.log("you are here")
    console.log(searchValue)
    if (searchValue === ""){
        searchValue = "The Sign Ace of Base";
    }
    // use Spotify key
    console.log("Search Value = " + searchValue);
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: searchValue, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

       
      console.log(data.tracks.items[0].artists); 
      

      
      });
};

searchSong(input);
