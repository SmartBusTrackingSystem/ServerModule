/**
 * Created by neo on 2/17/17.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TokenSchema = new Schema({
    token: String,
    updated : { type: Date, default: Date.now },
}, { collection: 'token' });

module.exports = mongoose.model('Token', TokenSchema);