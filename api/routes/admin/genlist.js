const router = require('express').Router();
const User = require('../../models/user');
const _ = require('lodash');

router.get('/', (req, res) => {
    User.find({})
        .select(
            'name penno designation currentStation prevStation lastTransferDate joinDate reqTransfer genTransfer'
        )
        .then(users => {
            for (var i = 0; i < users.length; i++) {
                if (
                    !users[i].genTransfer.op1 ||
                    !users[i].genTransfer.op2 ||
                    !users[i].genTransfer.op3
                ) {
                    console.log(users[i].genTransfer);
                    delete users[i];
                }
            }
            var filtered = users.filter(function(el) {
                return el != null;
            });
            res.status(200).json({
                users: filtered,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;
