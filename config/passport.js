let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt
let User = require('../mongoose-models/Usermodel')
let keys = require('./keys')



let cookieExtracter=(req)=>
{
    let token=null
    if(req && req.cookies)
    {
        token=req.cookies['token']
    }
    return token
}
let opts={}
opts.jwtFromRequest = cookieExtracter

opts.secretOrKey = keys.jwtsecret




module.exports=passport=>
{
   passport.use(new JwtStrategy(opts,async(jwtpayload,done)=>
   {
       console.log(jwtpayload)
       let user = await User.findById(jwtpayload)
       console.log('sup  ',user)
       if(user)
       {
           return done(null,user)
       }
       else
       {
           return done(null,false)
       }
   }))
}