var express = require('express');
var tokenUtil = require('../controllers/tokenController');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/getToken', function (req, res, next) {
    tokenUtil.getToken(function (result) {
        res.json({
            message:"Success",
            token :result
        })
    });
});


// router.get('/autheticate', function (req, res, next) {
//     tokenUtil.autheticate(req.token, function (result) {
//         res.json({
//             message:"Success",
//             return :result
//         })
//     });
// });

module.exports = router;
