"use strict";

var ObjectID = require('mongodb').ObjectID; // this is for my like button
// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function () {
        callback(null, true);
      });
    },

    likeTweet: function (id) {
      db.collection('tweets').update({
        '_id': ObjectID(id) // identify by id
      }, {
        $set: { // update/create likes key value pair
          likes: 1
        }
      }, {
        w: 1 // I don't understand this ?? what is this for
      }, function (err, result) {
        // console.log(result);
      })
    },


    // should use something like above
    // we need to insert a new property into our database 
    // we need to match the id of the tweet and then set a like key in our 
    // tweet{like: 1;} with a value of 1 and if the like already exists 
    // just += 1 to the like value. 
    //   db.collection().insertOne(here we should insert a new like) {


    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

  }
}