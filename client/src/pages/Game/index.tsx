import { useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

export function Game(){
    const [socketGame, setSocketGame] = useState<Socket>(io("http://localhost:3000/confronts"))
    
    
    return (
        <main>

        </main>
    )
}