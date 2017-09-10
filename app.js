var express                   = require('express');
var app                       = express();
var apiRoutes                 = express.Router();
var cors                      = require('cors');
var mongoose                  = require('mongoose');
var bodyParser                = require('body-parser');
var config                    = require('./configs/index.json');
var questionModel             = require('./models/qustionModel');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

/**
* This block of code is defined for to enable cores
**/
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/v1/quiz',   require('./routes/quiz'));

/**
* This middleware is use for to define the error
**/
app.use(function(err, req, res, next) {
  console.error(err.stack);
   res.status(409).json({error: {message: 'error'}});
});

app.listen(config.app_port);
console.log("server are running on port: " + config.app_port);
