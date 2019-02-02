const router = require('express').Router();
const Station = require('../../models/stations');

router.get('/', (req, res) => {
    console.log(req.query.station);
    Station.find({ name: { $regex: req.query.station } })
        .select('_id statCode name si asi scpo tscpo cpo wcpo')
        .then(stations => {
            res.status(200).json({
                stations,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
