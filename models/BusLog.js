/**
 * Created by neo on 2/17/17.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BusLogSchema = new Schema({
    bus_id: Number,
    route_id : Number,
    latitude: String,
    longitude : String,
    speed: String,
    direction: Boolean,
    updated : { type: Date, default: Date.now },
    occupied_seats: Number
}, { collection: 'bus_log' });

module.exports = mongoose.model('BusLog', BusLogSchema);