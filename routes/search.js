var express = require('express');
var tokenUtil = require('../utils/tokenUtil');
var googleApiController = require('../controllers/googleMapsController');
var router = express.Router();

router.get('/getBusesNearMe', function (req, res, next) {
    googleApiController.getGoogleMapResult("431 el camino real, santa clara, ca", "San jose state university", function (result) {
        console.log(result)
        res.json({message: "check console in server"});
    })
});

module.exports = router;