var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());//for parsing multipart/form-data

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);