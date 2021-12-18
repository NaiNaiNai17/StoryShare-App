const mongoose = require('mongoose')
const connectDB =  async () =>{

try {
  const connect = await mongoose.connect(
 `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("we are connected to the database.")
    } catch (err) {
       console.log("an error occurred while connecting ot the db", err) 
        process.exit(1)
    }
    
  }
 
  

module.exports = connectDB