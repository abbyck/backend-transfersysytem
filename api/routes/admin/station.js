const router = require('express').Router();
const mongoose = require('mongoose');
const Station = require('../../models/stations');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from station.js');
});

// TODO add checkauth
router.post('/', (req, res, next) => {
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
                    a1: req.body.first,
                    a2: req.body.second,
                    a3: req.body.third,
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