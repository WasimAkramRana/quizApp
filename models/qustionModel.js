var mongoose = require('mongoose');
var config   = require('../configs/index.json');
var db       = mongoose.createConnection(config.dbURI);
var schema   = mongoose.Schema({
  question   : String,
  questionID : Number,
  options    : [],
  answer     : String
});

/**
* This model method is use for to retrive the quiz questios
**/
schema.methods.getQuestions = function getQuestions(req, res, next) {
  questions.find({}, function(err, response) {
    if(response) {
      req.questionList = response;
      next();
    } else {
      res.status(204).json()
    }
  });
}

var questions  = db.model('questions', schema);
module.exports = questions;
