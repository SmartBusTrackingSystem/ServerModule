/**
 * Created by neo on 3/6/17.
 */


var stationBeacon = require('../models/StationBeacon');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/SBTS')

function insertStationBeacons() {
    var data = [
        {
            "station_id":40,
            "station_name":"Santa Clara & 11th",
            "route_id": 22,
            "previous_station_beacon_id":"B9407F30-F5F8-466E-AFF9-25556B57FE6D:10001:19641",
            "next_staion_beacon_id":"B9407F30-F5F8-466E-AFF9-25556B57FE6D:16317:2971",
            "head_station":"EASTRIDGE",
        },
        {
            "station_id":39,
            "station_name":"E Santa Clara & S Seventh",
            "route_id": 22,
            "previous_station_beacon_id":"B9407F30-F5F8-466E-AFF9-25556B57FE6D:10001:19641",
            "next_staion_beacon_id":"B9407F30-F5F8-466E-AFF9-25556B57FE6D:16317:2971",
            "head_station":"EASTRIDGE",
        }

    ]
    data.forEach(function(obj){
        var station = new stationBeacon();
        station.station_id = obj.station_id;
        station.route_id = obj.route_id;
        station.station_name = obj.station_name;
        station.previous_station_beacon_id = obj.previous_station_beacon_id;
        station.next_staion_beacon_id = obj.next_staion_beacon_id;
        station.head_station = obj.head_station;
        // save the bear and check for errors
        station.save(function (err) {
            if (err)
             console.log("Insertion failed"+station.station_id)
        });
    });
}

insertStationBeacons();

setTimeout(function () {
    process.exit()
},20000);
