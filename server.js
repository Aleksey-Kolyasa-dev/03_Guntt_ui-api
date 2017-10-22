// SUCCESS BUILD
// Dependencies
var express = require('express');
var path = require('path');
//var bodyParser = require('body-parser');

// Express
var app = express();
// Server
app.set('port', (process.env.PORT || 5000));
app.listen(process.env.PORT || 5000);
console.log('App is running on port 5000');

// Express cont
//app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json());

// view engine setup
app.engine('html', require('ejs').renderFile); // npm i ejs --save
app.set('view engine', 'html');

// Routes
app.use('/', require('./router'));
app.use(express.static(path.join(__dirname, './views')));

