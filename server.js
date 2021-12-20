const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan') 
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
// const { engine } = require ('express-handlebars');
const connectDB = require('./config/db')


//passport config
require('./config/passport.js')(passport)
// const strategy = require('./config/passport');
// const initialize = (passport) =>{
//   passport.use('google', strategy.GoogleStrategy)
// }
connectDB()
const app = express()

//logging using morgan
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


//handlebars template engine
app.engine(
    '.hbs',
    exphbs.engine({
     
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')
//Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized:false
  
}))

//Passport Middleware
  app.use(passport.initialize())
  app.use(passport.session())
  //static folder
  app.use(express.static(path.join(__dirname, 'public')))
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars')
// app.set('views', './views')

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
const PORT = process.env.PORT || 5000 
app.listen(PORT,() => {
     console.log('Server started on port' , PORT)
 })


