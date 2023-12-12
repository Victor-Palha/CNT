import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface ConfrontContextProps {
    socket: Socket | undefined;
}

export const confrontContext = createContext({} as ConfrontContextProps)
type ConfrontProviderProps = {
    children: React.ReactNode
}


export function ConfrontProvider({children}: ConfrontProviderProps){
    const [socket, setSocket] = useState<Socket | undefined>()
    
    useEffect(()=>{
        const socket = io("http://localhost:3000")
        setSocket(socket)
    }, [])
    return (
        <confrontContext.Provider value={{socket}}>
            {children}
        </confrontContext.Provider>
    )
}