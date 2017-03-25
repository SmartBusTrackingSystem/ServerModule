var express = require('express');
var User = require('../models/User');
var router = express.Router();

/*
endpont : https://localhost:3000/api/login/
*/
router.get('/', function(req, res, err){
	console.log("you are at /");
	res.render('login');
});


/*
endpont : https://localhost:3000/api/login/login
*/
router.get('/login', function(req, res, err){
	console.log("you are at /login");
	// res.render('index');
});

/*
endpont : https://localhost:3000/api/login/authentication.
*/

router.get('/authentication', function(req, res, err){
	console.log("Inside authentication api ");
	res.render('index');
});


// router.post('/authentication', function(req, res, err){
// 	console.log("authentication POST request :: ", req.params("username","ddd"));

// 	User.find({}, function(err, users) {
//   if (err) throw err;

//   // object of all the users
//   console.log(users);
// });
// 	// res.render('index');
// });

router.get('/login/authentication', function(req, res, err){
	console.log("you are in login/authentication");
});

router.get('/api/login/authentication', function(req, res, err){
	console.log("you are in /authentication");
});

module.exports = router;
