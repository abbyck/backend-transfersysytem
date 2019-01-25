const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.find({ penno: req.body.penno })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed',
                });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                penno: user[0].penno,
                                UserId: user[0]._id,
                                isFirstTime: user[0].firsttime,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h',
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth success',
                            token: token,
                        });
                    }
                    return res.status(401).json({
                        message: 'Auth failed',
                    });
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
