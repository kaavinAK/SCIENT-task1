export let reducer=(state,action)=>
{
    console.log(state,action," state"," actoin ")
    if(action.type=='login')
    {
        return {
            ...state,username:action.payload.username,
            email:action.payload.email,
            login:true
        }
    }
    else
    {
        return {
            ...state,username:'',email:'',
            login:false
        }
    }
}