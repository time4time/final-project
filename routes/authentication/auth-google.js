const router = require('express').Router();
const passport = require('../passport-auth/pauth.js');
const User = require('../../models/User.js');

router.get('/auth/google',

  passport.authenticate('google', {scope: 
    ['profile', 'email']})
  );

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/profile',
    failureRedirect : '/auth/google'
}));

module.exports = router;