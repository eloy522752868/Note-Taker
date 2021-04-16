/*Edited: Eloy Gonzalez
  Edited: 04/14/2021
I created the routes for API and Sites on the server.js file.
I was going then create the data route folder/files but deiced to leave it on the server.js for the purpose of this homework it should not impact me, Do to it meets the requested requirements .. Egon 04/12/2021
**UPDATE** I discussing with TA and are instructor I decided to add create the route folder and file to make sure get all credit and make sure considered I missing a requirement. Egon 04/16/2021

DEPENDENCIES
 LOAD DATA
// We are linking our routes to a series of "data" sources.*/
const data = require("../db/db.json");
const fs = require("fs");
//array I used to work with json file
let NoteArray = [];
NoteArray = data;

module.exports = (app) => {
  // ROUTER
  // The below points our server to a series of "route" files.
  // These routes give our server a "map" of how to respond when note taker add/delete note's

  // API GET/POST/DELETE
  // Below code handles when a user submits a form and thus submits data to the server.

  // ---------------------------------------------------------------------------

  //GET/api/notes should read the db.json file and return all saved notes as JSON.
  app.get("/api/notes", (req, res) => res.json(NoteArray));

  //POST /api/notes should receive a new note to save on the request body,
  //add it to the db.json file, and then return the new note to the client.
  app.post("/api/notes", (req, res) => {
    NoteArray.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(NoteArray), function (err) {
      if (err) {
        console.error("Error sorry");
      }
    });
    res.json(true);
  });

  //DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete
  //a note, you'll need to read all notes from the db.json file, remove the note with the given id property,
  // and then rewrite the notes to the db.json file.
  app.delete("/api/notes/:id", (req, res) => {
    const chosen = Number(req.params.id);
    for (var i = 0; i < NoteArray.length; i++) {
      if (NoteArray[i].id === chosen) {
        NoteArray.splice(i, 1);
      }
    }
    fs.writeFile(
      "./db/db.json",

      JSON.stringify(NoteArray),

      function (err) {
        if (err) {
          console.error("Error sorry");
        }
      }
    );
    res.json(true);
  });
};
