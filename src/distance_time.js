
/* API Key to access the distance matrix API */
var apiKey = 'AIzaSyB7Rfs9vhKZ64ac6a-OmQGgGHxGviWyWW0';

module.exports = {

  /* Function to calculate distance and time between two given nodes */
  find: function (location,returnData) {
    var dist = 0;
    var time = 0;

    var loc_string = "";

    /* Construct the url for the particular API call*/
    for (var i in location){

      if (i == 0){
        loc_string = location[i].lat + "," + location[i].lon;    }

      else{
        loc_string = loc_string + "|" + location[i].lat + "," + location[i].lon;
      }
    }
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + loc_string + "&destinations=" + loc_string + "&key=" + apiKey;


    var requestify = require('requestify');

    /* Call upon the url to get the distances and times between all given points asynchronously */
    requestify.get(url)
      .then(function(response) {

          // Get the response body (JSON parsed or jQuery object for XMLs)
          var result = response.getBody();


          /* Calculate the distance and time between the first and last point */
          for (var i = 0; i < result.rows.length - 1; i++){

            dist += result.rows[i].elements[i+1].distance.value;
            time += result.rows[i].elements[i+1].duration.value;

          }
          console.log("URL" + url);
          console.log("dist"+ dist);
          console.log("time"+ time);
          console.log("\n\n\n\n\n");
          returnData([{dist:dist/1000,time:time/60}]);
      }
    );
    //return [{dist:dist/1000,time:time/60}];
  }
};
