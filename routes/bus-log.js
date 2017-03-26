var express = require('express');
var busLog = require('../models/BusLog');
var tokenUtil = require('../controllers/tokenController');
var router = express.Router();

/* GET bus listing. */
router.get('/', function (req, res, next) {
    tokenUtil.autheticate(req.query.token, function(result){
        if(result){
                busLog.find(function (err, allBuses) {
                    if (!err)
                        res.json(allBuses);
                });
        }
        else{
            var err = new Error('Invalid token');
            err.status = 401;
            next(err);
        }
    });
});

router.post('/', function (req, res, next) {
   tokenUtil.autheticate(req.body.token, function(result){
       if(result){
           var busL = new busLog();
           busL.bus_id = req.body.bus_id;
           busL.route_id = req.body.route_id;
           busL.loc =
           { type: 'Point', coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)] };
           busL.speed = req.body.speed;
           busL.direction = req.body.direction;
           busL.occupied_seats = req.body.occupied_seats;

           // save the bear and check for errors
           busL.save(function (err) {
               if (err)
                   res.send(err);
               res.json({message: 'Success'});
           });
       }else{
           var err = new Error('Invalid token');
           err.status = 401;
           next(err);
       }

   })
});

module.exports = router;

