 var mongoose = require('mongoose');
 var User = require('../models/User');

var findUser =function (username,password){
	User.find({}, function(err, users) {
 	 if (err) throw err;

  	// object of all the users
  	console.log(users);
	});

	res.render('index');
}

module.exports = findUser;