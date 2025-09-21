import axios from "axios";
const API_URL ="http://localhost:3000/api/users"

//login
export const loginUser =async(Credentials)=>{
    try{
        const res =await axios.post(`${API_URL}/login`,Credentials)
        return res.data  //should {token ,data}

    }catch(error){
        throw error.response?.data || {message:"Login failed"}}
}
//register

export const registerUser= async(userData)=>{
    try{
        const res =await axios.post(`${API_URL}/register`)
        return res.data    //could (message user) or {token}
    }catch(error){
        throw error.response?.data || {message: "registration failed"}
    }
}