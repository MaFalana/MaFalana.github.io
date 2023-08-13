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

    function displayIntrests()
    {
        const activity = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < activity.length; i++)
        {
          const url = `http://127.0.0.1:5000/${activity[i]}`;
          //const url = `https://portfolio-server-omega-gray.vercel.app/${activity[i]}`

          $.getJSON(url, function(data) // Grabs Projects from JSON file
          {
              createIntrest(data);
          });
        } 
    }

    function createIntrest(source)
    {
        var html = `<div class = "card card${source.id}">`;
          html += `<div class="container">`;
          html += `<img src=${source.image} alt=${source.id}>`;
          html += `</div>`;
          html += `<div class="details">`;
          html += `<h3>${source.title}</h3>`;
          html += `<p>${source.description}</p>`;
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
                createProject(i,project);
            }
        });
    }

    function createProject(id,source)
    {
       var html = `<div class = "card Project${id}">`;
       html += `<div class="container">`;
       html += `<img src=${source.image[0]} alt=${source.title}>`;
       html += `</div>`;
       html += `<div class="details">`;
       html += `<h3>${source.title}</h3>`;
       html += `<p>${source.description}</p>`;
       html += `<p>${source.tools}</p>`;
       html += `<a href="${source.git}">Github</a>`
       html += `<a href="${source.demo}">Live Demo</a>`
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