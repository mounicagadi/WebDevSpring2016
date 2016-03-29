var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://127.0.0.1:27017/assignment');



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());//for parsing multipart/form-data


app.use(cookieParser())
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'my project'
}));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, uuid, db, mongoose);
require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);