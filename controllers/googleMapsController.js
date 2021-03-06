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
                mode: 'transit',
                alternatives: true,
                transit_mode: ['bus']
            }, function (err, response) {
                //console.log(util.inspect(response.json, {showHidden: false, depth: null}))
                var busList = [];
                var uniquesRoutes = [];
                if ("routes" in response.json) {
                    var routes = response.json.routes;
                    if (Array.isArray(routes) && routes.length > 0) {
                        for(var j=0; j < routes.length; j++ ) {
                            var result = {};
                            if ("legs" in routes[j]) {
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
                                                    result['head_station'] = headsign.substr(headsign.indexOf(' ') + 1);
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                }

                            }
                           // console.log(result['route_id']);
                            if(uniquesRoutes.indexOf(result['route_id']) == -1){
                                busList.push(result);
                                uniquesRoutes.push(result['route_id']);
                            }
                        }
                    }
                }
                cb("null", busList)
            })
        }], function (err, result) {
        callback(result)
    });
};


module.exports =     {
        getGoogleMapResult: googleResult
    }
