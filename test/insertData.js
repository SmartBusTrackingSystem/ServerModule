/**
 * Created by neo on 3/6/17.
 */


var routeLog = require('../models/RouteLog');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/SBTS')

function insertRoutes() {
    var data = [
        {
            "bus_id":1,
            "route_id":22,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },

        {
            "bus_id":2,
            "route_id":22,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },


        {
            "bus_id":3,
            "route_id":22,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":4,
            "route_id":22,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":5,
            "route_id":22,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":6,
            "route_id":522,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":7,
            "route_id":522,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":8,
            "route_id":522,
            "start_point":"PALO ALTO",
            "end_point":"EASTRIDGE",
            "total_seats":50
        },
        {
            "bus_id":9,
            "route_id":181,
            "start_point":"San Jose Diridon",
            "end_point":"Fremont Bart",
            "total_seats":40
        },
        {
            "bus_id":10,
            "route_id":181,
            "start_point":"San Jose Diridon",
            "end_point":"Fremont Bart",
            "total_seats":40
        }
    ]
    data.forEach(function(obj){
        var route = new routeLog();
        route.bus_id = obj.bus_id;
        route.route_id = obj.route_id;
        route.start_point = obj.start_point;
        route.end_point = obj.end_point;
        route.total_seats = obj.total_seats;
        console.log("Called");
        // save the bear and check for errors
        route.save(function (err) {
            if (err)
             console.log("Insertion failed"+route.bus_id)
        });
    });
}

insertRoutes();

setTimeout(function () {
    process.exit()
},30000);
