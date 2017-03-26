/**
 * Created by neo on 2/17/17.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BusLogSchema = new Schema({
    bus_id: Number,
    route_id : Number,
    loc : {
        type: { type: String }
        , coordinates: []
    },
    latitude: String,
    longitude : String,
    speed: String,
    direction: Number,
    updated : { type: Date, default: Date.now },
    occupied_seats: Number
}, { collection: 'bus_log' });
BusLogSchema.index({'loc': '2dsphere'});
module.exports = mongoose.model('BusLog', BusLogSchema);