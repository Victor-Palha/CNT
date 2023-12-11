import { createContext, useEffect, useState } from "react";
import instance from "../lib/axios";

interface AuthContextProps {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
    SavePlayerInformation(player: Player): void
    player: Player | undefined
}
export const authContext = createContext({} as AuthContextProps)

export interface Player{
    id_player: string,
    username: string,
    email: string,
}
interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({children}: AuthProviderProps){
    const [isAuth, setIsAuth] = useState(false)
    const [player, setPlayer] = useState<Player>()

    function SavePlayerInformation(player:Player){
        localStorage.setItem('@player:cnt', JSON.stringify(player))
        setPlayer(player)
    }

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
        <authContext.Provider value={{isAuth, setIsAuth, SavePlayerInformation, player}}>
            {children}
        </authContext.Provider>
    )
}