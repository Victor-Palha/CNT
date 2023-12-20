import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { authContext } from "../../context/authContext"
import { PrepareRoom, confrontContext } from "../../context/confrontContext"

export function Rooms(){
    const navigate = useNavigate()
    const {socket, player} = useContext(confrontContext)
    const {isAuth} = useContext(authContext)

    const [rooms, setRooms] = useState<PrepareRoom[]>([])

    const [nameRoom, setNameRoom] = useState("")

    async function createRoom(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(nameRoom === "") return

        player && socket && socket.emit("create_Room", {
            room_name: nameRoom,
            player_id: player.id_player,
        }).on("room_created", (room_id) =>{
            return navigate("/confront/"+room_id)
        })
    }

    async function joinRoom(room_id: string){
        player && socket && socket.emit("join_Room", {
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
            {!isAuth && (
                <Navigate to='/login'/>
            )}
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
                    <h1 className="cyber-h">Criar sistema Nexus</h1>
                    <p className="m-2">Escolha um nome para seu sistema Nexus</p>
                    <form className="flex gap-4 flex-wrap" onSubmit={(e)=>createRoom(e)}>
                        <div className="flex flex-col gap-4">
                            <div className="cyber-input">
                                <input type="text" placeholder="Nome da sala" 
                                    value={nameRoom}
                                    onChange={(e)=>setNameRoom(e.target.value)}
                                />
                            </div>
                        </div>
                        {nameRoom != "" && (
                            <button type="submit" className="cyber-button bg-red fg-yellow">Criar Sala</button>
                        )}
                            
                    </form>
                </div>
            </div>
        </main>
    )
}