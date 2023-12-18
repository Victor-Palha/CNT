import { useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { confrontContext } from "../../context/confrontContext"
import { Player } from "../../context/authContext"
import instance from "../../lib/axios"

type PrepareRoom = {
    room_id: string;
    room_name: string;
    host: string;
    players: {
        socket_id: string;
        player: string;
        ready: boolean;
    }[]
    messages: {
        playerName: string;
        message: string;
    }[]
    inConfront: boolean;
}

type MyDecks = {
    id_deck: string;
    name: string;
    player_id: string;
    avatar_id: string;
}

export function Confront(){
    let player = localStorage.getItem('@player:cnt') as any
    player = player ? JSON.parse(player) as Player : null

    const {socket} = useContext(confrontContext)
    const {room_id} = useParams()

    const [room, setRoom] = useState<PrepareRoom>({} as PrepareRoom)
    const [ready, setReady] = useState<boolean>(false)
    const [myDecks, setMyDecks] = useState<MyDecks[]>([])
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<{playerName: string, message:string}[]>([])
    const [chooseDeck, setChooseDeck] = useState<string>("")

    function sendMessage(e: React.KeyboardEvent<HTMLTextAreaElement>){
        if(e.key === "Enter"){
            e.preventDefault()
            socket && socket.emit("send_Message", {message, room_id})
            setMessage("")
        }
    }

    async function handleDeck(){
        const response = await instance.get("/api/myDecks", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@token:cnt")}`
            }
        })

        setMyDecks(response.data.decks)
    }

    function handleChooseDeck(deck_id: string){
        socket && socket.emit("choose_Deck", {deck_id, room_id})
        setChooseDeck(deck_id)
    }

    function handleReady(ready: boolean){
        socket && socket.emit("player_Ready", {ready, room_id, socket_id: socket.id})
        setReady(ready)
    }

    function leaveRoom(){
        socket && socket.emit("leave_Room", room_id)
        window.location.href = "/confront/rooms"
    }

    function startGame(){
        socket && socket.emit("start_Game", room_id)
    }

    useEffect(()=>{
        socket && socket.emit("room_Info", room_id)
            .on("room_Info", (room: PrepareRoom)=>{
                setRoom(room)
                setMessages(room.messages)
            }).on("new_Message", (message)=>{
                setMessages(message)
            })
        handleDeck()
    }, [socket])

    if(socket){
        return (
            <main>
                {room.inConfront && (
                    <Navigate to={`/confront/${room_id}/${chooseDeck}/game`}/>
                )}
                {!room && (
                    <Navigate to={`/confront/rooms`}/>
                )}
                <header className="cyber-razor-bottom bg-black p-4 z-0">
                    <button className="cyber-button-small bg-red" onClick={leaveRoom}>
                        Desconectar
                        <span className="glitchtext">Fracote</span>
                    </button>
                </header>
                {room.players && (
                    <div className="grid grid-cols-2 h-[50vh]">
                        <div className="p-10">
                            <table className="cyber-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Rank</th>
                                        <th>Pronto?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {room.players.map((player, index) => (
                                        <tr key={index}>
                                            <td>{player.player}</td>
                                            <td>Senhor Robô</td>
                                            <td>{player.ready ? "Sim" : "Não"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h3 className="cyber-h">
                                Configurações
                            </h3>
                            <div className="cyber-select">
                                <select onChange={(e)=>{
                                    handleChooseDeck(e.target.value)
                                }}>
                                    <option value="">Selecione um deck</option>
                                    {myDecks && myDecks.map((deck, index) => (
                                        <option key={index} value={deck.id_deck}>{deck.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-4">
                                <input 
                                    type="checkbox" 
                                    name="Ready" 
                                    className="cyber-check ac-blue mr-4"
                                    checked={ready}
                                    onChange={()=>handleReady(!ready)}
                                />
                                <label htmlFor="Ready">Preparado</label>
                            </div>
                            {player && player.username === room.host && ready && (
                                <button className="cyber-button-small bg-red mt-4" onClick={startGame}>
                                    Iniciar
                                    <span className="glitchtext">Danger</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className="cyber-razor-top bg-black bottom-0 left-0">
                    
                    <div className="w-full code-block h-[200px] overflow-scroll first:text-red-500 cyber-glitch-2">
                        {messages && messages.map((message, index) => (
                            <div 
                                className={"flex " + (message.playerName === player.username && "text-white")}
                                key={index}
                            >
                                <p></p>
                                <p><span className="font-bold italic text-[16px] mr-2">{message.playerName}$</span> {message.message}</p>
                            </div>
                        ))}
                    </div>
                
                    <textarea
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        onKeyDown={(e)=>sendMessage(e)}
                        className="w-full min-h-[10vh] max-h-[10vh] bg-gray-800 focus:outline-none p-4 text-white"
                    />
                </div>
            </main>
        )
    }
}