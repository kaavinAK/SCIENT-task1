let mongoose = require('mongoose')

let Schema =  mongoose.Schema

let Usersessionschema = new Schema({
    username:{
     type:String,
     required:true
    },email:{
        type:String
    },
    createdAt: { type: Date, expires: 60*60*48 ,default: Date.now}
},{timestamps:true})

let Usersession = mongoose.model('usersessions',Usersessionschema)
module.exports=Usersession