let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bcrypt=require('bcrypt')
let sendemail=require('./src/functions/sendmail')
let {uuid}=require('uuidv4')
let passport = require('passport')
let keys = require('./config/keys')
let jwt = require('jsonwebtoken')
require('dotenv').config()
let cors = require('cors')
let cookieparser = require('cookie-parser')
let User = require('./mongoose-models/Usermodel')
let Userverification=require('./mongoose-models/Userverificationmodel')
let Usersession = require('./mongoose-models/Usersessionmodel')
let corsoption={
    origin:'http://localhost:3000',
    credentials:true
}
mongoose.connect(process.env.MONGOURL).then(()=>
{
    app.listen(process.env.PORT,()=>
    {
         console.log("server started and connected ... ")
    })
})
app.use(express.json())
app.use(cors(corsoption))
app.use(cookieparser())
app.use(passport.initialize())
app.post('/sign',async(req,res)=>
{
    let {username,password,email,collegeyear,collegename,rollno,dob,gender}=req.body
    console.log('cookie hit ',req.cookies)
    let ouser=await User.findOne({username})
    if(ouser)
    {
        return res.json({status:'failed',message:"user already exists"})
    }
    else
    {
    let verificationid = uuid()  
  
        let salt = await bcrypt.genSalt(10)
        console.log(password)
        let encryptedpassword=await bcrypt.hash(password,salt)
        let userverification = new Userverification({
            username,email,password:encryptedpassword,verificationid,collegename,collegeyear,rollno,dob,gender
        })
        await userverification.save()
        console.log(username,collegeyear,'   saved')
         sendemail(email,verificationid,res)
      
    }
  
})

app.get('/userverification/:verificationid',async(req,res)=>
{
    let {verificationid}=req.params
    console.log("userverification hit ")
    let userverified = await Userverification.findOne({verificationid})
    if(userverified)
    {
       
        let newuser=new User({
            username:userverified.username,
            password:userverified.password,
            email:userverified.email,
            collegename:userverified.collegename,
            collegeyear:userverified.collegeyear,
            rollno:userverified.rollno,
            dob:userverified.dob,
            gender:userverified.gender
        })
        await newuser.save()
        await Userverification.findOneAndRemove({verificationid})

        return res.json({status:"success",message:"verified"})
    }
    else
    {
        return res.json({status:"failed",message:"expired"})
    }
})

app.post('/login',async(req,res)=>
{
    let {username,password}=req.body
    console.log(username,password)
    let ouser = await User.findOne({username})
    console.log("ouser  ",ouser)
    if(ouser)
    {
        
        if(await bcrypt.compare(password,ouser.password))
        {
              let token = jwt.sign(ouser.id,keys.jwtsecret)
              console.log("token   ",token)
              res.cookie('token',token)
              let oldsession =  await Usersession.findOne({username:ouser.username,email:ouser.email})
              if(oldsession)
              {
                  console.log("old sessions exists  ")
                    oldsession.remove()
                    
              }
              
              let usersession = new Usersession({
                  username:ouser.username,
                  email:ouser.email
              })
              await usersession.save()
              return res.json({status:"success",message:"logged in",data:ouser})
        }
        else
        {
               return res.json({status:"failed",message:"wrong credentials"})
        }
    }
    else
    {
        return res.json({status:"failed",message:"no user"})
    }
   

})


require('./config/passport')(passport)


app.get('/home',passport.authenticate('jwt',{session:false}),async(req,res)=>
{
    console.log(req.user)
    let liveusers = await Usersession.find()
    let users=[]
   
    if(liveusers.length>0)
    {
        for(let i=0;i<liveusers.length;i++)
        {
              let user = await User.findOne({username:liveusers[i].username})
              if(user.username==req.user.username)
              {
                 
              }
              else

              {
                  user.dob=user.dob.split("T")[0]
                users.push({gender:user.gender,username:user.username,email:user.email,collegename:user.collegename,collegeyear:user.collegeyear,dob:user.dob,rollno:user.rollno})
       
              }
              }
    }
    console.log("users man ",users)
    return res.json({status:'success',data:users})
})

app.get('/user',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    let currentuser;
    if(req.user)
    {
        req.user.dob=req.user.dob.split("T")[0]
        currentuser={
            username:req.user.username,email:req.user.email,collegename:req.user.collegename,collegeyear:req.user.collegeyear,dob:req.user.dob,rollno:req.user.rollno,
            gender:req.user.gender
        }
        return res.json({status:"success",data:currentuser})
    }
    else
    {
        return res.json({status:"failed"})
    }
})

app.get('/logout',passport.authenticate('jwt',{session:false}),async(req,res)=>
{
    console.log("logged out man")
    let oldsession =  await Usersession.findOne({username:req.user.username,email:req.user.email})
    if(oldsession)
    {
        oldsession.remove()
    }
    res.cookie("token","")
    return res.json({
        status:"success",
        message:"failed"
    })
         
})
