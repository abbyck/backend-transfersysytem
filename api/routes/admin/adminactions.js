const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');

const CheckAuth = require('../../middleware/check-auth');

router.get('/:penno', CheckAuth, (req, res, next) => {
    console.log(req.params.penno);
    Admin.findOne({ penno: req.params.penno })
        .select('penno name privilege')
        .exec()
        .then(admin => {
            if (admin === null) {
                return res.status(200).json({
                    error: 'Not found',
                });
            }
            res.status(200).json({
                admins: admin,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

router.post('/', CheckAuth, (req, res, next) => {
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

router.patch('/', CheckAuth, (req, res, next) => {
    console.log(req.body.userId);
    var query = { _id: req.body.userId };
    var update = {
        penno: req.body.penno,
        name: req.body.name,
        privilege: req.body.privilege,
    };
    console.log(update);
    Admin.findByIdAndUpdate(query, update, function(err, result) {
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
            error: "Couldn't find an admin matching requested id",
        });
    });
});

router.delete('/:userId', CheckAuth, (req, res, next) => {
    Admin.remove({ _id: req.params.userId })
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
