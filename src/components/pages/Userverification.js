import React, { useEffect,useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import axios from '../../fetcher/Mainaxios'

function Userverification() {
    let {verificationid}=useParams()
    let [message,setmessage]=useState('')
    let path = useNavigate()
    useEffect(async()=>
    {
        if(verificationid)
        {
             let {data}=await axios.get('/userverification/'+verificationid)
             if(data.status=='success')
             {
                   path('/login')
             }
             else
             {
                setmessage('email has been expired')
             }
        }
    },[])
  return <>
  
  ACCOUNT IS GETTING VERIFIED PLEASE WAI
  {message}
  </>;
}

export default Userverification;
