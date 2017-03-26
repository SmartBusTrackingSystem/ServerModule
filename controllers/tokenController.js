/**
 * Created by neo on 3/5/17.
 */
var tokenCollection = require('../models/Token');
var express = require('express');
var rand = require('rand-token');
var async = require('async');


module.exports = {
    autheticate: function (tokenString, callback) {
        async.waterfall([
            function (cb) {
                var query = tokenCollection.findOne({'token': tokenString});
                query.select('token');
                query.exec(function (err, doc) {
                    if (err) cb("null", false);
                    else {
                        if (doc)
                            cb("null", true);
                        else
                            cb("null", false);
                    }

                });
            }
        ], function (err, result) {
            callback(result)
        });
    },

    getToken: function (callback) {
        async.waterfall([
            function (cb) {
                var tokenObject = new tokenCollection();
                tokenObject.token = rand.uid(32);
                var token = false;
                tokenObject.save(function (err) {
                    cb("null", tokenObject.token)
                })
            }
        ], function (err, result) {
            callback(result)
        });

    }

}
