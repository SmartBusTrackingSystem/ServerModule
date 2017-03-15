var express = require('express');
var User = require('../models/User');
var router = express.Router();


router.get('/', function(req, res, err){
	console.log("/");

});

router.get('/login', function(req, res, err){
	console.log("/login");
	
});


router.get('/authentication', function(req, res, err){
	console.log("authentication");
});

module.exports = router;
