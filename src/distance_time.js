
/* API Key to access the distance matrix API */
var apiKey = 'AIzaSyDUBe3lL1AIDY9bc_dbrq2TD23yX_xzMYA';


module.exports = {

  /* Function to calculate distance and time between two given nodes */
  find: function (location,returnData) {


    var loc_start = "";
    var loc_end = "";

    var requestify = require('requestify');

    var promise = require('promise');

    var callArray = [];

    for (var i = 0; i < location.length - 1; i++){
      loc_start = location[i].lat + "," + location[i].lon;    
      loc_end = location[i+1].lat + "," + location[i+1].lon;

      var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + loc_start + "&destinations=" + loc_end + "&key=" + apiKey;

      for (var j = 0 ; j < 5 ;j++){
        var command = requestify.get(url).then(function(response) {
        //console.log(response.body);
        return response.body;
        });
        callArray.push(command);
      }

    }
  
  //return "Hello";

  //setTimeout(return "hello", 3000);

  var finalp = promise.all(callArray);

    return finalp.then(function(values){ 


      var dist = 0;
      var time = 0;

      var out = JSON.parse(values[0]);

      console.log("+!+!+!+!+!+!" + i + values);

      for (var i in values){

        var out = JSON.parse(values[i]);



        
        dist += out.rows[0].elements[0].distance.value;
        time += out.rows[0].elements[0].duration.value;
      }

      //console.log("time here " + dist);
      returnData([{dist:dist/1000,time:time/60}]);
      //return "########";
    }); 
  }
}