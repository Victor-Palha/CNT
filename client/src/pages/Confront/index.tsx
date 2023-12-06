import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
export function Confront(){
    const {player_id, deck_id, room_id} = useParams()
    const socket = io("http://localhost:3000",{
        autoConnect: true
    })

    useEffect(()=>{

        socket.emit("joinRoom",{
            player_id,
            deck_id,
            room_id
        })

        socket.on("joinedRoom", (data)=>{
            console.log(data)
        })
    }, [])
    return (
        <main>
            <h1>Confronto</h1>
            <p>{player_id}</p>
            <p>{deck_id}</p>
            <p>{room_id}</p>
        </main>
    )
}