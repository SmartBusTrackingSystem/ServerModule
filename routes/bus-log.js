var express = require('express');
var busLog = require('../models/BusLog');
var router = express.Router();

/* GET bus listing. */
router.get('/', function(req, res, next) {
    busLog.find(function(err, bLog) {
        if (err)
            res.send(err);

        res.json(bLog);
    });
});

router.post('/', function(req, res, next) {

    var busL = new busLog();
    busL.bus_id = req.body.bus_id;
    busL.bus_route = req.body.bus_route;
    busL.latitude = req.body.latitude;
    busL.longitude = req.body.longitude;
    busL.vacant_seats = req.body.vacant_seats;
    
    // save the bear and check for errors
    busL.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Success' });
    });
});

module.exports = router;
