require("dotenv").config();
var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputString = process.argv;
var request = require("request");
// Parses the command line argument to capture the "command" (add, subtract, multiply, etc) and the numbers
var command = inputString[2];
var songName = inputString[3];
// var num2 = inputString[4];

// Here's the variable we will be modifying with the new numbers
// var outputNum;

// Determines the command selected...
// Based on the command we run the appropriate math on the two numbers
if (command === "my-tweets") {
    myTweets();
//   outputNum = parseFloat(num1) + parseFloat(num2);
}

else if (command === "spotify-this-song") {
    spotifyThisSong(songName);
//   outputNum = parseFloat(num1) - parseFloat(num2);
}

else if (command === "movie-this") {
    movieThis();
//   outputNum = parseFloat(num1) * parseFloat(num2);
}

else if (command === "do-what-it-says") {
    doWhatItSays();
//   outputNum = parseFloat(num1) / parseFloat(num2);
}

//-----------------------------------------------------
function movieThis(){
    var movie = process.argv[3];
    if(!movie){
        movie = "mr nobody";
    }
    params = movie
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            //console.log(movieObject); // Show the text in the terminal
            // console.log(JSON.parse(body));
            var movieResults =
            "------------------------------ begin ------------------------------" + "\r\n"+
            "Title: " + JSON.parse(body).Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
            "------------------------------ end ------------------------------" + "\r\n";
            console.log(movieResults);
            // log(movieResults); // calling log function
        } else {
            console.log("Error :"+ error);
            return;
        }
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////

function myTweets() {

    client.get('statuses/user_timeline', {status: "I am a tweet"}, function(error, tweets, response) {
        if (!error) {
          for( var i=0; i<tweets.length; i++) {
            console.log(tweets[i].text);
          }
        }  else {
                    console.log("Error :"+ error);
                    return;
                }
      });
    // client.get("statuses/user_timeline", {status: "I am a tweet"}, function(error, data, response){
        // if (!error) {
            // for(var i = 0; i < data.length; i++) {
           //console.log(response); // Show the full response in the terminal
  
}
//////////////////////////////////////////////////////////////////////////////////////
function spotifyThisSong(songName) {

    var songName = process.argv[3];
    if(!songName){
        songName = "I Want it That Way";
    }
    params = songName;
    // console.log(params);
    spotify.search({ type: "track", query: params }, function(err, data) {
        if(!err){
            var songInfo = data.tracks.items;
            for (var i = 0; i < 5; i++) {
                if (songInfo[i] != undefined) {
                    var spotifyResults =
                    "Artist: " + songInfo[i].artists[0].name + "\r\n" +
                    "Song: " + songInfo[i].name + "\r\n" +
                    "Album the song is from: " + songInfo[i].album.name + "\r\n" +
                    "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
                    "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(spotifyResults);
                    // log(spotifyResults); // calling log function
                }
            }
        }	else {
            console.log("Error :"+ err);
            return;
        }
    });
};
///////////////////////////////////////////////////////////////////////////////

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (!error) {
            doWhatItSaysResults = data.split(",");
            spotifyThisSong(doWhatItSaysResults[1]);
        } else {
            console.log("Error occurred" + error);
        }
    });
};

function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}
