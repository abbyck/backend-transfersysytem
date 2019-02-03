const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const CheckAuth = require('../../middleware/check-auth');

router.get('/:penno', CheckAuth, (req, res, next) => {
    console.log(req.params.penno);
    User.findOne({ penno: req.params.penno })
        .select('penno name designation')
        .exec()
        .then(user => {
            if (user) {
                res.status(200).json({
                    user: user,
                });
            } else {
                res.status(404).json({
                    error: "Couldn't find any user",
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

router.post('/', CheckAuth, (req, res, next) => {
    User.find({ penno: req.body.penno })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'User user exists',
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

router.patch('/', CheckAuth, (req, res, next) => {
    console.log(req.body.userId);
    var query = { _id: req.body.userId };
    var update = {
        penno: req.body.penno,
        name: req.body.name,
        designation: req.body.designation,
    };
    console.log(update);
    User.findByIdAndUpdate(query, update, function(err, result) {
        if (err) {
            return res.status(500).json({
                error: err,
            });
        }
        if (result) {
            return res.status(200).json({
                message: 'Successfully updated details',
            });
        }
        return res.status(500).json({
            error: "Couldn't find a user matching requested id",
        });
    });
});

router.delete('/:userId', CheckAuth, (req, res, next) => {
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
