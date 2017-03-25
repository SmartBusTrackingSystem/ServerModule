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

router.post('/authentication', function(req, res, err){
	console.log("Inside authentication api ");
	console.log("Request paramter user"+req.body.user);
	console.log("Request paramter password"+req.body.password);
	User.find({username:req.body.user,password:req.body.password}, function(err, users) {
 	 if (err) throw err;


if(users==null||users.length==0)
{
	console.log("Invalid");
	var json_res={"status":"Invalid"};
	res.send(json_res);
}

else
{
	console.log("Valid");
	
  	console.log(users);
	var json_res={"status":"Valid"};
	res.send(json_res);
}
  	// object of all the users
	});
// Calling via mongoose.js

	// findUser(req.body.user,req.body.password);
	//res.render('index');


});

router.get('/userProfile',function(req, res, err){
	console.log("you are at /userProfule");
	res.render('index',{title: 'Express'});
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
