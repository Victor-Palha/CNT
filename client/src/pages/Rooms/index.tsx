import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../lib/axios"
import { MyDeck } from "../Deck"
import { Player } from "../../context/authContext"


export function Rooms(){
    let player = localStorage.getItem('@player:cnt') as any
    player = player ? JSON.parse(player) as Player : null

    const [myDecks, setMyDecks] = useState<MyDeck[]>([])
    const [selectedDeck, setSelectedDeck] = useState("")
    async function fetchMyDecks(){
        const response = await instance("/api/myDecks", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("@token:cnt")}`
            }
        })

        setMyDecks(response.data.decks)
    }

    useEffect(()=>{
        fetchMyDecks()
    }, [])

    return (
        <main>
            <header className="cyber-razor-bottom bg-black flex justify-center">
                <Link to="/">
                    <h1 className="text-5xl p-4 text-blue-500 cyberpunk-font">
                        CNT
                    </h1>
                </Link>
            </header>
            <div className="flex justify-center pt-10 flex-col items-center gap-20">
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
                        {/* <tr>
                            <td>1xf5e</td>
                            <td>Room 1</td>
                            <td>1/4</td>
                            <td><button className="cyber-button-small bg-red fg-white">Entrar</button></td>
                        </tr>
                        <tr>
                            <td>9xt3e</td>
                            <td>Room 2</td>
                            <td>2/4</td>
                            <td><button className="cyber-button-small bg-red fg-white">Entrar</button></td>
                        </tr> */}
                        <tr>
                            <td>tx75e</td>
                            <td>Room 3</td>
                            <td>0/4</td>
                            <td>
                                <Link to={`/confront/${player.id_player}/${selectedDeck}/tx75e`} className="cyber-button-small bg-red fg-white">Entrar</Link>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="cyber-att">Selecione seu Deck</h2>
                    <div className="cyber-select">
                        <select onChange={(e)=>setSelectedDeck(e.target.value)}>
                            <option value="0">Selecione um Deck</option>
                            {myDecks.map((deck)=>(
                                <option value={deck.id_deck}>{deck.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </main>
    )
}