/**
 * Created by neo on 3/6/17.
 */
const util = require('util');
var async = require('async');
var APIKEY = "AIzaSyApsk0euX5wgoEA9rr6KpCRTiMsU-beTDQ"

var googleMapsClient = require('@google/maps').createClient({
    key: APIKEY
});

// var getCommonSubstring = function (string1, string2) {
//     var commonString = "",
//         string1Length = string1.length,
//         string2Length = string2.length,
//         num = new Array(string1Length),
//         maxlen = 0,
//         subStringStart = 0;
//
//     for (var i = 0; i < string1Length; i++) {
//         var subArray = new Array(string2Length);
//         for (var j = 0; j < string2Length; j++)
//             subArray[j] = 0;
//         num[i] = subArray;
//     }
//     var thisSubStringStart = null;
//     for (var i = 0; i < string1Length; i++) {
//         for (var j = 0; j < string2Length; j++) {
//             if (string1[i] !== string2[j])
//                 num[i][j] = 0;
//             else {
//                 if ((i === 0) || (j === 0))
//                     num[i][j] = 1;
//                 else
//                     num[i][j] = 1 + num[i - 1][j - 1];
//
//                 if (num[i][j] > maxlen) {
//                     maxlen = num[i][j];
//                     thisSubStringStart = i - num[i][j] + 1;
//                     if (subStringStart === thisSubStringStart) {
//                         commonString += string1[i];
//                     }
//                     else {
//                         subStringStart = thisSubsBegin;
//                         commonString = "";
//                         commonString += string1.substr(subStringStart, (i + 1) - subStringStart);
//                     }
//                 }
//             }
//         }
//     }
//     return commonString;
// }

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
                                    var steps = legObject.steps;
                                    if (Array.isArray(steps) && steps.length > 0) {
                                        for (var i = 0; i < steps.length; i++) {
                                            if (steps[i].travel_mode == 'TRANSIT') {
                                                result['source'] = steps[i].transit_details.departure_stop;
                                                result['route_id'] = steps[i].transit_details.line.short_name;
                                                // console.log("Calling");
                                                // console.log(getCommonSubstring("22 Palo alto", "Palo alto - estriage"));
                                                // console.log(steps[i].transit_details.line.name);
                                                // console.log(steps[i].transit_details.headsign);
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
