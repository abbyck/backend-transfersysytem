const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const checkAuth = require('../../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    User.find({})
        .select('penno name designation currentStation')
        .then(users => {
            var userMap = {};
            users.forEach(function(user) {
                userMap[user.penno] = user;
            });
            res.status(200).json({
                users: userMap,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
});

router.post('/', (req, res, next) => {
    User.find({ penno: req.body.penno })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'User exists',
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } // end if
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            penno: req.body.penno,
                            name: req.body.name,
                            designation: req.body.designation,
                            password: hash,
                        });
                        user.save()
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
