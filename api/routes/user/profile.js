const router = require('express').Router();
const User = require('../../models/user');
const moment = require('moment');

// Auth
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

            var genstats = false;
            if (years >= 3) {
                genstats = true;
            }
            User.find({});
            return res.status(200).json({
                penno: result.penno,
                name: result.name,
                designation: result.designation,
                joinDate: result.joinDate,
                currentStation: result.currentStation,
                prevStation: result.prevStation,
                lastTransferDate: result.lastTransferDate,
                reqTransfer: result.reqTransfer,
                genTransfer: result.genTransfer,
                genTransStatus: genstats,
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
