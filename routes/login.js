var express = require('express');
var yser = require('../models/User')
var router = express.Router();


router.get('/', function(req, res, err){
	res.render('login');
});

router.get('/login', function(req, res, err){
	res.render('index');
});


router.post('/', function(req, res, err){
	res.render('index');

});


module.exports = router;
