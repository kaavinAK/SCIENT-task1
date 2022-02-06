import * as yup from 'yup'

export let loginformschema = yup.object().shape({
    Username:yup.string().max(50).required(),
   
    Password:yup.string().min(5).max(10).required()
   
})