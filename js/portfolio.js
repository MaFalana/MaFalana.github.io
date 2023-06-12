/**************************************
 TITLE: portfolio.js							
 AUTHOR: Malik Falana (MF)			
 CREATE DATE: 09/21/2022	
 PURPOSE: To use jquery and functions for portfolio page
 LAST MODIFIED ON: 09/21/2022	
 LAST MODIFIED BY: Malik Falana (MF)
 MODIFICATION HISTORY:
09/21/2022: Original Build
***************************************/
//import getRecentGames from './intrests.js';
//import {getRecentGames, createGame} from './intrests.js';

$(document).ready(function() 
{

  
    //Functions
    const musicKit = MusicKit.configure({
      developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6Ikg1WVpRNVpLWjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJYMzM5Mkg3RzQ0IiwiaWF0IjoxNjg2NDQyMDI2LCJleHAiOjE3MDE5Nzk2MjZ9.T52pLTXF9c5bHbBVClCJYPnNHYbO9U0lVqLG6X7WG8KpHe3hZqL_34ZKiZBt3B-XqcmeTA4XYX8skn3xSuHOEQ',
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
          fetch('/api/Music', {
              method: 'GET',
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

    function displayStats() // Displays leetcode stattistics
    {
        const url = "./interests.json";

        $.getJSON(url, function(data) //assigns variable from json data
        {
            var activity = data.totalSolved;
            var image = data.totalQuestions  
        
            var description = data.easySolved;
            var totalEasy = data.totalEasy;  

            var mediumSolved = data.mediumSolved;
            var totalMedium = data.totalMedium  

            var hardSolved = data.hardSolved;
            var totalHard = data.totalHard;

            const solvedQuestions = [easySolved,totalEasy,mediumSolved,totalMedium,hardSolved,totalHard]
            
            
            $("#LeetCode").append(html); //Append to Projects Section
        });


    }

    function createIntrest(activity)
    {
      
      //const url = `http://127.0.0.1:5000/api/${activity}`;
      const url = `https://portfolio-server-omega-gray.vercel.app/${activity}`

      $.getJSON(url, function(data) // Grabs Projects from JSON file
      {
          console.log(data);
          makeIntrest(data.id, data.title, data.image, data.description);
      });

      
       
    }

    function displayIntrests()
    {
        const data = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < data.length; i++)
        {
            createIntrest(data[i]);
        } 
    }

    function makeIntrest(id, title, image, description)
    {
        var html = `<div class = "card card${id}">`;
          html += `<div class="container">`;
          html += `<img src=${image} alt=${id}>`;
          html += `</div>`;
          html += `<div class="details">`;
          html += `<h3>${title}</h3>`;
          html += `<p>${description}</p>`;
          html += `</div>`;
          html += `</div>`;
          $(".Intrests div.master").append(html); //Append to Intrests Section
    }

    function displayProjects()
    {
        $.getJSON("./projects.json", function(data) // Grabs Projects from JSON file
        {
            for(var i = 0; i < data.projects.length; i++)
            {
                var project = data.projects[i]; //assigns variable from json data
                createProject(i, project.title, project.image, project.description, project.tools, project.git, project.demo);
            }
        });
    }

    function createProject(id, title, image, description, tools, git, demo)
    {
       var html = `<div class = "card Project${id}">`;
       html += `<div class="container">`;
       html += `<img src=${image[0]} alt=${title}>`;
       html += `</div>`;
       html += `<div class="details">`;
       html += `<h3>${title}</h3>`;
       html += `<p>${description}</p>`;
       html += `<p>${tools}</p>`;
       html += `<a href="${git}">Github</a>`
       html += `<a href="${demo}">Live Demo</a>`
       html += `</div>`;
       html += `</div>`;
       $(".Projects div.master").append(html); //Append to Projects Section
    }

    function downloadResume(event) 
    {
        event.preventDefault();
        var resumeUrl = event.target.href;
        window.location.href = resumeUrl;
    }







function sendRequest() {
  var client_id = '24a98e8a81ac4516ba6d02b77e22aa05';
  var client_secret = '1c32cc6b901943c789d11800568ccb9b';

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    form: {
      grant_type: 'client_credentials',
      scope: 'user-read-recently-played' // Add the desired scopes here
    },
    json: true
  };

  return fetch(authOptions.url, {
    method: 'POST',
    headers: {
      'Authorization': authOptions.headers.Authorization
    },
    body: new URLSearchParams(authOptions.form)
    
  })
  .then(response => response.json())
  .then(data => {
    var token = data.access_token;
    console.log(data);
    console.log(token);
    return token;
  });
}



  
      
    displayStats();
    displayIntrests() 
    displayProjects();
    

    //Event Listeners

    $(".Project").on("scroll", function() {
      var visibleProject = null;
    
      $(".Project").each(function() {
        var projectOffset = $(this).offset().top;
        var projectHeight = $(this).outerHeight();
        var scrollPosition = $(".Projects").scrollTop();
        var windowHeight = $(".Projects").height();
    
        if (
          projectOffset < scrollPosition + windowHeight &&
          projectOffset + projectHeight > scrollPosition
        ) {
          visibleProject = $(this);
        } else {
          $(this).removeClass("active");
        }
      });
    
      if (visibleProject !== null) {
        $(".Project").removeClass("active");
        visibleProject.addClass("active");
      }
    });

    
    
    
    
    
  
    


    

});  // end of $(document).ready()