/**
 * Created by root on 3/11/17.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StationBeaconSchema = new Schema({
    station_id: Number,
    station_name: String,
    route_id: Number,
    previous_station_beacon_id:String,
    next_staion_beacon_id:String,
    head_station:String,
    updated : { type: Date, default: Date.now }
}, { collection: 'station_beacon' });

module.exports = mongoose.model('StationBeacon', StationBeaconSchema);