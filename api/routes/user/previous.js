const router = require('express').Router();

const User = require('../../models/user');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from previous.js');
});

router.post('/', CheckAuth, (req, res) => {
    const prev = {
        current: req.body.current,
        stat1: req.body.stat1,
        stat2: req.body.stat2,
        stat3: req.body.stat3,
        lastdate: req.body.lastdate,
        joindate: req.body.joindate,
    };
    // TODO DONE
    var query = { penno: req.user.penno };
    var prevstat = {
        prevStation: {
            first: prev.stat1,
            second: prev.stat2,
            Third: prev.stat3,
        },
        currentStation: prev.current,
        joinDate: prev.joindate,
        lastTransferDate: prev.lastdate,
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
