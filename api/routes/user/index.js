var router = require('express').Router();

// Signup
router.use('/signup', require('./signup'));
// Login
router.use('/login', require('./login'));
// Firsttime routes
router.use('/firsttime', require('./firsttime'));
// List current station
// router.use('/current', require('./current'));
// Previous
router.use('/previous', require('./previous'));
// Profile
router.use('/profile', require('./profile'));
// Password Reset
router.use('/setpassword', require('./setpassword'));
// Request transfer
router.use('/reqtransfer', require('./reqtransfer'));
// Genera; Transfer
router.use('/gentransfer', require('./gentransfer'));

module.exports = router;
