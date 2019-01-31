const router = require('express').Router();
const User = require('../../models/user');
const Station = require('../../models/stations');
const moment = require('moment');
// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.post('/', CheckAuth, (req, res) => {
    console.log(req.body);
    User.findOne({ penno: req.body.penno })
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
                prevStation: {
                    first:user.currentStation,
                    second:user.prevStation[first],
                    Third:,user.prevStation[second]
                }
            };
            console.log('reached');
            User.findOneAndUpdate(query, update, { upsert: true }, function(
                err,
                doc
            ) {
                if (err)
                    return res
                        .status(500)
                        .json({ error: err, reason: 'Userfind' });
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
                    if (err)
                        return res
                            .status(500)
                            .json({ error: err, reason: 'Stationfind' });
                    return res.status(201).json({
                        message: 'Alloted user',
                    });
                }
            );
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
                reason: 'rest',
            });
        });
});

module.exports = router;
