/**
 * Created by neo on 2/17/17.
 */

var express = require('express');
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use('/',index);
app.use('/users',users);

module.exports = app;