
export function getRecentGames()
{
    const key = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF";
    const steamID = "76561199242197802";
    const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamID}`;

    $.getJSON(url, function(data) // Grabs Projects from JSON file
    {
        var game = data.response.games[0]; //assigns variable from json data
        console.log(data);
        var title = game.name;
        //var image = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
        var image = getGrid(game.appid);
        createGame(game.appid, image, title);
    });
}

export function getGrid(id) //Method to get decent cover art of game
{
  
    const key = "b067ec1341a4f261e19156d57226ce32";
    const url = `https://www.steamgriddb.com/api/v2/grids/steam/${id}?key=${key}`;

    $.getJSON(url, function(data) // Grabs Projects from JSON file
    {
        var source = data.response[0]; //assigns variable from json data
        console.log(source);
        var image = source.url;
        return image;
    });
}

export function createGame(id, image, title)
{
    var html = `<div class = "card card${id}">`;
    html += `<div class="container">`;
    html += `<img src="${image}" alt=${title}>`;
    html += `</div>`;
    html += `<div class="details">`;
    html += `<h3>${title}</h3>`;
    html += `<p></p>`;
    html += `</div>`;
    html += `</div>`;
    $(".Intrests div.master").append(html); //Append to Intrests Section
}



export function sendRequest()
{
  var client_id = '24a98e8a81ac4516ba6d02b77e22aa05';
  var client_secret = '1c32cc6b901943c789d11800568ccb9b';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});

}

export function getRecentlyPlayed()
{
  const clientID = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF";
  const clientSecret = "76561199242197802";
  const url = `https://api.spotify.com/v1/me/player/recently-played`;

    $.getJSON(url, function(data) // Grabs Projects from JSON file
    {
        var game = data.response.games[0]; //assigns variable from json data
        console.log(data);
        var title = game.name;
        //var image = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
        var image = getGrid(game.appid);
        createGame(game.appid, image, title);
    });
}

export function createSong(id, image, title, artist)
{
    var html = `<div class = "card card${id}">`;
    html += `<div class="container">`;
    html += `<img src="${image}" alt=${title}>`;
    html += `</div>`;
    html += `<div class="details">`;
    html += `<h3>${title}</h3>`;
    html += `<p>${artist}</p>`;
    html += `</div>`;
    html += `</div>`;
    $(".Intrests div.master").append(html); //Append to Intrests Section
}

function getRecentTracks() 
{
    const url = "https://api.music.apple.com/v1/me/recent/played/tracks";
  
    // Include your access token in the Authorization header
    const accessToken = "YOUR_ACCESS_TOKEN";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
  
    // Make an HTTP GET request to the Apple Music endpoint
    fetch(url, { headers }).then(response => response.json()).then(data => {
        // Process the response data
        console.log(data);
  
        // Access and handle the recently played tracks
        const tracks = data.data;
        tracks.forEach(track => {
          const trackName = track.attributes.name;
          const artistName = track.attributes.artistName;
          console.log(`Track: ${trackName} by ${artistName}`);
        });
      })
      .catch(error => {
        console.error("Error fetching recent tracks:", error);
      });
  }
  


  function getRecentTracks2() {
    const url = "https://api.music.apple.com/v1/me/recent/played/tracks";
  
    // Include your access token in the Authorization header
    const accessToken = "MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgXb4BLJcRFWHkJX638IVahBvlGFk5Nnr+YLC7eACT9SCgCgYIKoZIzj0DAQehRANCAATsLE9rLgD7dipNgf6xPfz4I3t8VINUHxDsaoamcq1z13c1ZOlzCL/WWpiopSnc5mbdMIw8YHNZra/2XWCjQJ8K";
    const headers = {
      Authorization: "Bearer " + accessToken,
    };
  
    // Make an HTTP GET request to the Apple Music endpoint using $.getJSON
    $.getJSON(url, headers)
      .done(data => {
        // Process the response data
        console.log(data);
  
        // Access and handle the recently played tracks
        const tracks = data.data;
        tracks.forEach(track => {
          const trackName = track.attributes.name;
          const artistName = track.attributes.artistName;
          console.log(`Track: ${trackName} by ${artistName}`);
        });
      })
      .fail(error => {
        console.error("Error fetching recent tracks:", error);
      });
  }
