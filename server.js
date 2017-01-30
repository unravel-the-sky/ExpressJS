// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var Http = require('http');


// routes will go here
app.get('/api/users', function (req, res) {
    var user_id = req.param('id');
    var token = req.param('token');
    var geo = req.param('geo');

    res.send(user_id + ' ' + token + ' ' + geo);
});

// parameter middleware that will run before the next routes
app.param('name', function (req, res, next, name) {

    // check if the user with that name exists
    // do some validations
    // add -dude to the name
    var modified = name + '-dude';

    // save name to the request
    req.name = modified;

    next();
});

// http://localhost:8080/api/users/chris
app.get('/api/users/:name', function (req, res) {
    // the user was found and is available in req.user
    res.send('What is up ' + req.name + '!');
});

function getJsonFromData() {
    console.log("fetching data");

    var xmlHttp = new XMLHttpRequest();

    var urlToGet = 'http://localhost:5001/api/Petrel/GetGuid';
    var urlToGetOperations = 'http://localhost:5001/api/Petrel/GetOperations/5ad98d5a-38e8-40ae-9061-a09c88950bc9';

    xmlHttp.open("GET", urlToGetOperations, false); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(null);

    var jsonObject = JSON.parse(xmlHttp.responseText);
    // this.subscriptionDataFromServer.push(jsonObject);

    // var jsonObject = JSON.stringify(xmlHttp.responseText);
    console.log(jsonObject);

    console.log("fetching completed");
}


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

getJsonFromData();