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
        const url = "https://leetcode-stats-api.herokuapp.com/mfalana";

        $.getJSON(url, function(data) //assigns variable from json data
        {
            var totalSolved = data.totalSolved;
            var totalQuestions = data.totalQuestions  
        
            var easySolved = data.easySolved;
            var totalEasy = data.totalEasy;  

            var mediumSolved = data.mediumSolved;
            var totalMedium = data.totalMedium  

            var hardSolved = data.hardSolved;
            var totalHard = data.totalHard;

            const solvedQuestions = [easySolved,totalEasy,mediumSolved,totalMedium,hardSolved,totalHard]
            
            
            var html = "<div>";



            html += `<div class="total">`; // Total

            html += `<canvas class = "my-chart">`;

            html += `</canvas>`;

            html += "</div>"; //End of total

            

            html += `<div class="detail">`; // detail

            html += `<canvas class = "my-chart-2">`;

            html += `</canvas>`;

            html += "</div>"; //End of detail


            html += "</div>"; //End of Card

            $("#LeetCode").append(html); //Append to Projects Section

            createDonut(totalSolved, totalQuestions);
            createLines(solvedQuestions);

        });


    }

    function createDonut(totalSolved, totalQuestions)
    {
        const myChart = $(".my-chart");

        const chartData = {
            labels: ['Solved','Total Questions'],
            data: [totalSolved, totalQuestions],
          };

         new Chart(myChart, {
            type: "doughnut",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "idk",
                        data: chartData.data,
                    }
                    
                ]
            },
        })
        
    }

    function createLines(solvedQuestions)
    {
        const myChart = $(".my-chart-2");

        const chartData = {
            labels: ['Solved','Total Questions'],
            data: solvedQuestions,
          };

          const easyData = {
            label: "Easy Questions",
            data: [solvedQuestions[0],solvedQuestions[1]],
          }

          const mediumData = {
            label: "Medium Questions",
            data: [solvedQuestions[2],solvedQuestions[3]],
          }

          const hardData = {
            label: "Hard Questions",
            data: [solvedQuestions[4],solvedQuestions[5]],
          }

         new Chart(myChart, {
            type: "bar",
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: "Easy",
                        data: easyData.data,
                    },

                    {
                        label: "Medium",
                        data: mediumData.data,
                    },

                    {
                        label: "Hard",
                        data: hardData.data,
                    }
                    
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        })
        
    }

    function createIntrest(title, id)
    {
       var html = `<div class = "card card${id}">`;
       html += `<div class="container">`;
       html += `<img src="./assets/Test/1.png" alt=${title}>`;
       html += `</div>`;
       html += `<div class="details">`;
       html += `<h3>${title}</h3>`;
       html += `<p></p>`;
       html += `</div>`;
       html += `</div>`;
       $(".Intrests div.master").append(html); //Append to Intrests Section
    }

    function displayIntrests()
    {
        const data = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < data.length; i++)
        {
            createIntrest(data[i], i);
        }   
    }

    function makeCarousel(carousel)
    {
       // var carousel = document.querySelector('.Carousel');

        const items = carousel.querySelectorAll('.Carousel-item');

        const buttonsHtml = Array.from(items, () => 
        {
            return `<span class="Carousel-btn"></span>`
        });
        
        carousel.insertAdjacentHTML('beforeend', `
        <div class="Carousel-nav">
        ${buttonsHtml.join('')}
        </div>
        `);


        const buttons = document.querySelectorAll('.Carousel-btn');
        buttons.forEach ((button, i) => 
        {
            button.addEventListener('click', () => 
            {
                //unselect all items
                items.forEach(item => item.classList.remove('Carousel-item--selected'));
                buttons.forEach(item => item.classList.remove('Carousel-btn--selected'));

                //select the clicked item
                items[i].classList.add('Carousel-item--selected');
                buttons[i].classList.add('Carousel-btn--selected');
            });
        });

        //set initial state
        items[0].classList.add('Carousel-item--selected');
        buttons[0].classList.add('Carousel-btn--selected');
    }

    function displayDescription(Title, Description, Tools, Git, Demo)
    {
        var html = "<div id='project-info' class='Description'>" //Project Description Section
        html += "<h1>" + Title + "</h1>"
        html += "<p>" + Description + "</p>"
        html += " <ul>" // Tools Section
        for(var i = 0; i < Tools.length; i++)
        {
            html += "<li>" + Tools[i] + "</li>"
        }
        html += "</ul>" //End of Tools Section
        html += "<a href='"+ Git +"'>Github</a>"
        html += "<a href='"+ Demo +"'>Live Demo</a>"
        html += "</div>" //End of Project Description Section

        return html;

    }

    function displayImages(Image)
    {
        var html = "<div id='project-pic' class='Carousel'>" // Image Section
        for(var j = 0; j < Image.length; j++)
        {
            html += "<img src='" + Image[j] + "' class='Carousel-item' alt='Project "+ j +"' />"
        }
        
        html += "</div>" //End of Image Section

        return html;
    }

    function makeProjects()
    {
        $.getJSON("./projects.json", function(data)
        {
            for(var i = 0; i < data.projects.length; i++)
            {
                var project = data.projects[i];

                var html = `<div id="Project-${i}" class="Project">`;

                html += displayDescription(project.title, project.description, project.tools, project.git, project.demo);

                html += displayImages(project.image);

                html += "</div>"; //End of Project Card

                $("#Projects").append(html); //Append to Projects Section
                
                const carousel = document.querySelector(`#Project-${i} .Carousel`);
                makeCarousel(carousel);
            }
        });
    }

    function downloadResume(event) {
        event.preventDefault();
        var resumeUrl = event.target.href;
        window.location.href = resumeUrl;
    }

   
  
      
    displayStats();
    displayIntrests() 
    makeProjects();
    

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