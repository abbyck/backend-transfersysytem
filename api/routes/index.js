var router = require('express').Router();

// split up route handling
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));

// Basic error handling
router.use((req, res, next) => {
    const err = new Error('No routes could satisfy the req');
    err.status = 404;
    next(err);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = router;
