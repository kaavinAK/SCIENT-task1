import axios from 'axios'


let axiosInstance  = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials:true
})

export default axiosInstance

