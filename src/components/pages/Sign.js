import React,{useState,useEffect,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from '../../fetcher/Mainaxios'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {formschema} from '../../formValidators/schemas/form-sign'
import Radiobutton from '../comp/Radiobutton'
import Datepicker from '../comp/Datepicker'
import '../../cssstyles/signform.css'
import {Alert,Link} from '@mui/material'

import {renderWeekPickerDay} from '../../components/comp/Customdate'
let formcleaner=(formdata)=>
{
  formdata.Username=''
  formdata.Password=''
  formdata.Confirmpassword=''
  formdata.Collegename=''
  formdata.Collegeyear=''
  formdata.Rollno=''
}
function Sign() {
 // console.log(formschema);
// let [usernameinput,setusernameinput]=useState('')

let [gender,setgender]=useState('')
    let [date,setdate]=useState('')
// let [emailinput,setemailinput]=useState('')
// let [password,setpassword]=useState('')
let [message,setmessage]=useState('')
let [disablebutton,setdisablebutton]=useState(false)
let [responseerror,setreponseerror]=useState('')
// let [collegeyear,setcollegeyear]=useState('')
// let [collegename,setcollegename]=useState('')
// let [rollno,setrollno]=useState('')
// let [confirmpassword,setconfirmpassword]=useState('')
let {register,handleSubmit,errors,reset} = useForm({
  resolver:yupResolver(formschema)
})
let path=useNavigate()
useEffect(()=>
{
   axios.get('/user').then(({data})=>
   {
      if(data.status=="success")
      {
        path('/')
      }
      else
      {
        
      }
   }).catch(err=>
    {
      if(err)
      {
            
      }
    })
},[])
//console.log('errors --- ',errors)
//console.log("gender ",gender)
//console.log("bruh",date);
let submit=async(formdata)=>
{
// console.log("submitted")
// console.log('errors-----  ',errors)
 console.log("register----",formdata)
 
 if(errors.Username || errors.Password || errors.Confirmpassword || errors.Collegename || errors.Collegeyear ||errors.Rollno || errors.Rollno)
 {
   
   
   return ;
 }
 if(date=="")
 {
   setmessage("please fill the date man ")
   return ;
 }
 //console.log("sending")
  setdisablebutton(true)
   let {data}=await axios.post('/sign',{username:formdata
    .Username,email:formdata.Email,password:formdata.Password,collegeyear:formdata.Collegeyear,collegename:formdata.Collegename,rollno:formdata.Rollno,dob:date,gender})
   if(data.status=='success')
   {
    // setusernameinput('')
    // setemailinput('')
    // setpassword('')
    // setcollegename('')
    // setcollegeyear('')
    // setrollno('')
    // setdate('')
    formcleaner(formdata)
    setmessage('email has been send to the mail ')
    
   
    setTimeout(()=>
    {
      setdisablebutton(false)
   window.location.reload()
    },[2000])
   }
   if(data.status=='failed' && data.message)
   {
        setreponseerror("user already exists")
   }
  
  
}
  return <>
  <div class="login-box">
    <h2>Sign</h2>
  <form onSubmit={handleSubmit(submit)} autoComplete="off">
    <div class="user-box">
  <input  name="Username" type="search" ref={register} autoComplete="off" />
  <label>Username</label>
 
  </div>
 {errors.Username? <Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Username.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}

  <div class="user-box">
  <input autoComplete='off'  type='search' name="Email" ref={register}    />
  <label>Email</label>
  </div>
 
  {errors.Email?<Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Email.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}

  <div class="user-box">
  <input type="search" autoComplete="off"  name="Password"  ref={register}     />
<label>Password</label>
  </div>
{errors.Password? <Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Password.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
  {/* <p className='errormessage'>  {errors.Password?errors.Password.message:''}</p> */}
<div class="user-box">
  <input type="search" autoComplete="off" name="Confirmpassword" ref={register}   />
 <label>Confirmpassword</label>
  </div>

 {errors.Confirmpassword?<> <Alert  style={{marginBottom:"40px"}} variant="filled" severity="error">
    {errors.Confirmpassword.type=='oneOf'?'Password equal pls ':''}
    </Alert>
  </>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
  <div class="user-box" >
  <input type="search" autoComplete="off"  name="Collegename" ref={register}   />
 <label>Collegename</label>
  </div>
 {errors.Collegename?<Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Collegename.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
<div class="user-box">
  <input  type="search" autoComplete="off"   name="Rollno" ref={register}   />
  <label>Rollno</label>
  </div>
  {errors.Rollno?<Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Rollno.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
 <div class="user-box">
  <input type="search" autoComplete="off"  name="Collegeyear" ref={register}   />
  <label>Collegeyear</label>
  </div>
   {errors.Collegeyear?<>
  {errors.Collegeyear.type=='typeError'?<Alert style={{marginBottom:"40px"}} variant="filled" severity="error"> Year must be a number </Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
  </>:''}
  <div style={{marginBottom:"20px"}}>
  <Radiobutton setgender={setgender}/>
  </div>
  {/* background-color: yellow;
    height: 16vh;
    width: 40%;
    border-radius: 5px;
    position: absolute; */}
  <div style={{"height":"10vh","paddingTop":"10px","paddingLeft":"10px","width":"20vw","backgroundColor":"#d4af37","borderRadius":"5px"}} >
  <div style={{"background": "linear-gradient(135deg, #9a0dfe, #637dfb)","height":"7.5vh","width":"30%","position":"absolute","borderRadius":"5px","backgroundSize":"cover"}}    > </div>
 
  <Datepicker  date={date} setdate={setdate}/>
  </div>
 <div className='signbuttondiv'>
  <button class="signbutton"  disabled={disablebutton}  >sign</button>
  
  </div>
  </form>
  <br></br>
  {responseerror?<Alert variant='filled' severity='error' style={{marginBottom:"20px"}}>{responseerror}</Alert>:<>{message?<Alert variant='filled' severity='success' style={{marginBottom:"20px"}}>{message}</Alert>:<p style={{marginBottom:"20px",height:"40px"}}></p>}</>}
 
 <p style={{color:"white"}}> Have an account?  <Link underline="hover" onClick={()=>
{
  path('/login')
}}>
 login here
</Link></p>
  </div>
  </>;
}

export default Sign;
