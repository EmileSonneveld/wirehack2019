/** 
 * This file will set up our web server.
 * Type 'node server.js' to launch the application.
 * 
*/

//Install the HTTP module (allows us to use the protocol).
var http = require('http');

//Install the ejs module.
var express = require('express'); 
var router = express.Router();
var cors = require('cors');
router.use(cors());

//We are going to use express to launch our application
var app = express();


//Setup middleware for authentification & sessions.
var bodyParser = require('body-parser');
var session = require('express-session');

//Our web application will be running on localhost portnumber 8000
var port = process.env.PORT ||2000;
var path = require('path'); 
var passport = require('passport');
//Setup view.
app.set('view engine', 'ejs');

app.listen(port);
//Specify which static files we should use.
app.use('/img', express.static(path.join(__dirname, 'css/img')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(session({
  secret: 'stateofmindsunking',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


//This procedure will handle all the made requests.
require('./app/router.js')(app, passport);
console.log("Server is running on " + port);