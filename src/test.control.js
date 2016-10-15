var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var bodyParser = require('body-parser');

var stringify = require('node-stringify');
var _ = require('lodash');


var distanceTime = require("./distance_time");
import Router from './router';


var routerb = new Router();


var test = function(data) {
        console.log("log from function" + data);
    },
    convertToPlace = function(pid) {
        return routerb.getPlaceDetails(pid).name;
    },
    convertToBus = function(bid) {
        var temp = routerb.getRouteDetails(bid);
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



router.get('/lol', function(req, res) {
    return res.json("chamath");
});

router.post('/lol2', function(req, res) {
    console.log(req.body.id);
    return res.json("chamath");
});

router.get('/lol3', function(req, res) {
    return res.json("chamath");
});


router.post('/getRoute', function(req, res) {
    var from = req.body.from;
    var to = req.body.to;

    var rawResult = routerb.findRoutes(parseInt(from), parseInt(to));
    var FinalResult = _.map(rawResult, convertToReadabelJson);
    return res.json(FinalResult);
});

router.post('/getPlaceByCoordinate', function(req, res) {
    var lat = req.body.lat;
    var lon = req.body.lon;
    // 6.89999, 79.8555

    console.log("Test . . . 1");
    var FinalResult = routerb.getNearestPlace(lat,lon);
    return res.json(FinalResult);
});

router.post('/getPlaceByName', function(req, res) {
    var place = req.body.place;
    console.log("Test . . . 2");

    var FinalResult = routerb.getPlaceNumber(place);
    return res.json(FinalResult);
});


module.exports = router;
