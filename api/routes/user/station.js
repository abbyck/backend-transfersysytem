const router = require('express').Router();
//const User = require('../../models/user');
const Station = require('../../models/stations');

// Auth
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    Station.find({}, function(err, stations) {
        var stationMap = {};

        stations.forEach(function(station) {
            stationMap[station._id] = station;
        });

        res.status(200).json({
            stations: stationMap,
        });
    });
});

module.exports = router;
