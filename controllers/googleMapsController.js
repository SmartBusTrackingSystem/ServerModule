/**
 * Created by neo on 3/6/17.
 */
const util = require('util');
var async = require('async');
var APIKEY = "AIzaSyApsk0euX5wgoEA9rr6KpCRTiMsU-beTDQ"

var googleMapsClient = require('@google/maps').createClient({
    key: APIKEY
});


var googleResult = function (source, destination, callback) {
    async.waterfall([
        function (cb) {
            googleMapsClient.directions({
                destination: destination,
                origin: source,
                mode: "transit",
                transit_mode: "bus"
            }, function (err, response) {
                //console.log(util.inspect(response.json, {showHidden: false, depth: null}))
                var result = {};
                if ("routes" in response.json) {
                    var routes = response.json.routes;
                    if (Array.isArray(routes) && routes.length > 0) {
                        if ("legs" in routes[0]) {
                            var legs = routes[0].legs;
                            if (Array.isArray(legs) && legs.length > 0) {
                                var legObject = legs[0];
                                if ("steps" in legObject) {
                                    result["steps"] = legObject.steps;
                                    var steps = legObject.steps;
                                    if (Array.isArray(steps) && steps.length > 0) {
                                        for (var i = 0; i < steps.length; i++) {
                                            if (steps[i].travel_mode == 'TRANSIT') {
                                                result['source'] = steps[i].transit_details.departure_stop;
                                                result['destination'] = steps[i].transit_details.arrival_stop;
                                                result['route_id'] = steps[i].transit_details.line.short_name;
                                                var headsign = steps[i].transit_details.headsign;
                                                result['head_station'] = headsign.substr(headsign.indexOf(' ')+1);
                                                break;
                                            }
                                        }
                                    }
                                }

                            }

                        }
                    }
                }
                cb("null", result)
            })
        }], function (err, result) {
        callback(result)
    });
};


module.exports =     {
        getGoogleMapResult: googleResult
    }
