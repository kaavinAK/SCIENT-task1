import React from 'react';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom'
import Home from '../components/pages/Home'
import Login from '../components/pages/Login'
import Sign from '../components/pages/Sign'
import Userverification from '../components/pages/Userverification'
import Provider from '../redux/Provider';
import MainRouter from './Routes'

function Main() {
  return <>
  
  <Provider>
  <Router>
    <MainRouter/>
  </Router>
  </Provider>
  </>;
}

export default Main;
