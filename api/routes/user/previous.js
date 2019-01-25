const router = require('express').Router();

const User = require('../../models/user');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from previous.js');
});

router.post('/', CheckAuth, (req, res) => {
    const prev = {
        stat1: req.body.stat1,
        stat2: req.body.stat2,
        stat3: req.body.stat3,
        date: req.body.date,
    };
    // TODO DONE
    var query = { penno: req.user.penno };
    var prevstat = {
        prevStation: {
            first: prev.stat1,
            second: prev.stat2,
            Third: prev.stat3,
        },
        lastTransferDate: prev.date,
        firsttime: false,
    };

    User.findOneAndUpdate(query, prevstat, { upsert: true }, function(
        err,
        doc
    ) {
        if (err) return res.status(500).json({ error: err });
        return res.status(201).json({
            message: 'Updated station details',
            stations: prev,
        });
    });
});

module.exports = router;
