var router = require('express').Router();

// Signup route
router.use('/signup', require('./signup'));
// Login
router.use('/login', require('./login'));
// SET PASSWORD
router.use('/setpassword', require('./setpassword'));
// Station route for adding deleting station
router.use('/station', require('./station'));
// Firsttime set
router.use('/firsttime', require('./firsttime'));
// Userlist get/post/delete
router.use('/userlist', require('./userlist'));
// LIST all genreal transfer requested users
router.use('/genlist', require('./genlist'));
// LIST all transfer requested users
router.use('/reqlist', require('./reqlist'));
// Allot Station to user update list
router.use('/allot', require('./allot'));
// LIST station vacencies on request(of 3)
router.use('/returnstation', require('./returnstation'));

module.exports = router;
