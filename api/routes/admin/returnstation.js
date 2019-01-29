const router = require('express').Router();
const mongoose = require('mongoose');
const Station = require('../../models/stations');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    Promise.all([
        Station.findOne({ statCode: req.body.code1 }),
        Station.findOne({ statCode: req.body.code2 }),
        Station.findOne({ statCode: req.body.code3 }),
    ]).then(([stat1, stat2, stat3]) => {
        res.status(200).json({
            first: {
                name: stat1.name,
                statCode: stat1.statCode,
                vacancy: stat1[req.body.designation],
            },
            second: {
                name: stat2.name,
                statCode: stat2.statCode,
                vacancy: stat2[req.body.designation],
            },
            third: {
                name: stat3.name,
                statCode: stat3.statCode,
                vacancy: stat3[req.body.designation],
            },
        });
    });
    // Station.find({}, function(err, stations) {
    //     var stationMap = {};

    //     stations.forEach(function(station) {
    //         stationMap[station.statCode] = station;
    //     });
    //     if (err) {
    //         return res.status(500).json({
    //             error: err,
    //         });
    //     }
});

module.exports = router;
