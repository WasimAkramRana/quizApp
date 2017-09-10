var express       = require('express');
var app           = express();
var router        = express.Router();
var quizCtrl      = require('../controllers/quizController');

router.get('/questions',     quizCtrl.getQuizQuestions);
router.post('/form/submit',  quizCtrl.qizeSubmit);

module.exports = router;
