import * as yup from 'yup'

export let formschema = yup.object().shape({
    Username:yup.string().max(50).required(),
    Email:yup.string().email().required(),
    Rollno:yup.string().length(9).required(),
    Collegename:yup.string().required(),
    Collegeyear:yup.number().positive().min(1).max(4).required(),
    Password:yup.string().min(5).max(10).required(),
    Confirmpassword:yup.string().oneOf([yup.ref('Password'),null])
   
})