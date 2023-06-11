
export function getRecentGames()
{
    const key = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF";
    const steamID = "76561199242197802";
    const proxyURL = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamID}`;

    $.ajax({url: proxyURL, dataType: "json",
    success: function(response) 
    {
        var game = response.response.games[0]; //assigns variable from json data
        console.log(data);
        var title = game.name;
        var image = getGrid(game.appid);
        createGame(game.appid, image, title);
    },
    error: function(xhr, status, error) 
    {
        console.error(error);  // Handle any errors that occur during the request
    }
    });
}

export function getGrid(id) //Method to get decent cover art of game
{
  
    const key = "b067ec1341a4f261e19156d57226ce32";
    const proxyURL = `https://www.steamgriddb.com/api/v2/grids/steam/${id}?key=${key}`;

    $.ajax({url: proxyURL, dataType: "json",
    success: function(response) 
    {
        console.log(response); // Process the response from the proxy server
        var source = response.data[0]; //assigns variable from json data
        var image = source.url;
        return image;
    },
    error: function(xhr, status, error) 
    {
        console.error(error);  // Handle any errors that occur during the request
    }
    });
}

