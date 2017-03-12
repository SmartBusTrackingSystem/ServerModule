/**
 * Created by neo on 3/11/17.
 */
var async = require('async');
var routeLogCollection = require('../models/RouteLog');
var busLogCollection = require('../models/BusLog');
var stationBeaconCollection = require('../models/StationBeacon');


//reference http://www.penta-code.com/02-exploring-async-js-async-waterfall-and-async-series/
var search = function (routeInfromation, callback) {
    async.waterfall([
        function (cb) {
            var query = routeLogCollection.findOne({'route_id': routeInfromation.route_id});
            query.exec(function (err, doc) {
                //console.log(err);
                if (err) cb("Moogoose err", null)
                else {
                    if (doc == null) cb("No Route Information found", null);
                    if (doc.end_point.toLowerCase() == routeInfromation.head_station.toLowerCase()) {
                        var direction = 0;
                        cb(null, direction);
                    } else {
                        var direction = 1;
                        cb(null, direction);
                    }
                }

            });

        },
        function (direction, cb) {
            var query = busLogCollection.aggregate(
                [
                    {
                        "$geoNear": {
                            "near": {
                                "type": "Point",
                                "coordinates": [routeInfromation.source.location.lng, routeInfromation.source.location.lat]
                            },
                            "distanceField": "distance",
                            "spherical": true
                        }
                    },

                    {"$match": {"route_id": parseInt(routeInfromation.route_id), "direction": direction}},

                    {
                        "$lookup": {
                            "from": "route_log",
                            "localField": "bus_id",
                            "foreignField": "bus_id",
                            "as": "bus_info"
                        }

                    }
                    ,
                    {"$sort": {"bus_id": 1, "updated": -1}},
                    {
                        "$group": {
                            "_id": "$bus_id",
                            "route_id": {"$first": "$route_id"},
                            "updated": {"$first": "$updated"},
                            "direction": {"$first": "$direction"},
                            "occupied_seats": {"$first": "$occupied_seats"},
                            "speed": {"$first": "$speed"},
                            "loc": {"$first": "$loc"},
                            "bus_total": {"$first": "$bus_info.total_seats"},
                            "distance": {"$first": "$distance"}
                        }
                    },
                    {
                        "$sort": {"distance": 1} // Sort the nearest first
                    }

                ]);
            query.exec(function (err, doc) {
                if (err) cb("No Route Information found", null);
                if (doc) {
                    cb("null", doc)
                }
            });
        }], function (err, result) {
        if (err == "null") {
            callback(result);
        } else {
            callback(null);
        }
    });
}

var getBeaconInfo = function (routeInfromation, callback) {
    //console.log(routeInfromation);
    async.waterfall([
        function (cb) {
            var searchReg = new RegExp(["^", routeInfromation.destination.name.toLowerCase(), "$"].join(""), "i");
            var query = stationBeaconCollection.findOne({
                'station_name': searchReg,
                'route_id': parseInt(routeInfromation.route_id)
            });
            query.exec(function (err, doc) {
                if (err) cb("null", null);
                else {
                        var obj = {};
                        if (doc.head_station.toLowerCase() == routeInfromation.head_station.toLowerCase()) {
                            obj = {
                                "reminder_beacon_id": doc.previous_station_beacon_id
                            }
                        } else {
                            obj = {
                                "reminder_beacon_id": doc.next_station_beacon_id
                            }
                        }

                    cb(null, obj);
                }


            });
        }
    ], function (err, beaconInfo) {
        callback(beaconInfo)
    });
}


module.exports = {
    search: search,
    getBeaconInfo: getBeaconInfo
}



