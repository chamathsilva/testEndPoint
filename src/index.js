

var stringify = require('node-stringify');
var _ = require('lodash');
import Router from './router';

var distanceTime = require("./distance_time");

var router = new Router();
//var testRought = router.findRoutes(33, 238);
//var testRought = router.findRoutes(35, 238);
var testRought = router.findRoutes(100, 238);
//var testRought = router.findRoutes(1, 10);

var test = function(data) {
        console.log("log from function" + data);
    },
    convertToPlace = function(pid) {
        return router.getPlaceDetails(pid).name;
    },
    convertToBus = function(bid) {
        var temp = router.getRouteDetails(bid);
        return temp.routeno + "(" + temp.from + "-" + temp.to + ")";
    },
    convertToKm = function(distance) {
        return (distance / 1000).toFixed(2) + "Km";
    },
    convertSubRouteRedable = function(value2) {
        var subRoute = {};
        subRoute.buses = _.map(value2.routes, convertToBus);
        subRoute.subDistances = convertToKm(value2.distance);
        subRoute.from = convertToPlace(value2.from);
        subRoute.to = convertToPlace(value2.to);
        subRoute.innerBusStops = value2.innerBusStops;
        // distanceTime.find(value2.innerBusStops,function(location){
        //   // console.log(stringify(value2.innerBusStops));
        //   // console.log(+"test -- >",location);
        //   // console.log("\n\n\n\n\n");
        //   ubRoute.timeData = location;
        //})

        return subRoute;
    },
    convertToReadabelJson = function(value) {
        var returnArray = {};
        returnArray.from = convertToPlace(value.from);
        returnArray.to = convertToPlace(value.to);
        returnArray.totalDistance = convertToKm(value.distance);
        returnArray.changePoints = _.map(value.changes, convertToPlace);
        returnArray.subRouts = _.map(value.routes, convertSubRouteRedable);
        return returnArray;
    };



//console.log("Test\n\n\n\n");
var temp2 = _.map(testRought, convertToReadabelJson);
console.log(stringify(temp2[0]));


//var location = [({'name':'Borella','lat':6.91474,'lon':79.8776}), ({'name':'Horton Place - Baseline Junction','lat':6.91126,'lon':79.8775}),({'name':'Borella Cemetery Junction','lat':6.90859,'lon':79.8773}),({'name':'Sarana Road','lat':6.90558,'lon':79.8735}),({'name':'Maitland Place','lat':6.9029,'lon':79.8705}),({'name':'Campus (Arts Faculty)','lat':6.90258,'lon':79.8622}),({'name':'Thunmulla','lat':6.89619,'lon':79.8603})];

//find(location);

// distanceTime.find(location,function(location){
//   console.log("test -- >",location); // this is where you get the return value
// });

//console.log(router.getPlaceNumber("Lotus Road"));
//console.log(router.getNearestPlace(6.89999, 79.8555));
