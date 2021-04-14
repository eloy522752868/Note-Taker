// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
const data = require('./db/db.json');
const express = require('express');
const path = require('path');
const fs = require('fs');


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
console.log(data);
NoteArray = data;
console.log(NoteArray);


  // ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

app.get('/api/notes', (req, res) => res.json(NoteArray));



// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
// (ex. User fills out a reservation request... this data is then sent to the server...
// Then the server saves the data to the tableData array)
// ---------------------------------------------------------------------------

app.post('/api/notes', (req, res) => {
  // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  // It will do this by sending out the value "true" have a table
  // req.body is available since we're using the body parsing middleware
 // if (tableArray.length < 5) {
    NoteArray.push(req.body);
    data.push(req.body);
    txt = JSON.stringify(data);  //reserialize to JSON
    fs.writeFile(

        './db/db.json',
    
        JSON.stringify(NoteArray),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );
    res.json(true);
 // } else {
 //   waitingArray.push(req.body);
   // res.json(false);
  //}
});

// I added this below code so you could clear out the table while working with the functionality.
// Don"t worry about it!

app.post('/api/clear', (req, res) => {
  // Empty out the arrays of data
  tableArray.length = 0;
  waitingArray.length = 0;

  res.json({ ok: true });
});

// ROUTING

  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  app.use(express.static(__dirname + '/public'));

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  // If no matching route is found default to home
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));