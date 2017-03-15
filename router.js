/**
 * Created by neo on 2/17/17.
 */

var express = require('express');
var index = require('./routes/index');
var users = require('./routes/users');
var busLog = require('./routes/bus-log');
var login = require('./routes/login');
var authentication = require('./routes/authentication');
var search = require('./routes/search');

var app = express();
app.use('/',index);
app.use('/users',users);
app.use('/search',search);
app.use('/buslog',busLog);
app.use('/login',login);
app.use('/login/authentication',login);
app.use('/authentication',authentication);

module.exports = app;