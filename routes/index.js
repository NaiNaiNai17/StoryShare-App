const express = require('express')
const router = express.Router()


//login and landing page
 router.get('/', (req,res)=>{
    res.render('login',{
        layout: 'login'
    })
})

//dashboard route
router.get('/dashboard', (req,res)=>{
    res.render('dashboard')
})

module.exports = router;