var router = require('express').Router();

// Signup route
router.use('/signup', require('./signup'));
// Login
router.use('/login', require('./login'));
// Station route for adding deleting stations
router.use('/station', require('./station'));
// Userlist get/post/delete
router.use('/userlist', require('./userlist'));
// LIST all genreal transfer requested users
router.use('/genlist', require('./genlist'));
// LIST all transfer requested users
router.use('/reqlist', require('./reqlist'));

module.exports = router;
