/*Edited Eloy Gonzalez
//Edited 04/14/2021
//I created the routes for API and Sites on the server.js file.
I was going then create the data route folder/files but deiced to leave it on the server.js for the purpose of
 this homework it should not impact me, Do to it meets the requested requirements .. Egon 04/13/2021
**UPDATE** I discussing with TA and are instructor I decided to add create the route folder and file to make sure get all credit
 and make sure considered I missing a requirement. Egon 04/16/2021

DEPENDENCIES
 Series of npm packages that we will use to give our server useful functionality*/
const express = require("express");
const path = require("path");
//array I used to work with json file

// EXPRESS CONFIGURATION  
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// API Routes(detail on files)
require("./routes/apiRoutes")(app);
// HTML Routes(detail on files)
require("./routes/htmlRoutes")(app);


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
