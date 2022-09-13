var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

// passport github route
router.get('/auth/github', passport.authenticate('github'));

router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/users/login' }),
    (req, res) => {
        // Authentication Successful , redirect Home
        res.redirect('/home');
    }
);

//passport google route

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/users/login' }),
    function (req, res) {
        // Authentication Successful , redirect Home

        res.redirect('/home');
    }
);
module.exports = router;
