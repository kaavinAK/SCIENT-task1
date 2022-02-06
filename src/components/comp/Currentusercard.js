import React from 'react';
import '../../cssstyles/currentusercard.css'
function Currentusercard({username,email,rollno,collegename,collegeyear,dob,gender}) {
  return <>
  
 < div class="container">
  <div class="box">
    <span></span>
    <div class="content">
      <h2>Name: {username}</h2>
     
      <h3>Email: {email}</h3>
      <br/>
      <h3>Rollno: {rollno}</h3>
      <br/>
      <h3>Collegename: {collegename}</h3>
      <br/>
      <h4>Gender: {gender}</h4>
      <br/>
      <h4>Collegeyear: {collegeyear} </h4>

      <br/>
      <h4>DOB: {dob}</h4>
    </div>
  </div>
  
  
</div>
  
  </>;
}

export default Currentusercard;
