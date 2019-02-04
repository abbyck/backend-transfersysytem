const router = require('express').Router();
const Station = require('../../models/stations');
const User = require('../../models/user');
const moment = require('moment');
// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from previous.js');
});

router.post('/', CheckAuth, (req, res) => {
    var CurrentDate = moment().toISOString();
    // TODO Done
    var query = { penno: req.user.penno };
    var reqTrans = {
        reqTransfer: {
            op1: req.body.stat1,
            op2: req.body.stat2,
            op3: req.body.stat3,
        },
        genTransfer: {},
        submitDate: CurrentDate,
    };

    User.find(query)
        .exec()
        .then(user => {
            User.findOneAndUpdate(query, reqTrans, { upsert: true }, function(
                err,
                doc
            ) {
                if (err) {
                    return res
                        .status(500)
                        .json({ error: "couldn't find user", err });
                }
                return user;
            });
        })
        .then(user => {
            console.log(req.user.designation);
            var query = {};
            query[req.user.designation] = +1;
            console.log(req.user.currentStation);
            Station.findOneAndUpdate(
                { _id: req.user.currentStation },
                { $inc: query },
                { upsert: true },
                function(err, doc) {
                    if (err) {
                        return res
                            .status(500)
                            .json({ error: "couldn't update station", err });
                    }
                    return res.status(201).json({
                        message: 'Updated station details',
                        stations: reqTrans.reqTransfer,
                    });
                }
            );
        })
        .catch(err => {
            if (err) return res.status(500).json({ error: 'other error', err });
        });
});

module.exports = router;
