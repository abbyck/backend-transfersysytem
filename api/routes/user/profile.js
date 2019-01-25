const router = require('express').Router();
const User = require('../../models/user');

// Auth
const CheckAuth = require('../../middleware/check-auth');

router.get('/', CheckAuth, (req, res) => {
    User.findOne({ penno: req.user.penno }, function(err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result) {
            return res.status(200).json({
                penno: result.penno,
                name: result.name,
                designation: result.designation,
                prevStation: result.prevStation,
                lastTransferDate: result.lastTransferDate,
                reqTransfer: result.reqTransfer,
                genTransfer: req.genTransfer,
            });
        }
        res.status(404).json({
            error: {
                message: "Profile couldn't be fetched",
            },
        });
    });
});

module.exports = router;
