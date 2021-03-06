var router = require('express').Router();

// Login
router.use('/login', require('./login'));
// Firsttime routes
router.use('/firsttime', require('./firsttime'));
// Previous
router.use('/previous', require('./previous'));
// Profile
router.use('/profile', require('./profile'));
// Password Reset
router.use('/setpassword', require('./setpassword'));
// Station route for getting and posting update
router.use('/station', require('./station'));
// Avialble station list
router.use('/avilablestations', require('./availablestations'));
// Request transfer
router.use('/reqtransfer', require('./reqtransfer'));
// Genral Transfer stats
// router.use('/gentransferstats', require('./gentranstat'));
// Genera; Transfer
router.use('/gentransfer', require('./gentransfer'));

module.exports = router;
