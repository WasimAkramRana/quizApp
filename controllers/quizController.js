var express                   = require('express');
var app                       = express();
var config                    = require('../configs/index.json');
var async                     = require('async');
var questionSchema            = require('../models/qustionModel');
var questionModel             = new questionSchema();

/**
* This function is used for to get quiz questions from questions model
*/
module.exports.getQuizQuestions = function(req, res, next) {
  async.series([
    function(next) {
      questionModel.getQuestions(req, res, next);
    },
    function(next) {
      res.status(200).json(req.questionList);
    }
  ],
  function(err, results) {
    console.log(err);
  });
}

/**
* This function is used for to submit quiz questions
*/
module.exports.qizeSubmit = function(req, res, next) {
  async.series([
    function(next) {
      questionModel.getQuestions(req, res, next);
    },
    function(next) {
      calculateResult(req, res, next);
    },
    function(next) {
      res.json({success: {code:'quizeResult', message:'You got ' +  req.result + ' marks out of ' + req.body.userData.length}});
    },
  ],
  function(err, results) {
    console.log(err);
  });
}

/**
* This function is used for to vrify and calculate correct answers
*/
function calculateResult(req, res, next) {
  try {
    var counter = 0;
    var userAnswers = req.body.userData;
    let quizDetails = req.questionList.map(function(obj) {
      return obj._doc;
    });

    for(var i=0; i<userAnswers.length; i++) {
      for(var j=0; j<quizDetails.length; j++) {
        if(userAnswers[i].questionID === quizDetails[j].questionID && userAnswers[i].answer === quizDetails[j].answer) {
          counter++;
          break;
        }
      }
    }
    req.result = counter;
    next();
  } catch(err) {
    res.status(409).json(err);
  }
}
