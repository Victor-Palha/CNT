import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PrepareRoom, confrontContext } from "../../context/confrontContext"

export function Confront(){
    const {socket} = useContext(confrontContext)
    const {room_id} = useParams()

    const [room, setRoom] = useState<PrepareRoom>({} as PrepareRoom)

    useEffect(()=>{
        console.log(room_id)
        socket && socket.emit("room_Info", room_id)
            .on("room_Info", (room: PrepareRoom)=>{
                console.log(room)
                setRoom(room)
            })
    }, [socket])

    if(socket){
        return (
            
            <main>
                {room.players && (
                    <div className="grid grid-cols-3 h-[50vh]">
                        <div>
                            <p>{room.players[0].player}</p>
                        </div>
                        <div>
                            <button>Let`s Go</button>
                        </div>
                        {room.players.length > 1 && (
                            <div>
                                <p>{room.players[1].player}</p>
                            </div>
                        )}
                    </div>
                )}
                <div className="w-full code-block h-[15vh]">
                    {room.messages && room.messages.map((message, index) => (
                        <div className="flex justify-between" key={index}>
                            <p>{message.playerName}</p>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <form>
                    <textarea
                        className="w-full h-[10vh] code-block bg-gray-800"
                    ></textarea>
                    <button className="cyber-razor-top bg-red w-full">
                        <p className="text-white font-bold">Enviar</p>
                    </button>
                </form>
            </main>
        )
    }
}