const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const userSchema = new Schema({
    name:{
        type:String,
    },
    googleId:{
        type:String,
    }
})
module.exports = mongoose.model('User',userSchema, 'users')