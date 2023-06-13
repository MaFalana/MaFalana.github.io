/**************************************
 TITLE: authorize.js							
 AUTHOR: Malik Falana (MF)			
 CREATE DATE: 06/12/2023	
 PURPOSE: To generate a Music User token for apple music api and send it to the server
 LAST MODIFIED ON: 06/12/2023	
 LAST MODIFIED BY: Malik Falana (MF)
 MODIFICATION HISTORY:
 06/12/2023: Original Build
***************************************/

const musicKit = MusicKit.configure({
    developerToken: getToken(),
    app: {
        name: 'Portfolio',
        build: '1.0'
    }
});

console.log(musicKit.musicUserToken);

// Request authorization from the user
musicKit.authorize()
    .then((response) => {
        // Retrieve the Music User Token
        const musicUserToken = response.authorization.musicUserToken;

        // Send the Music User Token back to the server
        fetch('/Music', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'musicUserToken': musicUserToken })
        })
        .then((response) => {
            // Handle the server response
        })
        .catch((error) => {
            // Handle error
        });
    })
    .catch((error) => {
        // Handle error
    });


    function getToken(callback)// gets developer token for apple music api
    {
      
      const url = `http://127.0.0.1:5000/token`;
      //const url = `https://portfolio-server-omega-gray.vercel.app/${activity}`

      $.getJSON(url, function(data) // Grabs Projects from JSON file
      {
          callback(data);
      });
    }