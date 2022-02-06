import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {use} from '@mui/material'
 

export default function BasicDatePicker({date,setdate}) {
  const [value, setValue] = React.useState(null);
  console.log("date value ",date)

  return (
    
    <LocalizationProvider   dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date of Birth"
        value={date}
        
        onChange={(newValue) => {
          setdate(newValue);
        }}
        
        renderInput={(params) => < TextField  {...params} />}
      />
    </LocalizationProvider>
  );
}
