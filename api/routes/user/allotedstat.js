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
                allotedStation: result.allotedStation,
            });
        }
        res.status(404).json({
            error: {
                message: "Could not fetch the user's allotment details",
            },
        });
    });
});

module.exports = router;
