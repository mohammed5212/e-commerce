import axios from "axios";
const API_URL ="http://localhost:3000/api/auth"

//login
export const loginUser =async(Credentials)=>{
    console.log("Logged in user:", user);
    try{
        const res =await axios.post(`${API_URL}/login`,Credentials)
        return res.data  //should {token ,data}

    }catch(error){
        throw error.response?.data || {message:"Login failed"}}
}
//register

export const registerUser= async(userData)=>{
    try{
        const res =await axios.post ("http://localhost:3000/api/auth/register/",userData)
        return res.data    //could (message user) or {token}
    }catch(error){
        throw error.response?.data || { message: "Network error or server unreachable." }
    }
}