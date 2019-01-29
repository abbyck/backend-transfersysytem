const router = require('express').Router();
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const CheckAuth = require('../../middleware/check-auth');

router.get('/', (req, res) => {
    res.send('Hello from setpassword');
});

router.post('/', CheckAuth, (req, res) => {
    console.log(req.user.penno);
    Admin.find({ penno: req.body.penno })
        .exec()
        .then(admin => {
            if (admin) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } // end if
                    else {
                        var query = { penno: req.user.penno };
                        var newPass = { password: hash };
                        console.log(hash);
                        Admin.findOneAndUpdate(
                            query,
                            newPass,
                            { upsert: true },
                            function(err, doc) {
                                if (err)
                                    return res.status(500).json({ error: err });
                                return res.status(201).json({
                                    message: 'Updated Password',
                                });
                            }
                        );
                    } //end else
                }); //end hash
            } else {
                return res.status(422).json({
                    message: 'User does not exist',
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
