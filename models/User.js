var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
name: String,
username: { type: String, required: true, unique: true},
password: {type: String,required: true, unique: true},
admin: Boolean,
});

var User = mongoose.model('User',userSchema);

module.export = User;
