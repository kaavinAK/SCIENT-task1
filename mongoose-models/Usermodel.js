let mongoose = require('mongoose')

let Schema =  mongoose.Schema

let Userschema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    collegeyear:{
type:String,
required:true
    },
    collegename:{
type:String,
required:true
    },
    rollno:{
type:String,
required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
},{timestamps:true})

let User = mongoose.model('users',Userschema)
module.exports=User