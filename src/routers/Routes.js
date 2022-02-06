
import React, { useEffect, useState,useContext } from 'react';
import {Route,Routes,useNavigate} from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Sign from '../components/pages/Sign'
import Userverification from '../components/pages/Userverification'
import axios from '../fetcher/Mainaxios'
import {Contextprovider} from '../redux/Provider'
import Credential from '../404pages/Credentials'
import Nouser from '../404pages/Nouser'
function Routescomp() {
    let context = useContext(Contextprovider)

 useEffect(async()=>
 {
    
          
      
 },[])

  return<>
   <Routes>
       
          <Route  element={<Sign/>} path='/sign' />
          <Route  element={<Login/>} path='/login'   />
          <Route  path='/userverification/:verificationid' element={<Userverification/>} />
          <Route  path='/404/credentials' element={<Credential/>} />
          <Route  path='404/nouser' element={<Nouser/>}  />
          <Route  path='' element={<Home/>}  />
      </Routes>
  </>;
}

export default Routescomp;
