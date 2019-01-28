const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');

router.post('/', (req, res, next) => {
    Admin.find({ penno: req.body.penno })
        .exec()
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(422).json({
                    message: 'Admin user exists',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } // end if
                    else {
                        const admin = new Admin({
                            _id: new mongoose.Types.ObjectId(),
                            penno: req.body.penno,
                            name: req.body.name,
                            privilege: req.body.privilege,
                            password: hash,
                        });
                        admin
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err,
                                });
                            });
                    } //end else
                }); //end hash
            }
        });
}); //end post

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
