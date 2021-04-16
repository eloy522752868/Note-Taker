//Edited Eloy Gonzalez
//Edited 04/14/2021
//DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const data = require('./db/db.json');
const express = require('express');
const path = require('path');
const fs = require('fs');

//array I used to work with json file
let NoteArray = [];

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
NoteArray = data;

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.


// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

//GET/api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => res.json(NoteArray));

//POST /api/notes should receive a new note to save on the request body, 
//add it to the db.json file, and then return the new note to the client. 
//You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    NoteArray.push(req.body);
    fs.writeFile(
        './db/db.json',   
        JSON.stringify(NoteArray),   
        function (err) {
            if (err) {
                console.error('Error sorry');
            }
        }
    );
    res.json(true);
});

//DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete
//a note, you'll need to read all notes from the db.json file, remove the note with the given id property, 
// and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
  const chosen = Number(req.params.id);
  for( var i = 0; i < NoteArray.length; i++){ 
    if ( NoteArray[i].id === chosen) { 
       NoteArray.splice(i, 1); 
    }

}
    fs.writeFile(

      './db/db.json',

      JSON.stringify(NoteArray),

      function (err) {
          if (err) {
              console.error('Error sorry');
          }
      }
    );
    res.json(true);
});


// ROUTING

  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // pages are index.html and notes.html 

  //Had to add this piece of code to get it to work with CSS / Js file. Could find directory when running node server
  //GET /notes should return the notes.html file.
  app.use(express.static(__dirname + '/public'));

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // If no matching route is found default to home
  //GET * should return the index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));