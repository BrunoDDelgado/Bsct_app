# Bsct_app

BSCTAPP

This webapp is a simple meal and food tracker. 

It allows users to search for food data, like calories, macronutrients, and 
micronutrient information, either by food brand or food in a more simple form.
It also allows users to build logs and track their meals and food consumption. 

The app displays a daily total for calories and macros.
nutrient information, as well as meal-by-meal logs of the same data,
with the foods consumed and their corresponding amounts.

The app uses a structure similar to a three-tier architecture. 
In the backend/business logic layer, it retrieves food data from the FoodData Central (FDC) API, performs calculations on this data, based on user inputs for the foods and amounts consumed. 
It also combines the data retrieved and the data the user already logged, meaning the meals the user is already tracking, also get used in those calculations. 
All of this data is then served to the frontend/user interface.
It uses Python and Flask to handle the routes for the app's main functionality and it tracks data through the user's session.

The database/data layer currently uses the FDC Database.
Despite some of its limitations, it was selected for this project because: 

- It uses a RESTful API architecture,
allowing the app's server to request, and retrieve, the necessary food data, which can then be manipulated according to the user's needs.

- It contains a large quantity of food data, with a lot of detail and its
generally regarded as trusted and accurate.

- It is also open source, which is ideal for this small project.

The frontend/user interface is built with HTML and CSS in a flexbox design style 
to enhance responsiveness across different screens.
It uses javascript to make it a dynamic experience, handling user inputs, routing them to the backend and updating the user interface.

The app is hosted on the DigitalOcean platform, it allows me to continuously
add functionality to it, and improve it. It's deployed using Docker and uses 
a domain i own.

Relevant links:
- Web App – [bsctapp.com](http://bsctapp.com/)
- Food Data Central - [www.usda.gov](https://www.usda.gov/)
- Database Api - [fdc.nal.usda.gov/api-guide.html](https://fdc.nal.usda.gov/api-guide.html)


