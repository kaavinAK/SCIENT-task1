import  React,{useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({setgender}) {
    let choosegender=(e)=>
    {
       
          if(e.target.checked && e.target.value=='female')
          {
            
              setgender('female')
          }
          if(e.target.checked && e.target.value=='male')
          {
           
              setgender('male')
          }
    }
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" style={{"color":"#03e9f4"}}>Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel style={{"color":"#03e9f4"}}   value="female"  control={<Radio onChange={(e)=>{choosegender(e)}} />} label="Female" />
        <FormControlLabel value="male" style={{"color":"#03e9f4"}} control={<Radio onChange={(e)=>{choosegender(e)}} />} label="Male" />
        
      </RadioGroup>
    </FormControl>
  );
}