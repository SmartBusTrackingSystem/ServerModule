var express = require('express');
var tokenUtil = require('../controllers/tokenController');
var googleApiController = require('../controllers/googleMapsController');
var searchController = require('../controllers/searchController');
var async = require('async');
var router = express.Router();

router.get('/getBusesNearMe', function (req, res, next) {
    googleApiController.getGoogleMapResult(req.query.source, req.query.destination, function (buslist) {
        if (buslist) {
            var busesResponse = [];
            var beaconInfo = [];

            async.forEach(buslist, function(bus, callback) {
                var busesRes;
                var beaconRes;
                async.parallel([
                    function (cb) {
                        searchController.search(bus, function (buses) {
                            if (buses) {
                                busesRes = buses;
                                cb(null);
                            } else {
                                cb(null);
                            }
                        })
                    },
                    function (cb) {
                        searchController.getBeaconInfo(bus, function (beacon) {
                            beaconRes = beacon;
                            cb(null);
                        })
                    }
                ], function (err) {
                    if (err) return next(err);
                    busesResponse = busesResponse.concat(busesRes);
                    beaconInfo= beaconInfo.concat(beaconRes);
                    callback();
                });

            }, function(err) {
                if (err) return next(err);
                //Tell the user about the great success
                res.json({
                    "result": {
                        buses: busesResponse,
                        routeInfo: buslist,
                        beaconInfo : beaconInfo
                    }

                });
            });

        }

    })
});

module.exports = router;