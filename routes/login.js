var express = require('express');
var yser = requie('User')
var router = express.Router();


router.get('/', function(req, res, err){
	res.render('login');
});
module.exports = router;

router.get('/login', function(req, res, err){


});