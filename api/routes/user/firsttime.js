const router = require('express').Router();

router.get('/', (req, res) => {
    firstTime = true; //TODO check from db
    if (firstTime) {
        // TODO set the firsttime to false in DB
        res.status(200).json({
            isFirsttime: true,
            message:
                'Change the default password by visiting user/setpassword route',
        });
    } else {
        res.status(200).json({
            isFirsttime: false,
        });
    }
});

module.exports = router;
