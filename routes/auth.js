const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc auth with Google
// route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// @desc Google auth with callback
//@route GET /auth/google/callback if fail red to root : to dash
router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}),
(req,res) => {
    res.redirect('/dashboard')
})
// if (req.isAuthenticated()) {
//     res.redirect('/dashboard')
//   if (!req.isAuthenticated()) {
//     return next();
//   } else {
//     return next()
//     res.redirect('/dashboard');
module.exports = router;