var express                   = require('express');
var app                       = express();
var crypto                    = require('crypto');
var mongoose                  = require('mongoose');
var bodyParser                = require('body-parser');
var config                    = require('./configs/index.json');
var userModel                 = require('./models/user');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/**
* This block of code is defined for to enable cores
**/
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/status', function(req, res, next){
   res.json("application successfully runing")
})

app.post('/v1/users/register', function(req, res) {
	userModel.findOne({email:req.body.email}, function(err, response) {
    if(!response) {
      var randomString  = crypto.randomBytes(16).toString('hex');
      var password      = crypto.pbkdf2Sync(req.body.password, randomString, 1000, 64).toString('hex');
      var user          = new userModel();
      user.userName     = req.body.userName;
      user.name         = req.body.name;
      user.randomString = randomString;
      user.email        = req.body.email;
      user.password     = password;
      user.save(function(err, data) {
        if(err) {
          res.json(err);
        } else {
          res.json({success: {message:'User successfully registerd with us'}});
        }
      });
    } else {
      res.json({error: {message:'Email already register with us!!'}});
    }
  });
});

app.put('/v1/users/login', function(req, res){
	userModel.findOne({userName: req.body.userName}, {password:1, userName:1, salt:1}, function(err, response) {
		if(response) {
			let password  = crypto.pbkdf2Sync(req.body.password, response._doc.salt, 1000, 64).toString('hex');
			if(response._doc.password === password) {
				res.status(200).json({success: {message:'Valid User'}});
			} else {
				res.status(403).json({error: {message:'Invalid Creadential or Unauthorized user'}});
			}
		} else {
			res.status(409).json({success: {message:'User not registerd with US'}});
		}
	});
});


app.listen(config.app_port);
console.log("server are running on port: " + config.app_port);
