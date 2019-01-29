const router = require('express').Router();
const mongoose = require('mongoose');
const Station = require('../../models/stations');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    Station.find({}, function(err, stations) {
        var stationMap = {};

        stations.forEach(function(station) {
            stationMap[station.statCode] = station;
        });
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }

        res.status(200).json({
            stations: stationMap,
        });
    });
});

// TODO add checkauth Done
router.post('/', CheckAuth, (req, res, next) => {
    Station.find({ statCode: req.body.statCode })
        .exec()
        .then(station => {
            if (station.length >= 1) {
                return res.status(422).json({
                    message: 'Station exists',
                });
            } else {
                const station = new Station({
                    _id: new mongoose.Types.ObjectId(),
                    statCode: req.body.statCode,
                    name: req.body.name,
                    a1: req.body.a1,
                    a2: req.body.a2,
                    a3: req.body.a3,
                });
                station.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Station created',
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}); //end post

router.delete('/:statCode', (req, res, next) => {
    Station.remove({ statCode: req.params.statCode })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'Station deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});
module.exports = router;
