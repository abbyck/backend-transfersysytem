var router = require('express').Router();

// LIST all routes
router.use('/list', require('./list'));
// Signup route
router.use('/signup', require('./signup'));
// Login
router.use('/login', require('./login'));
// Station route for adding deleting stations
router.use('/station', require('./station'));

module.exports = router;
