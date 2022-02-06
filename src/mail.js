let nodemail=require('nodemailer')
require('dotenv').config()
// let transporter=nodemail.createTransport({
//     service:'hotmail',
//     auth:{
//         user:'kaavinak@outlook.com',
//         pass:'gak5679v'
//     },
//      tls: {rejectUnauthorized: false}
    
// })
let transporter = nodemail.createTransport(process.env.OUTLOOK);

// let reciever={
//     from:'kaavinak@outlook.com',
//     to:'kaavinak@gmail.com',
//     subject:'sample brother',
//     text:'sample from nodesj uding node mail'

// };
module.exports={transporter}
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