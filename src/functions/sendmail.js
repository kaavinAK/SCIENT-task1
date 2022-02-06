let {transporter}=require('../mail')
require('dotenv').config()
// let reciever={
//     from:'kaavinak@outlook.com',
//     to:'kaavinak@gmail.com',
//     subject:'sample brother',
//     text:'sample from nodesj uding node mail'

// };
// transporter.sendMail(reciever,(err,info)=>
// {
//     if(err)
//     {
//         console.log(err)
//         return ;
//     }
//     else
//     {
//         console.log(info.response)
//     }
// })

let sendmail=(mail,verificationid,res)=>
{
    let reciever={
        from:process.env.SENDEREMAIL,
        to:mail,
        subject:'link for verification',
        text:'http://localhost:3000/userverification/'+verificationid
    
    };
    transporter.sendMail(reciever,(err,info)=>
{
    if(err)
    {
        console.log(err)
        return res.json({status:'failed',message:'email not send'})
    }
    else
    {
        console.log(info.response)
        return res.json({status:'success'})
    }
    
})
}

module.exports=sendmail