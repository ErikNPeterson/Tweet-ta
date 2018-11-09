// "use strict";

// const MongoClient = require("mongodb").MongoClient;
// const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   // ==> We have a connection to the "test-tweets" db,
//   //     starting here.
//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   db.collection("tweets").find({}, (err, result) => {
//     // Lazy error handling:
//     if (err) throw err;

//     // ==> Fair warning: This is going to log a lot of stuff...


//     //STEP #1 access the data and find it's a Cursor and contains an object
//     // console.log("find result: ", result);
//     // console.log("type of find result: ", typeof result);

//     //STEP #2
//     // console.log("for each item yielded by the cursor:");
//     // result.each((err, item) => console.log("  ", item));

//     // STEP #3 results in array
//     result.toArray((err, resultsArray) => {
//       if (err) throw err;

//       console.log("results.toArray:", resultsArray);
//     });



//     // ==> In typical node-callback style, any program
//     //     logic that needs to use the connection needs
//     //     to be invoked from within here.
//     //
//     // Another way to say: this is an "entry point" for
//     // a database-connected application!

//     // ==> At the end, we close the connection:
//     db.close();
//   });

// });



"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  function getTweets(callback) {
    db.collection("tweets").find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
    });
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});