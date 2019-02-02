const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');

// Auth Check
const CheckAuth = require('../../middleware/check-auth');

router.delete('/:userId', CheckAuth, (req, res, next) => {
    Admin.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            console.log(result);
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
