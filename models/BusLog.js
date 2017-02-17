/**
 * Created by neo on 2/17/17.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BusLogSchema = new Schema({
    bus_id: Schema.Types.ObjectId,
    bus_route : Number,
    latitude: String,
    longitude : String,
    updated : { type: Date, default: Date.now },
    vacant_seats: Number
}, { collection: 'bus_log' });

module.exports = mongoose.model('BusLog', BusLogSchema);