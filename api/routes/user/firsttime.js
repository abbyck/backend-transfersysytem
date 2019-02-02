const router = require('express').Router();

const User = require('../../models/user');

// Auth check
const CheckAuth = require('../../middleware/check-auth');

router.get('/', CheckAuth, (req, res) => {
    User.findOne({ penno: req.user.penno }, function(err, result) {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result) {
            console.log(result.firsttime);
            if (result.firsttime) {
                console.log(result);
                // TODO set the firsttime to false in DB Done
                User.findOneAndUpdate(
                    { penno: req.user.penno },
                    { firsttime: false },
                    { upsert: true },
                    function(err, doc) {
                        if (err) {
                            console.log('error occoured');
                            return res.status(500).json({ error: err });
                        }
                        // return res.status(201).json({
                        //     message: 'Status set',
                        // });
                    }
                );
                return res.status(200).json({
                    isFirsttime: true,
                    message:
                        'Change the default password by visiting user/setpassword route, and enter previous stations',
                });
            } else {
                return res.status(200).json({
                    isFirsttime: false,
                });
            }
        }
        return res.status(404).json({
            error: {
                message: "Profile couldn't be fetched",
            },
        });
    });
});

module.exports = router;
