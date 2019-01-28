var router = require('express').Router();

// LIST all routes
router.use('/list', require('./list'));
// Station route for adding deleting stations
router.use('/station', require('./station'));

module.exports = router;
