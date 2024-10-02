import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {

    const [token, setToken] = useState(Cookies.get('accessToken'))
    const [user, setUser] = useState("")
    const authorization = `Bearer ${token}`;

    const storeTokenInCookies = (generateToken) => {
        setToken(generateToken)
        return Cookies.set('accessToken', generateToken, {expires: 1});
    }

    const isLoggedIn = !!token;

    const logoutUser = () => {
        setToken("");
        setUser("")
        return Cookies.remove('accessToken');
    }

    const userAuthntication = async() =>{
        try {
            const response = await fetch(`http://localhost:4000/api/drivo/user/getuser`, {
                method: "GET",
                headers: {
                    Authorization: authorization
                }
            })

            const data = await response.json()
            // console.log(data.userData);
            if(response.ok){
                setUser(data.userData);
            } else {
                setUser("")
            }
        } catch (error) {
            console.log("Error fetching user data", error);
        }
    }

    useEffect(() => {
        userAuthntication();
    }, [userAuthntication])

    
    return (
        <AuthContext.Provider value={{storeTokenInCookies, logoutUser, isLoggedIn,setUser, user, authorization}}>
            {children}
        </AuthContext.Provider>
    )
}