// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var path = require("path");
var friendData = require("../data/friends");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  //   app.get("/api/waitlist", function(req, res) {
  //     res.json(waitListData);
  //   });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // console.log("HERE:"+JSON.stringify(req.body));
    // console.log(friendData);

    var userInput = req.body;
    var matchName = '';
    var matchPicture = '';
    var startCompare = 50
    for (var i = 0; i < friendData.length; i++) {

      var friendly = 0;
			for (var j = 0; j < userInput.scores.length; j++) {
        // console.log(userInput.scores[j]);
        // console.log(friendData[i].scores[j]);
				friendly += Math.abs(friendData[i].scores[j] - userInput.scores[j]);
      }
      // console.log(friendly);
      if (friendly < startCompare) {
				// console.log('Closest match found = ' + friendly);
				// console.log('Friend name = ' + friendData[i].name);
				// console.log('Friend image = ' + friendData[i].photo);
				startCompare = friendly;
				matchName = friendData[i].name;
				matchPicture = friendData[i].photo;
			}
    }
    friendData.push(userInput);
		res.json({status: true, matchName: matchName, matchPicture: matchPicture});
    // console.log("little confused here: "+JSON.stringify(res.body));

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendData
      .length = [];
    waitListData.length = [];

    res.json({
      staus: true
    });
  });
};