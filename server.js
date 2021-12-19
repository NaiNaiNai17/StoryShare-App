const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan') 
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
// const { engine } = require ('express-handlebars');
const connectDB = require('./config/db')


//{path:'./config/config.env'} later
dotenv.config() 

//passport config
require('./config/passport', passport)
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
const PORT = process.env.PORT || 5000 
app.listen(PORT,() => {
     console.log('Server started on port' , PORT)
 })


