"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var sassMiddleware = require('node-sass-middleware');
var path = require('path');

app.use(sassMiddleware({
  /* Options */
  src: path.join(__dirname, '../public/sass'),
  dest: path.join(__dirname, '../public/styles'),
  debug: true,
  outputStyle: 'compressed',
  prefix: '/styles' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

})