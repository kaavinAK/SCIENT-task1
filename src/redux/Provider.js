import React,{useContext,useReducer} from 'react';
import {initialstate} from './initialstate'
import {reducer} from './reducer'
export let Contextprovider=React.createContext({}) 


function Provider({children}) {
let [state,dispatch]=useReducer(reducer,initialstate)
  return <Contextprovider.Provider value={{state,dispatch}} >
{children}
  </Contextprovider.Provider>;
}

export default Provider;
