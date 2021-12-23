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


// @desc Logout user with google
//@route /auth/logout

router.get('/logout', (req,res) =>{
    req.logout()
    res.redirect('/')
})

// register user with email +
router.post('/register', controller.registerUser);
// Login user with email and password
router.post('/login', controller.login);
module.exports = router;