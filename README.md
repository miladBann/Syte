# Syte
Hello!! thank you for this opportunity and for the fun challenge :) this is my take on the assignment:  

Developer: Milad Bannourah  
Date: 10/11/2024  
topic: Full-stack catalog management app  
tech stack: React, Nest.js, MySQL (with TypeScript)
========================================================================

**Notes about the app**  
1- the app is fully responsive for wide screens but mobile view wasn't implemented since I had a very short period to work on the app.  
2- the app doesn't have a login system since the task didn't require it, so in the frontend we are fetching the data related to the user with an id of 1, however, the backend is already setup to handle multiple users, it's just not implemented in the fronted since it's not a part of the task.

**running the app**  
1- please download the folders or clone the repo.  
2- navigate to the client folder in your terminal and run the command "npm install" to download all dependencies.  
3- navigate to the server folder then catalog-management folder in your terminal and again run "npm install".  
4- in your terminal that is navigated to the client folder run "npm start" to run the frontend app.  
5- in your terminal that is navigated to the catalog-management folder run "npm run start:dev" to start the backend server.  
6- inside the provided DB folder you have the files needed to create a clone of the database that i used to build this app using MySQL. just import the files into MySQL workbench and it will create the schema and tables for you, make sure to select the new schema as default, and in the server folder you can change the connection properties according to your own setup in the.env file inside the root of the folder catalog-management in the server folder 
7- extra tests weren't written to save time however, the test environment is already setup and ready to add tests in the future with jest.  
8- enjoy managing your catalogs.
