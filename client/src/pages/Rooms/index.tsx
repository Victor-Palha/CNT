import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Player } from "../../context/authContext"
import { confrontContext } from "../../context/confrontContext"

interface PrepareRoom{
    room_id: string;
    room_name: string;
    host: string;
    players: {
        socket_id: string;
        player: string;
        ready: boolean;
        deck_id: string;
    }[]
    messages: {
        playerName: string;
        message: string;
    }[]
    inConfront: boolean;
}

export function Rooms(){
    const navigate = useNavigate()
    const {socket} = useContext(confrontContext)
    let player = localStorage.getItem('@player:cnt') as any
    player = player ? JSON.parse(player) as Player : null

    const [rooms, setRooms] = useState<PrepareRoom[]>([])

    const [nameRoom, setNameRoom] = useState("")

    async function createRoom(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(nameRoom === "") return

        socket && socket.emit("create_Room", {
            room_name: nameRoom,
            player_id: player.id_player,
        }).on("room_created", (room_id) =>{
            return navigate("/confront/"+room_id)
        })
    }

    async function joinRoom(room_id: string){
        socket && socket.emit("join_Room", {
            room_id,
            player_id: player.id_player,
        }).on("room_joined", (room_id) =>{
            return navigate("/confront/"+room_id)
        })
    }

    useEffect(()=>{
        socket && socket.on("rooms", (rooms: PrepareRoom[])=>{
            // console.log(rooms)
            setRooms(rooms)
        })
    }, [socket])

    return (
        
        <main>
            <header className="cyber-razor-bottom bg-black flex justify-center">
                <Link to="/">
                    <h1 className="text-5xl p-4 text-blue-500 ">
                        {socket && socket.id}
                    </h1>
                </Link>
            </header>
            <div className=" grid grid-cols-2 ">
                <div className="p-4">
                    <table className="cyber-table cyber-style-2">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nome</th>
                                <th>Players</th>
                                <th>Entrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr key={room.room_id}>
                                    <td>{room.room_id}</td>
                                    <td>{room.room_name}</td>
                                    <td>{room.players.length}/2</td>
                                    <td>
                                        <button className="cyber-button-small bg-red fg-white" onClick={()=>joinRoom(room.room_id)}>
                                            <p>Entrar</p>
                                            <span className="glitchtext">Danger</span>
                                            <span className="tag">3023</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="h-[80vh] p-10 text-white cyber-glitch-0">
                    <h1 className="cyber-h">Criar sala</h1>
                    <p className="m-2">Escolha um nome e seu deck</p>
                    <form className="flex gap-4" onSubmit={(e)=>createRoom(e)}>
                        <div className="flex flex-col gap-4">
                            <div className="cyber-input">
                                <input type="text" placeholder="Nome da sala" 
                                    value={nameRoom}
                                    onChange={(e)=>setNameRoom(e.target.value)}
                                />
                            </div>
                        </div>
                        {nameRoom != "" && (
                            <button className="cyber-button bg-red fg-yellow">Criar Sala</button>
                        )}
                            
                    </form>
                </div>
            </div>
        </main>
    )
}