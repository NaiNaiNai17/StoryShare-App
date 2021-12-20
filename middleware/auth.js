
const ensureAuth = (req,res,next) =>{
req.isAuthenticated() ? next() : res.redirect('/')

}

const ensureGuest = (req,res,next) =>{
    if (req.isAuthenticated()){
        res.redirect('/dashboard')
    } else {
        return next()
    }
}

module.exports = { ensureAuth, ensureGuest}