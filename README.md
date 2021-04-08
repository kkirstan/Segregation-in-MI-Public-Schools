# Segregation in MI Public Schools (dashboard code)

Welcome to Segregation in MI Public Schools. The goal of this project was to take demographic and resource data on Michigan Schools and use it in interactives that show the degree to which our school system is racially segregated. Our project contains several components. The end product was a website that contains an api, which serves the data we collected and processed in the early stages of the project into three dashboard pages that allow the data to be interactively visualized. The finished product can be found at this address: https://robertodiazbriones.github.io/Proj2_dashboard/.

The present repository contains the code from the later stages of the project - this is where the actual code for the dashboard pages is contained. Each folder contains 
The files relavant to one component of the dashboard. The folders are explained below.

Files and Folders:

index.html - this file (i.e. the one you find directly in the repo) is the front page of the website that connects all the dashboards and the api together. 

API_FRONT_END - this folder only contains an index.html which serves as the front end of the api component of this project. For the full api go to this repository:
https://github.com/robertodiazbriones/Project_2

MI_DISTRICTS - contains code for a district level analysis of free and reduced lunch percentage by district as well as demographics, which reveals large disparities
in income distribution. 

MI_DISTRICTS/index.html - This file contains the html structure of the page.

MI_DISTRICTS/static/js/logic.js - This file is the main script that runs this part of the dashboard. 

MI_SCHOOLS  - Simiar to MI_districts, but this contains a school level analysis. 

MI_SCHOOLS/index.html - This file contains the html structure of the page.

MI_SCHOOLS/static/js/logic.js - This file is the main script that runs this part of the dashboard. 

MI_DISTRICTS_DEMO - Contains code for a demographic view of the school districts of Michigan. These are displayed using a pie chart as well as geoplotted on a map.

MI_DISTRICTS_DEMO/index.html - This file contains the html structure of the page.

MI_DISTRICTS_DEMO/static/js/logic.js - This file is the main script that runs this part of the dashboard. 
