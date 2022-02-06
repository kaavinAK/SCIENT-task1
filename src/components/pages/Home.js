import React,{useEffect,useState,useContext} from 'react';
import axios from '../../fetcher/Mainaxios'
import {useNavigate} from 'react-router-dom'
import {Contextprovider} from '../../redux/Provider'
import Navbar from '../comp/Navbar'
import Card from '../comp/Card'
import {Grid} from '@mui/material'
import "../../cssstyles/home.css"
import Currentusercard from '../comp/Currentusercard';
function Home() {
  let context=useContext(Contextprovider)

let [email,setemail]=useState('')
let [liveusers,setliveusers]=useState([])
let [currentuser,setcurrentuser]=useState({})
let path = useNavigate()
useEffect(async()=>
{
axios.get('/user').then(async({data})=>
{ 
 
  if(data.status="success")
  {
      setcurrentuser(data.data)
  }
  try{
    let {data} = await axios.get('/home')
    
    if(data.status=="success")
    {
      setliveusers(data.data)
    }
  }
     
     catch(e)
     {
           if(e)
           {
   //   path('/sign')
           }
     }
 

}).catch(err=>
  {
    if(err)
    {
      path('/login')
 
    }
  })

  

    
},[])

  return <>
  <Navbar/>


<Currentusercard gender={currentuser.gender} username={currentuser.username} email={currentuser.email} rollno={currentuser.rollno} collegename={currentuser.collegename} collegeyear={currentuser.collegeyear} dob={currentuser.dob} />



<div style={{fontSize:45,fontWeight:"bold",color:"white",textAlign:"center"}} >USERS LIVE NOW</div>
<div  className="cardgrid">
<Grid container   style={{"paddingLeft":"11%","alignSelf":"center"}}  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
{
  liveusers.map((user)=>
  {
    console.log("username  ",user)
    let {username,collegename,collegeyear,email,dob,rollno,gender}=user
    return <>
    
  <Grid item xs={6}>
    <Card username={username} gender={gender} collegename={collegename} collegeyear={collegeyear} email={email} dob={dob} rollno={rollno}/>
  </Grid>
 

    </>
  })
}
</Grid>
</div>
  </>;
}

export default Home;
