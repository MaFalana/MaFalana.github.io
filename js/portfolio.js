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

    function createIntrest(activity, title, id)
    {
      if(activity == "Gaming")
      {
        //createGame(id, title);
        getRecentGames();
      }
      else if(activity == "Reading")
      {
        //createBook(id, title);
      }
      else if(activity == "Watching")
      {
        //createShow(id, title);
      }
      else if(activity == "Music")
      {
        //createMusic(id, title);
      }
      else if(activity == "Learning")
      {
        // var html = `<div class = "card card${id}">`;
        // html += `<div class="container">`;
        // html += `<img src="./assets/Test/1.png" alt=${title}>`;
        // html += `</div>`;
        // html += `<div class="details">`;
        // html += `<h3>${title}</h3>`;
        // html += `<p></p>`;
        // html += `</div>`;
        // html += `</div>`;
        // $(".Intrests div.master").append(html); //Append to Intrests Section
      }
       
    }

    function displayIntrests()
    {
        const data = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < data.length; i++)
        {
            createIntrest(data[i], i);
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
      const url = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=0D836EDE33B2BBFA7AB2EF93DF2FEBFF&steamid=76561199242197802";
      $.getJSON(url, function(data) // Grabs Projects from JSON file
      {
          //for(var i = 0; i < data.games.length; i++)
          //{
              var game = data.games[0]; //assigns variable from json data
              console.log(game);
              var title = game.name;
              var image = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`;
              createGame(game.appid, image, title);
          //}
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