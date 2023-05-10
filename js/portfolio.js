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
        constructor(title, description, image, tools, link)
        {
            this.title = title;
            this.description = description;
            this.image = image;
            this.tools = tools
            this.link = link;
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

    function makeProjects()
    {
        for(var i = 0; i < projects.length; i++)
        {
            var project = projects[i];

            var html = `<div id="Project-${i}" class="Project">`;

            
            html += "<div id='project-info' class='Description'>" //Project Description Section

            
            html += "<h3>" + project.title + "</h3>"
            html += "<p>" + project.description + "</p>"

            
            html += " <ul>" // Tools Section

            for(var j = 0; j < project.tools.length; j++)
            {
                html += "<li>" + project.tools[j] + "</li>"
            }
            html += "</ul>" //End of Tools Section

            html += "</div>" //End of Project Description Section

            html += "<div id='project-pic' class='Carousel'>" // Image Section
            for(var j = 0; j < project.image.length; j++)
            {
                html += "<img src='" + project.image[j] + "' class='Carousel-item' alt='Project "+ j +"' />"
            }
            
            html += "</div>" //End of Image Section

            html += "<div class='History'>" // History Section
            html += "<iframe src='https://api.github.com/repos/MaFalana/LEDGER-/commits' title='description'></iframe>"
            html += "</div>" //End of History Section

            html += "</div>" //End of Project Card

            html += "<a href="+ project.link +" class='project-btn'>Try it out</a>"

            $("#Projects").append(html); //Append to Projects Section
            
            const carousel = document.querySelector(`#Project-${i} .Carousel`);
            makeCarousel(carousel);
        }
    }

    function displayProjects()
    {
        const projects = document.querySelectorAll('.Project');

        const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // when half of the element is visible
        };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('Project--visible');
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove('Project--visible');
    }
  });
}, options);

projects.forEach(project => {
  observer.observe(project);
});
    }

    const p0 = new project("Test","Filler words",["images/1.png","images/4.png","images/5.png"],["Swift","SQL","API"], "");
    const p1 = new project("LEDGERº","Open source manga reading application for IOS/iPadOS",["images/project-1.png"],["Swift","Database Design","Core Data","Xcode","API Connections","Web Scraping"], "https://testflight.apple.com/join/947cRtnp");
    const p2 = new project("CS Paint","A simple drawing application",["images/project-5.png"],["Java","GUI","Serialization","Object Oriented Programming"], "");
    const p3 = new project("What's That Color","A color scaninng app",["images/project-5.png"],["Swift","Mobile Development","OOP"], "");
    const p4 = new project("Kazaam","Multimedia scanning application",["images/project-5.png"],["Swift","API","SOLID Principles","OOP"], "");
    const p5 = new project("Mahjong CS","A simple Mahjong game",["images/project-5.png"],["C++","ReactJs","GUI","SOLID Principles","Abstract Data Types","Server","OOP"], "https://github.com/MaFalana/Mahjong-CS");
    makeProjects();
    displayProjects();

    


    


    

});  // end of $(document).ready()