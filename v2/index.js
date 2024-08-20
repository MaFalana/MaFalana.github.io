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
      var html = `<div class="col">`;
        html += `<div class="card shadow   mw-200 h-100 " style="width: 18.75rem;">`;
        html += `<img src=${source.image} class="card-img-top img-fluid" alt="Project ${source.id}" height="300"/>`;
        html += `<div class="card-body" style="overflow: hidden;">`;
        html += `<h5 class="card-title">${source.title}</h5>`;
        html += `<h6 class="card-subtitle mb-2 text-body-secondary">${source.subtitle}</h6>`;
        html += `<p class="card-text">${source.description}</p>`;

        html += `<ul class="list-group list-group-horizontal ">`;
        for(var i = 0; i < source.tools.length; i++)
        {
            //html += `<li class="list-group-item">${source.tools[i]}</li>`; //assigns variable from json data
            html += `<img src=../images/${source.tools[i]}.svg alt="${source.tools[i]} Svg Icon" width="40"/>`;
        }
        html += `</ul>`;

        html += `<a class="btn btn-primary" href=${source.git} role="button">View Source Code</a>`;
        html += `<a class="btn btn-primary" href=${source.demo} role="button">View Demo</a>`;
        
        html += `</div>`;
        
        html += `</div>`;
        html += `</div>`;

        $("div.Projects").append(html); //Append to Projects Section
    }

    function displayInterests()
    {
        const activity = ["Reading", "Watching", "Music", "Gaming", "Learning"]
        
        for(var i = 0; i < activity.length; i++)
        {
          //const url = `http://127.0.0.1:5000/${activity[i]}`;
          const url = `https://portfolio-server-omega-gray.vercel.app/${activity[i]}`

          $.getJSON(url, function(data) // Grabs Projects from JSON file
          {
              createInterest(data);
          });
        } 
    }

    function createInterest(source)
    {
      var html = `<div class="col-md-3">`;
        html += `<div class="card shadow" style="width: 18.75rem;">`;
        
        html += `<img src=${source.image} class="card-img-top img-fluid" alt="Interest ${source.id} height="200" width="200"/>`;
        html += `<div class="card-body">`;
        html += `<h5 class="card-title">${source.title}</h5>`;
        html += `<h6 class="card-subtitle mb-2 text-body-secondary">Subtitle</h6>`;
        html += `<p class="card-text">${source.description}</p>`;
        html += `</div>`;
        html += `</div>`;
        html += `</div>`;


      

        $("div.Interests").append(html); //Append to Interests Section
    }
    
    function toggleDarkMode() {
        'use strict';
      
        const getStoredTheme = () => localStorage.getItem('theme');
        const setStoredTheme = theme => localStorage.setItem('theme', theme);
      
        const getPreferredTheme = () => {
          const storedTheme = getStoredTheme();
          if (storedTheme) {
            return storedTheme;
          }
      
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        };
      
        const setTheme = theme => {
          if (theme === 'auto') {
            $('html').attr('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          } else {
            $('html').attr('data-bs-theme', theme);
          }
        };
      
        const showActiveTheme = (theme, focus = false) => {
          const $themeSwitcher = $('#bd-theme');
      
          if (!$themeSwitcher.length) {
            return;
          }
      
          const $themeSwitcherText = $('#bd-theme-text');
          const $activeThemeIcon = $('.theme-icon-active use');
          const $btnToActive = $(`[data-bs-theme-value="${theme}"]`);
          const svgOfActiveBtn = $btnToActive.find('svg use').attr('href');
      
          $('[data-bs-theme-value]').removeClass('active').attr('aria-pressed', 'false');
          $btnToActive.addClass('active').attr('aria-pressed', 'true');
          $activeThemeIcon.attr('href', svgOfActiveBtn);
          const themeSwitcherLabel = `${$themeSwitcherText.text()} (${$btnToActive.data('bs-theme-value')})`;
          $themeSwitcher.attr('aria-label', themeSwitcherLabel);
      
          if (focus) {
            $themeSwitcher.focus();
          }
        };
      
        const toggleTheme = () => {
          const currentTheme = getStoredTheme() || getPreferredTheme();
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          setStoredTheme(newTheme);
          setTheme(newTheme);
          showActiveTheme(newTheme);
        };
      
        // Initial theme setup
        setTheme(getPreferredTheme());
        showActiveTheme(getPreferredTheme());
      
        // Listen for changes in system color scheme preferences
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
          const storedTheme = getStoredTheme();
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
          }
        });
      
        // Handle theme switcher clicks
        $('[data-bs-theme-value]').on('click', function() {
          const theme = $(this).attr('data-bs-theme-value');
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme, true);
        });
      
        // Toggle theme when the function is called
        toggleTheme();
      }
      
    displayProjects();
    displayInterests();
    
    //toggleDarkMode();

    $("#darkModeToggle").click(toggleDarkMode)


});  // end of $(document).ready()