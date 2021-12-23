const User = require('../models/User')
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

exports.jwtStrategy = new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_SECRET
},(jwtPayload, done) => {
    return User.findById(jwtPayload.sub).select('_id firstname lastname username email roles')
           .then(user => {return done(null, user)})
           .catch(err => {return done(err)})
}
)