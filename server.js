const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan') 
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')



//Passport config
require('./config/passport.js')(passport)


connectDB()
const app = express()

//Parse body
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Logging using morgan
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
//handlebar helpers
const { formatDate, stripTags, truncate } = require('./helpers/hbs')

//Handlebars template engine
app.engine(
    '.hbs',
    exphbs.engine({ 
      helpers:{
        formatDate,
        stripTags,
        truncate,
      },
     defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')


//Session Middleware
app.use(session({
  secret: 'shared trips',
  resave: false,
  saveUninitialized:false,
  store: MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    
  })
  
}))

//Passport Middleware
  app.use(passport.initialize())
  app.use(passport.session())
  //static folder
  app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/',  require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 5000 
app.listen(PORT,() => {
     console.log('Server started on port' , PORT)
 })


