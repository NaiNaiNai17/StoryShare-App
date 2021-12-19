const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan') 
const exphbs = require('express-handlebars')
// const { engine } = require ('express-handlebars');
const connectDB = require('./config/db')


//{path:'./config/config.env'} later
dotenv.config() 
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
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars')
// app.set('views', './views')
//routes
app.use('/', require('./routes/index'))
const PORT = process.env.PORT || 5000 
app.listen(PORT,() => {
     console.log('Server started on port' , PORT)
 })


