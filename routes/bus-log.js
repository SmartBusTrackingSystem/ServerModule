var express = require('express');
var busLog = require('../models/BusLog');
var router = express.Router();

/* GET bus listing. */
router.get('/', function(req, res, next) {
    if (req.query.busid === "" || req.query.busid === undefined || req.query.busid === null ) {
        busLog.find(function(err, allBuses) {
            if (!err)
                res.json(allBuses);
        });
    } else {
        busLog.findOne('bus_id': req.query.busid, function(err, oneBus ){
            if (!err)
                res.json(oneBus)    
            else 
                res.send(err)
        })
    }
    
});

router.post('/', function(req, res, next) {
    // if req.body.key != "bus_private_key" {
    //     res.send("Access Denied")
    // }
    // else {
        var busL = new busLog();
        busL.bus_id = req.body.bus_id;
        busL.route_id = req.body.route_id;
        busL.latitude = req.body.latitude;
        busL.longitude = req.body.longitude;
        busL.speed = req.body.speed;
        busL.occupied_seats = req.body.occupied_seats;
        
        // save the bear and check for errors
        busL.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Success' });
        });
    //}
}); 
    
module.exports = router;

router.get('/findNearestBus', function(req,res, next)) {
    if (req.query.routeid === "" || req.query.routeid === undefined || req.query.routeid === null || req.query.origLat === "" || req.query.origLat === undefined || req.query.origLat === null req.query.origLng === "" || req.query.origLng === undefined || req.query.origLng === null) {
        res.status = 401;
        res.locals.message = "Invalid request missing soucre parameter or dest parameter";
        res.locals.error = "Invalid rquest"
        res.json({message: res.locals.message});

    }

}