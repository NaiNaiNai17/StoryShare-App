const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')
const dotenv = require('dotenv').config()


console.log(process.env)
// passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//     passport.serializeUser((id, done)=>{
//         done(null, user.id)
//      })
//      passport.deserializeUser((user,done)=>{
//          User.findById(id,(err, user) => done(err,user)
//          )
//      })
//   }
// ));
module.exports = function(passport){
    console.log(process.env.GOOGLE_CLIENT_ID)
    passport.use(
        new GoogleStrategy(
            {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) =>{
      console.log(profile)
      const newUser = {
          googleID: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastname: profile.name.familyName,
          image: profile.photos[0].value
      }
      try {
          let user = await User.findOne({ googleId: profile.id})

          if(user){
              done(null, user)
          } else {
              user = await User.create(newUser)
              done(null, user)
          }
      } catch (error) {
          console.log(error)
          
      }
    }
))
passport.serializeUser((id, done)=>{
   done(null, user.id)
})
passport.deserializeUser((user,done)=>{
    User.findById(id,(err, user) => done(err,user)
    )
})
}