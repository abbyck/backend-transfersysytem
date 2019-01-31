const router = require('express').Router();
const User = require('../../models/user');

router.get('/:designation', (req, res) => {
    console.log(req.params.designation);
    User.find({ designation: req.params.designation })
        .select(
            'name penno designation currentStation prevStation lastTransferDate joinDate reqTransfer genTransfer submitDate'
        )
        .sort({ joinDate: 'desc' })
        .then(users => {
            for (var i = 0; i < users.length; i++) {
                if (
                    !users[i].reqTransfer.op1 ||
                    !users[i].reqTransfer.op2 ||
                    !users[i].reqTransfer.op3
                ) {
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
