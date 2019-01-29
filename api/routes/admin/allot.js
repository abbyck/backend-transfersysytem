const router = require('express').Router();
const User = require('../../models/user');
const Station = require('../../models/stations');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.post('/', CheckAuth, (req, res) => {
    console.log(req.body);
    User.findOne({ penno: req.body.penno })
        .exec()
        .then(user => {
            var query = { penno: req.body.penno };
            var CurrentDate = moment().toISOString();
            var update = {
                reqTransfer: {},
                genTransfer: {},
                allotedStation: req.body.allotedStation,
                lastTransferDate: CurrentDate,
                currentStation: req.body.allotedStation,
                submitDate: '',
            };
            User.findOneAndUpdate(query, update, { upsert: true }, function(
                err,
                doc
            ) {
                if (err) return res.status(500).json({ error: err });
                return update;
            });
        })
        .then(user => {
            console.log(req.body.designation);
            var query = {};
            query[req.body.designation] = -1;
            Station.findOneAndUpdate(
                { statCode: req.body.allotedStation },
                { $inc: query },
                { upsert: true },
                function(err, doc) {
                    if (err) return res.status(500).json({ error: err });
                    return res.status(201).json({
                        message: 'Alloted user',
                    });
                }
            );
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
