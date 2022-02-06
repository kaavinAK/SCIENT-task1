let mongoose = require('mongoose')

let Schema =  mongoose.Schema

let Userverificationschema = new Schema({
   verificationid:{
       type:String,
       required:true
   },
   username:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true
   } , password:{
    type:String,
    required:true
},   collegeyear:{
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
        },
createdAt: { type: Date, expires: 60*5 ,default: Date.now}

},{timestamps:true})

let Userverification = mongoose.model('userverifications',Userverificationschema)
module.exports=Userverification