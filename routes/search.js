var express = require('express');
var tokenUtil = require('../controllers/tokenController');
var googleApiController = require('../controllers/googleMapsController');
var searchController = require('../controllers/searchController');
var async = require('async');
var router = express.Router();

router.get('/getBusesNearMe', function (req, res, next) {
    googleApiController.getGoogleMapResult(req.query.source, req.query.destination, function (result) {
        if (result) {
            var busesResponse;
            var beaconInfo
            async.parallel([
                function (cb) {
                    searchController.search(result, function (buses) {
                        if (buses) {
                            busesResponse = buses;
                            cb(null);
                        } else {
                            cb(null);
                        }
                    })
                },
                function (cb) {
                    searchController.getBeaconInfo(result, function (beacon) {
                        beaconInfo = beacon;
                        cb(null);
                    })
                }
            ], function (err) {
                if (err) return next(err);
                res.json({
                    "result": {
                        buses: busesResponse,
                        route: result.steps,
                        beaconInfo : beaconInfo
                    }

                });
            });
        }

    })
});

module.exports = router;