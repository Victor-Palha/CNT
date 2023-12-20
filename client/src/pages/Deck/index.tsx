import { Header } from "../../components/Header";
import { TbCardsFilled } from "react-icons/tb"
import { RxCardStackPlus } from "react-icons/rx"
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
import { useEffect, useState } from "react";
// avatar_id
// : 
// "81a0c8e6-9b72-4758-8c20-b3aa9fbf379d"
// id_deck
// : 
// "e32c7693-44d9-4459-b3cf-4006c5da3afb"
// name
// : 
// "Lets fucking Go"
// player_id
// : 
// "ffb31
export interface MyDeck{
    avatar_id: string,
    id_deck: string,
    name: string,
    player_id: string
}
export function Deck(){
    const [myDecks, setMyDecks] = useState<MyDeck[]>([])
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
        <>
            <Header/>
            <div className="flex flex-col justify-center pt-20 items-center gap-10 ">
                <h1 className="text-2xl font-bold text-blue-500">Decks</h1>
                <div className="flex cyber-tile-big w-full p-4 gap-2 flex-wrap justify-center items-center">
                    <Link to={"/deck/create"} className="">
                        <div className="cyber-tile-small cyber-glitch-1 bg-black flex justify-center items-center text-white flex-col border-2 border-red-400">
                                <RxCardStackPlus className="w-10 h-10 text-blue-500"/>
                                <p>Criar novo Deck</p>
                        </div>
                    </Link>
                    {myDecks.map((deck)=>(
                        <Link to={"/deck/"+deck.id_deck} key={deck.id_deck}>
                            <div className="cyber-tile-small cyber-glitch-1 bg-black flex justify-center items-center text-white flex-col border-yellow-400 border-2">
                                <TbCardsFilled className="w-10 h-10 text-blue-500"/>
                                <p>{deck.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}