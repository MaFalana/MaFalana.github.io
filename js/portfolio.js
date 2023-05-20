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
    const projects = [];

    class project
    {
        constructor(title, description, image, tools, git, demo)
        {
            this.title = title;
            this.description = description;
            this.image = image;
            this.tools = tools
            this.git = git;
            this.demo = demo;
            projects.push(this);
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
        for(var i = 0; i < projects.length; i++)
        {
            var project = projects[i];

            var html = `<div id="Project-${i}" class="Project">`;

            html += displayDescription(project.title, project.description, project.tools, project.git, project.demo);

            html += displayImages(project.image);

            html += "</div>" //End of Project Card

            

            $("#Projects").append(html); //Append to Projects Section
            
            const carousel = document.querySelector(`#Project-${i} .Carousel`);
            makeCarousel(carousel);
        }
    }


    
  
      
      

    const p0 = new project("Test","Filler words",["images/1.png","images/4.png","images/5.png"],["Swift","SQL","API"], "");
    const p1 = new project("LEDGERº","Open source manga reading application for IOS/iPadOS",["images/project-1.png"],["Swift","OOP","Core Data","Xcode","API","Web Scraping"], "https://github.com/MaFalana/LEDGER-","https://testflight.apple.com/join/947cRtnp");
    const p2 = new project("CS Paint","A simple drawing application",["images/project-5.png"],["Java","GUI","Serialization","Object Oriented Programming"], "https://github.com/MaFalana/CS-Paint","");
    const p3 = new project("What's That Color","A color scaninng app",["images/project-5.png"],["Swift","Mobile Development","OOP"], "https://github.com/MaFalana/What-s-That-Color-", "");
    const p4 = new project("Kazaam","Multimedia scanning application",["images/project-5.png"],["Swift","API","SOLID Principles","OOP"], "https://github.com/MaFalana/Kazaam","");
    const p5 = new project("Mahjong CS","A simple Mahjong game",["images/project-5.png"],["C++","ReactJs","GUI","SOLID Principles","Abstract Data Types","Server","OOP"], "https://github.com/MaFalana/Mahjong-CS", "https://mafalana.github.io/Mahjong/");
    const p6 = new project("Mytunes","Server-side music streaming application",["images/a.png","images/b.png","images/c.png"],["Php","Html","CSS","API","OOP"], "https://github.com/MaFalana/Mytunes","https://mafalana.github.io/Mytunes/");
    makeProjects();
    

    

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