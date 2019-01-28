const router = require('express').Router();
const moment = require('moment');
const User = require('../../models/user');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', CheckAuth, (req, res) => {
    User.findOne({ penno: req.user.penno }, function(err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result) {
            var date = new Date('' + result.lastTransferDate);

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            var a = moment(year + '-' + month + '-' + dt);
            var b = moment();

            var years = b.diff(a, 'year');
            console.log(years);
            if (years >= 3) {
                return res.status(200).json({
                    genTransStatus: true,
                });
            } else {
                return res.status(200).json({
                    genTransStatus: false,
                });
            }
        }
        res.status(404).json({
            error: {
                message: "Profile couldn't be fetched",
            },
        });
    });
});

module.exports = router;
