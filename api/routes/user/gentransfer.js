const router = require('express').Router();

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
    // TODO Done
    var query = { penno: req.user.penno };
    var genTrans = {
        genTransfer: {
            op1: opts.op1,
            op2: opts.op2,
            op3: opts.op3,
        },
    };

    User.findOneAndUpdate(query, genTrans, { upsert: true }, function(
        err,
        doc
    ) {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({
            message: 'Updated station details',
            stations: opts,
        });
    });
});

module.exports = router;
