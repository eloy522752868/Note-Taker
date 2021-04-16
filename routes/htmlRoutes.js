/*Edited: Eloy Gonzalez
  Edited: 04/14/2021
I created the routes for Sites on the server.js file.
I was going then create the data route folder/files but deiced to leave it on the server.js for the purpose of this homework it should not impact me. Egon 04/12/2021
**UPDATE** I discussing with TA and are instructor I decided to add create the route folder and file to make sure get all credit
 and make sure considered I missing a requirement. Egon 04/16/2021

DEPENDENCIES
 Series of npm packages that we will use to give our server useful functionality*/

const path = require("path");
const express = require("express");

module.exports = (app) => {
  // ROUTING

  // => HTML GET Requests
  // Below code handles when users "visit" a page takes you to the main page index.html and notes.html.
  // In each of the below cases the user is shown an HTML page of content
  // pages are index.html and notes.html

  //Had to add this piece of code to get it to work with CSS / Js file. Could find directory when running node server
  app.use(express.static(path.resolve("./public")));

  //view,add, delete notes site
  app.get("/notes", (req, res) => {
    res.sendFile(path.resolve("./public/notes.html"));
  });

  /* If no matching route is found default to home
     GET * should return the index.html file.
     main page of notes taker */
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
  });
};
