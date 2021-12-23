const {Schema, model} = require('mongoose');


const JwtSchema = new Schema({

    createdOn:{type:Date, required:true, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email: {
        type: String,
        required: true,
        unique: true
     },
    password: {
        type: String,
        required: true
    }
   
});

const User = model('JwtUser', JwtSchema);

module.exports = JwtUser;