import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Player } from "../../context/authContext"
import { confrontContext } from "../../context/confrontContext"

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

export function Game(){

    // Core information
    const {socket} = useContext(confrontContext)
    let Me = localStorage.getItem('@player:cnt') as any
    Me = Me ? JSON.parse(Me) as Player : null

    const {room_id, deck_id} = useParams()

    // States
    const [myAvatar, setMyAvatar] = useState<AvatarProps>({} as AvatarProps)
    const [myHand, setMyHand] = useState<Cards[]>([])
    const [myDeck, setMyDeck] = useState<number>(0)
    const [myField, setMyField] = useState<Field>([])
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false)

    const [enemyField, setEnemyField] = useState<Field>([])
    const [enemyDeck, setEnemyDeck] = useState<number>(0)
    const [enemyHand, setEnemyHand] = useState<number>(0)
    const [enemyAvatar, setEnemyAvatar] = useState<AvatarProps>({} as AvatarProps)

    const [room, setRoom] = useState<ConfrontRoom>({} as ConfrontRoom)

    // Hand functions / Field functions
    function handleDragStart(e:React.DragEvent<HTMLDivElement>, id:string){
        e.dataTransfer.setData("id", id)
    }
    function handleSetCards(e:React.DragEvent<HTMLDivElement>){
        const idFromCard = e.dataTransfer.getData("id")
        const idFromField = e.currentTarget.id

        const fieldCard = document.getElementById(idFromField);

        fieldCard && (fieldCard.style.backgroundColor = "cyan");
        socket && socket.emit("set_Card", {
            room_id,
            player_id: Me.username,
            card: myHand.find(card => card.id_card === idFromCard),
            field_id: idFromField
        })
    }

    useEffect(()=>{
        socket && socket.emit("join_Game", {
            room_id,
            player_id: Me.username,
        })
        .on("deal_Cards", (room: PrepareCards)=>{
            console.log(room)
            setMyAvatar(room.player.avatar)
            setMyHand(room.player.hand)
            setMyDeck(room.player.deck)
            setMyField(room.player.field)
            if(room.turnOf === Me.username){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            
            setEnemyField(room.enemy.field)
            setEnemyAvatar(room.enemy.avatar)
            setEnemyHand(room.enemy.hand)
            setEnemyDeck(room.enemy.deck)
        }).on("set_Card", (newField: PrepareCards)=>{
            setMyField(newField.player.field)
            setMyHand(newField.player.hand)
            
            setEnemyField(newField.enemy.field)
            setEnemyHand(newField.enemy.hand)

        })
    }, [socket])

    return (
        <main>
            <div className="flex justify-center mt-[-4rem] w-full items-center absolute z-10">
            {Array.from({ length: enemyHand }, (_, index) => (
                <div key={index} className="cyber-tile bg-red w-[100px] h-[100px]"></div>
            ))}
            </div>
            <div className="mx-32 my-10 bg-gray-900">
                {/* Enemy Grid */}
                <div className={`p-4 ${isMyTurn === false && "animate-pulse"}`}>
                    <div className="grid grid-cols-3">
                        {enemyField && enemyField.map((card, index) => (
                            <div key={index} id={card.id} className="bg-gray-800 w-[200px] h-[170px] cyber-tile border-red-500 border-2"></div>
                        ))}
                    </div>
                    {enemyAvatar && (
                        <div className="bg-black w-[120px] mx-auto m-4 rotate-180 cyber-tile">
                            <img src={enemyAvatar.image}/>
                            <div className="text-white rotate-180 flex items-center justify-center">
                                <span>ATK: {enemyAvatar.attack}</span>
                                <span>HP: {enemyAvatar.hit_points}</span>
                                <span>DEF: {enemyAvatar.defense}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`p-4 ${isMyTurn === true && "animate-pulse"}`}>
                    {/* Player Grid */}
                    {myAvatar && (   
                        <div className="bg-black w-[120px] h-[180px] mx-auto m-4 cyber-tile group">
                            <img src={myAvatar.image} className="group-hover:scale-150"/>
                            <div className="text-white flex items-center justify-center">
                                <span>ATK: {myAvatar.attack}</span>
                                <span>HP: {myAvatar.hit_points}</span>
                                <span>DEF: {myAvatar.defense}</span>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 w-full gap-2">
                        {myField && myField.map((card, index) => (
                            <div 
                                key={index} 
                                id={card.id} 
                                className="bg-gray-800 w-[200px] h-[170px] cyber-tile border-2 border-cyan-500"
                                onDragLeave={(e)=>{handleSetCards(e)}}
                            ></div>
                        ))}
                        {/* <div 
                            className="bg-gray-800 w-[200px] h-[170px] cyber-tile border-2 border-cyan-500"
                            id="x1"
                            onDragLeave={(e)=>{handleSetCards(e)}}
                        >

                        </div>
                        <div 
                            className="bg-gray-800 w-[200px] h-[170px] cyber-tile border-2 border-cyan-500"
                            id="x2"
                            onDragLeave={(e)=>{handleSetCards(e)}}
                        >

                        </div>
                        <div 
                            className="bg-gray-800 w-[200px] h-[170px] cyber-tile border-2 border-cyan-500"
                            id="x3"
                            onDragLeave={(e)=>{handleSetCards(e)}}
                        >

                        </div> */}
                    </div>
                </div>
                <div className="bg-cyan cyber-tile w-[100px] h-[120px] my-[-10rem] absolute right-0 mr-2">
                    <p>{myDeck}</p><br />
                    <p>DECK</p>
                </div>
            </div>
            {/* My Hand */}
            <div className="flex justify-center mt-[-7rem] w-full items-center absolute z-10">
                {myHand && myHand.map((card, index) => (
                    <div 
                        key={index} 
                        className="cyber-tile bg-cyan w-[100px] h-[200px] hover:scale-105 cursor-move"
                        draggable
                        onDragStart={(e)=>{handleDragStart(e, card.id_card)}}
                        id={card.id_card}
                    >
                        <img src={card.image} draggable={false}/>
                        <div className="text-sm flex flex-col bg-gray-900">
                            <span className="text-white">{card.name}</span>
                            <span className="text-white">{card.description}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

type ConfrontRoom = {
    room_id: string;
    players: {
        player: string;
        socket_id: string;
        isPlayerTurn: boolean;
        avatar: Avatar
        hand: Cards[];
        deck: Cards[];
        field: Field
    }[]
}

type Field = {
    id: string;
    card: Cards;
    empty: boolean;
    activated: {
        isActivated: boolean;
        chain: number;
    }
}[]

type PrepareCards = {
    turnOf: string;
    player: {
        hand: Cards[];
        avatar: Avatar;
        deck: number;
        field: Field;
    }
    enemy: {
        hand: number,
        avatar: Avatar;
        deck: number;
        field: Field;
    }
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
type Avatar = {
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
type Cards = {
        id_card: string;
        name: string;
        description: string;
        image: string;
        set_card: string;
        type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
        list: number;
        created_at: Date;
        updated_at: Date;
}