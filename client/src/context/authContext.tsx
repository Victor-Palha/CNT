import { createContext, useEffect, useState } from "react";
import instance from "../lib/axios";

interface AuthContextProps {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}
export const authContext = createContext({} as AuthContextProps)

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps){
    const [isAuth, setIsAuth] = useState(false)

    useEffect(()=>{
        function checkAuth(){
            instance('/api/verify', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@token:cnt')}`
                }
            }).then(res => {
                if(res.status === 200){
                    setIsAuth(true)
                }
            }).catch(err => {
                console.log(err)
            })
        }
        checkAuth()
    },[isAuth])
    return (
        <authContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </authContext.Provider>
    )
}