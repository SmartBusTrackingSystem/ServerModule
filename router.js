/**
 * Created by neo on 2/17/17.
 */

var express = require('express');
var index = require('./routes/index');
var users = require('./routes/users');
var busLog = require('./routes/bus-log');

var app = express();
app.use('/',index);
app.use('/users',users);
app.use('/buslog',busLog);

module.exports = app;