//this table map bus route and bus id


 

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RouteLogSchema = new Schema({
    route_id: Number,
    bus_id : Number,
    start_point: String,
    end_point: String,
    total_seats : Number,
    updated : { type: Date, default: Date.now },
}, { collection: 'route_log' });

module.exports = mongoose.model('RouteLog', RouteLogSchema);