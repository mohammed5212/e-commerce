import {  createContext,useState } from "react"
import { loginUser } from "../api/authApi";

const AuthContext= createContext();
const AuthProvider=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token") || "");
    const [user, setUser]=useState(
        localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null
    )
    const handleLogin = async(credentials)=>{
        try{
            const data =await loginUser(credentials);
            const token=data?.token;
            const user =data?.user;
            if (token){
                setToken(token);
                localStorage.setItem("token",token);
            }
            if (user){
                setUser(user);
                localStorage.setItem("user",JSON.stringify(user));

            }
        }catch(error){
            console.error("Login failed",error);
            throw error;
        }
        
    }
    const handleLogout =()=>{
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    return(
        <AuthContext.Provider value={{token, user ,handleLogin,handleLogout}}>
        {children}
        </AuthContext.Provider>
    )
};
export  {AuthContext,AuthProvider};