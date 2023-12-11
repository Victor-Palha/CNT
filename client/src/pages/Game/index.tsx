import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { Player } from "../../context/authContext"

type AvatarProps = {
    id_avatar: string;
    name: string;
    description: string;
    image: string;
    set_avatar: string;
    unique_ability: string;
    passive_ability: string | null;
    hit_points: number;
    attack: number;
    defense: number;
    type_avatar: "OFENSIVO" | "DEFENSIVO" | "MODERADO";
    created_at: Date;
    updated_at: Date;
}

const socketGame = io("http://localhost:3000/confronts")

export function Game(){
    // Core information
    let Me = localStorage.getItem('@player:cnt') as any
    Me = Me ? JSON.parse(Me) as Player : null

    const {room_id, deck_id} = useParams()

    // States
    const [myAvatar, setMyAvatar] = useState<AvatarProps>({} as AvatarProps)
    const [enemyAvatar, setEnemyAvatar] = useState<AvatarProps>({} as AvatarProps)
    const [room, setRoom] = useState<ConfrontRoom>({} as ConfrontRoom)

    useEffect(()=>{
        socketGame && socketGame.emit("init_Game", {
            room_id,
            player_id: Me.id_player,
            deck_id: deck_id
        })
        .on("room_updated", async (room: ConfrontRoom)=>{
            setRoom(room)
            console.log(room)
            room.players.map((player)=>{
                if(player.player_id === Me.id_player){
                    setMyAvatar(player.avatar)
                }else{
                    setEnemyAvatar(player.avatar)
                }
            })
        })
    }, [room])

    return (
        <main className="flex flex-col">
            {/* Enemy Grid */}
            <div className="p-4">
                <div className="grid grid-cols-3">
                    <div className="bg-red w-[33%] h-[200px]"></div>
                    <div className="bg-red w-[33%] h-[200px]"></div>
                    <div className="bg-red w-[33%] h-[200px]"></div>
                </div>
                {enemyAvatar && (
                    <div className="bg-black w-[150px] h-[200px] mx-auto m-4 rotate-180">
                        <img src={enemyAvatar.image}/>
                        <div className="text-white rotate-180 flex items-center justify-center">
                            <span>ATK: {enemyAvatar.attack}</span>
                            <span>HP: {enemyAvatar.hit_points}</span>
                            <span>DEF: {enemyAvatar.defense}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                {/* Player Grid */}
                {myAvatar && (   
                    <div className="bg-black w-[150px] h-[200px] mx-auto m-4">
                        <img src={myAvatar.image}/>
                        <div className="text-white flex items-center justify-center">
                            <span>ATK: {myAvatar.attack}</span>
                            <span>HP: {myAvatar.hit_points}</span>
                            <span>DEF: {myAvatar.defense}</span>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-3">
                    <div className="bg-cyan w-[33%] h-[200px]"></div>
                    <div className="bg-cyan w-[33%] h-[200px]"></div>
                    <div className="bg-cyan w-[33%] h-[200px]"></div>
                </div>
            </div>
        </main>
    )
}

type ConfrontRoom = {
    room_id: string;
    players: {
        socket_id: string;
        player_id: string;
        avatar: AvatarProps;
    }[]
}

// export interface DeckWithCards{
//     deck: {
//         id_deck: string | undefined;
//         name: string | undefined;
//     } | null;
//     cards: {
//         id_card: string;
//         name: string;
//         description: string;
//         image: string;
//         set_card: string;
//         type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
//         list: number;
//         created_at: Date;
//         updated_at: Date;
//     } | undefined;
//     avatar: {
//         id_avatar: string;
//         name: string;
//         description: string;
//         image: string;
//         set_avatar: string;
//         unique_ability: string;
//         passive_ability: string | null;
//         hit_points: number;
//         attack: number;
//         defense: number;
//         type_avatar: "OFENSIVO" | "DEFENSIVO" | "MODERADO";
//         created_at: Date;
//         updated_at: Date;
//     }
// }