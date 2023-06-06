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
      
      switch (activity) 
      {
        case "Reading":
          
          break;
        case "Watching":
          // createBook(id, title);
          break;

        case "Music":
          // createShow(id, title);
          //getRecentTracks2();
          break;

        case "Gaming":
          getRecentGames();
          break;

        case "Learning":
          break;

        default:
          var html = `<div class = "card card${activity}">`;
          html += `<div class="container">`;
          html += `<img src="./assets/Test/1.png" alt=${activity}>`;
          html += `</div>`;
          html += `<div class="details">`;
          html += `<h3>${activity}</h3>`;
          html += `<p></p>`;
          html += `</div>`;
          html += `</div>`;
          $(".Intrests div.master").append(html); //Append to Intrests Section
          break;

      }
       
    }

    function displayIntrests()
    {
        const data = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < data.length; i++)
        {
            createIntrest(data[i]);
        } 
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

     function getRecentGames()
{
    const key = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF";
    const steamID = "76561199242197802";
    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamID}`;

    $.getJSON(url, function(data) // Grabs Projects from JSON file
    {
        var game = data.response.games[0]; //assigns variable from json data
        console.log(data);
        var title = game.name;
        var image = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
        //var image = getGrid(game.appid);
        createGame(game.appid, image, title);
    });
}

function getGrid(id) //Method to get decent cover art of game
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


 function createGame(id, image, title)
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

  //  function getRecentGames()
  //  {
  //     const key = "0D836EDE33B2BBFA7AB2EF93DF2FEBFF";
  //     const steamID = "76561199242197802";
  //     const url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamID}`;

  //     $.getJSON(url, function(data) // Grabs Projects from JSON file
  //     {
  //       var game = data.response.games[0]; //assigns variable from json data
  //       console.log(data);
  //       var title = game.name;
  //       var image = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
  //       createGame(game.appid, image, title);
  //     });
  //  }




  //  function createGame(id, image, title)
  //  {
  //     var html = `<div class = "card card${id}">`;
  //     html += `<div class="container">`;
  //     html += `<img src="${image}" alt=${title}>`;
  //     html += `</div>`;
  //     html += `<div class="details">`;
  //     html += `<h3>${title}</h3>`;
  //     html += `<p></p>`;
  //     html += `</div>`;
  //     html += `</div>`;
  //     $(".Intrests div.master").append(html); //Append to Intrests Section
  //  }
  
      
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