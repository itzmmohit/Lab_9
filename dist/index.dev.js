"use strict";

var fs = require('fs');

var path = require('path');

var express = require('express');

var app = express();

var cors = require('cors');

var bodyParser = require('body-parser');

var port = 3000;
var hostname = 'localhost';
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var corsOptions = {
  origin: '*',
  methods: "GET",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use(express["static"](path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/data', cors(corsOptions), function (req, res) {
  fs.readFile('data.json', function (err, data) {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.write(data);
    res.end();
  });
});
app.post('/new', cors(corsOptions), function (req, res) {
  fs.writeFile('data.json', JSON.stringify(req.body), function (err) {
    var resp = '';

    if (err) {
      resp = 'Error writing file' + err;
    } else {
      resp = 'Successfully wrote file';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  });
});
app.get('/*', function (req, res) {
  res.status(404);
  res.end("<h1>404 Error</h1>");
});
app.listen(port, hostname, function () {
  console.log("App listening at http://".concat(hostname, ":").concat(port));
});