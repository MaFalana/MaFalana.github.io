/**************************************
TITLE: index.js							
AUTHOR: Malik Falana (MF)			
CREATE DATE: 08/18/2024	
PURPOSE: To use jquery and functions for portfolio page
LAST MODIFIED ON: 08/18/2024	
LAST MODIFIED BY: Malik Falana (MF)
MODIFICATION HISTORY:
08/18/2024: Original Build
***************************************/


$(document).ready(function() 
{
    function displayProjects()
    {
        const url = "../projects.json";

        $.getJSON(url, function(data) // Grabs Projects from JSON file
        {
            for(var i = 0; i < data.projects.length; i++)
            {
                createProject(data.projects[i]); //assigns variable from json data
            }
        });
    }


    function createProject(source)
    {
        var html = `<div class="card" style="width: 18.75rem;">`;
        html += `<img src=${source.image} class="card-img-top" alt="Project ${source.id}"/>`;
        html += `<div class="card-body">`;
        html += `<h5 class="card-title">${source.title}</h5>`;
        html += `<h6 class="card-subtitle mb-2 text-body-secondary">Subtitle</h6>`;
        html += `<p class="card-text">${source.description}</p>`;

        html += `<ul class="list-group list-group-flush">`;
        for(var i = 0; i < source.tools.length; i++)
        {
            html += `<li class="list-group-item">${source.tools[i]}</li>`; //assigns variable from json data
        }
        html += `</ul>`;

        html += `<a href=${source.git} class="card-link" title="View Source Code"></a>`;
        html += `<a href=${source.demo} class="card-link" title="View Demo"></a>`;
        html += `</div>`;
        html += `</div>`;

        $("section div h2#Projects div.Projects").append(html); //Append to Projects Section
    }

    

    displayProjects();

});  // end of $(document).ready()