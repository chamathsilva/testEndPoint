var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var session      = require('express-session');
var path = require('path');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// app.use(bodyParser());
// app.use(bodyParser.json());

app.use(bodyParser.json()); 						// support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodie


app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
});

app.use('/upload', require('./test.control'));

app.listen('8080', function(){
    console.log('running on 8080 lol ...');
});
