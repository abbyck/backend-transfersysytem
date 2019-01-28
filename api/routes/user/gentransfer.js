const router = require('express').Router();
const Station = require('../../models/stations');
const User = require('../../models/user');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from previous.js');
});

router.post('/', CheckAuth, (req, res) => {
    const opts = {
        op1: req.body.stat1,
        op2: req.body.stat2,
        op3: req.body.stat3,
    };
    //     // TODO Done
    var query = { penno: req.user.penno };
    var genTrans = {
        genTransfer: {
            op1: opts.op1,
            op2: opts.op2,
            op3: opts.op3,
        },
    };

    User.find(query)
        .exec()
        .then(user => {
            User.findOneAndUpdate(query, genTrans, { upsert: true }, function(
                err,
                doc
            ) {
                if (err) return res.status(500).json({ error: err });
                return user;
            });
        })
        .then(user => {
            console.log(req.user.designation);
            var query = {};
            query[req.user.designation] = +1;
            Station.findOneAndUpdate(
                { statCode: req.user.currentStation },
                { $inc: query },
                { upsert: true },
                function(err, doc) {
                    if (err) return res.status(500).json({ error: err });
                    return res.status(201).json({
                        message: 'Updated station details',
                        stations: opts,
                    });
                }
            );
        })
        .catch(err => {
            if (err) return res.status(500).json({ error: err });
        });
});
module.exports = router;
