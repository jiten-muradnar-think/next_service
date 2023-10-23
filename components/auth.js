import React, { createContext,useContext,useState } from "react";

export const AuthContext = createContext({});

export  function  AuthProvider({children}){

    const [user,setUser]=useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        phone:'',
        additionalInformation:''})

    const [cartItemCount,setCartItemCount]=useState(0)
    console.log("cartItemCount======>",cartItemCount)
    
    const login = (userProp) =>{
        let tokenData = {...userProp[0],password:''}
        localStorage.setItem("token",JSON.stringify(tokenData));
    }

    const logout = () =>{
        setUser( {    
                    firstName: '',
                    lastName: '',
                    address: '',
                    email: '',
                    password: '',
                    phone:'',
                    additionalInformation:''
                })

        localStorage.clear();
		localStorage.removeItem('token')
    }

    return <AuthContext.Provider value={{user,login,logout,setUser,cartItemCount,setCartItemCount}}>
                 {children}
    </AuthContext.Provider>
}

export const useAuth = () =>{
    return useContext(AuthContext);
}