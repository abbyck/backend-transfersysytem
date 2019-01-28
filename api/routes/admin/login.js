const router = require('express').Router();
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    Admin.find({ penno: req.body.penno })
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.status(401).json({
                    message:
                        'Incorrect PEN number or Password, \nTry again with correct credentials',
                });
            }
            bcrypt.compare(
                req.body.password,
                admin[0].password,
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
                                penno: admin[0].penno,
                                UserId: admin[0]._id,
                                privilege: admin[0].privilege,
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: '1h',
                            }
                        );
                        return res.status(200).json({
                            message: 'Authentication Successful',
                            token: token,
                        });
                    }
                    return res.status(401).json({
                        message:
                            'Incorrect PEN number or Password, \nTry again with correct credentials',
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
