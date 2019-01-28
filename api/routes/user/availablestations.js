const router = require('express').Router();
const User = require('../../models/user');
const Station = require('../../models/stations');

// Auth
const CheckAuth = require('../../middleware/check-auth');

router.get('/', CheckAuth, (req, res) => {
    Station.find({}, function(err, stations) {
        var stationMap = {};

        stations.forEach(function(station) {
            stationMap[station.statCode] = station;
        });
        User.findOne({ penno: req.user.penno }, function(err, result) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (result) {
                console.log(
                    result.prevStation.first,
                    result.prevStation.second,
                    result.prevStation.Third,
                    result.currentStation
                );
                key1 = result.prevStation.first;
                key2 = result.prevStation.second;
                key3 = result.prevStation.Third;
                key4 = result.currentStation;

                delete stationMap[key1];
                delete stationMap[key2];
                delete stationMap[key3];
                delete stationMap[key4];

                return res.status(200).json({
                    stations: stationMap,
                });
            }
            res.status(404).json({
                error: {
                    message: "Profile couldn't be fetched",
                },
            });
        });
    });
});

module.exports = router;
