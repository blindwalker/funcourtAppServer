var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
 
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/login2', auth.login2);
router.post('/loginSoccer', auth.login2);

module.exports = router;