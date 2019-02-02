var router = require('express').Router();

// User Signup route
router.use('/usersignup', require('./usersignup'));
//Admin Signup route
router.use('/adminactions', require('./adminactions'));
//Admin Password Reset route
router.use('/adpassreset', require('./adminsetpassword'));
// Admin Signup route
router.use('/useractions', require('./useractions'));
//Admin Password Reset route
router.use('/uspassreset', require('./usersetpassword'));
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
router.use('/returnstation', require('./return'));
// Search station
router.use('/searchstation', require('./searchstation'));

module.exports = router;
