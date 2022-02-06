import React,{useState,useEffect,useContext} from 'react';
import axios from '../../fetcher/Mainaxios'
import {useNavigate} from 'react-router-dom'
import {Contextprovider} from '../../redux/Provider'
import {loginformschema} from '../../formValidators/schemas/form-login'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import '../../cssstyles/loginform.css'
import {Alert,Link} from '@mui/material'

function Login() {
    let context=useContext(Contextprovider)
    let [errorreponse,seterrorreponse]=useState("")
    let path = useNavigate()
    let {register,handleSubmit,errors} = useForm({
        resolver:yupResolver(loginformschema)
    })
  
useEffect(()=>
{
    axios.get('/user').then(({data})=>
    {
              if(data.status=="success")
              {
                 context.dispatch({
                      type:"login",
                      payload:data.data
                  })
                  path('/')
              }
    }).catch(err=>
        {
            if(err)
            {

            }
        })
},[])

    let submit=async(formdata)=>
    {
        console.log(errors)
        if(errors.Username || errors.Password )
        {
            return 
        }
        let {data} =await  axios.post('/login',{username:formdata.Username,password:formdata.Password})
        console.log(data)
        if(data.status=="success")
        {
            localStorage.setItem('username',formdata.Username)
            context.dispatch({
                type:'login',
                payload:data.data
            })

 path('/')
        }
        if(data.status=="failed" && data.message=='wrong credentials')
        {
            seterrorreponse("wrong credentials given")
//    path('/404/credentials')
        }
        if(data.status=='failed' && data.message=='no user')
        {
// path('/404/nouser')
seterrorreponse("no such user exists ")
        }
    }
      return <>
      <div className="loginpage" style={{"position":"absolute","top":"45%","left":"50%"}}>
      <div className="login-box" >
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submit)} autoComplete="off">
     <div className="user-box">
      <input  type="text" ref={register} name="Username"   />
       <label>Username</label>
      </div>
      {errors.Username? <Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Username.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}

    
      <div className="user-box">
      <input type="password"  ref={register} name="Password"    />
  
      <label>Password</label>
      </div>
      {errors.Password? <Alert style={{marginBottom:"40px"}} variant="filled" severity="error">{errors.Password.message}</Alert>:<p style={{height:"40px",marginBottom:"40px"}}>''</p>}
      
      <button class="loginbutton" >
      <span></span>
      <span></span>
      <span></span>
      <span></span>login</button>
 
{errorreponse?<Alert style={{marginBottom:"20px",marginTop:"20px"}} variant="filled" severity='error' >{errorreponse}</Alert>:<p style={{marginBottom:"20px"}}>''</p>}
<p style={{color:"white"}}> Dont have an account? <Link underline="hover" onClick={()=>
{
  path('/sign')
}}>
 Signup Here
</Link></p>
      </form>
 
      </div>
     
      </div>

      </>;
}

export default Login;
