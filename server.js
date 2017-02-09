/**
 * Created by vhn on 06/02/2017.
 */

var express     = require('express');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var path        = require('path');
var mongoose    = require('mongoose');

var config      = require('./config');

var app         = express();

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// Connect to DB
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// API Routes
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

/********************************************
*             START SERVER                  *
******************************************* */

app.listen(config.port);
console.log('Listening on port ' + config.port);