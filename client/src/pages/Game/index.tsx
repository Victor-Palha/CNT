import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Player } from "../../context/authContext"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
import { Socket, io } from "socket.io-client"
=======
import { MyField } from "./MyField"
import { OponentField } from "./OponentField"
>>>>>>> 690aa80 (Refactore UI)

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
    const [socket, setSocket] = useState<Socket | undefined>()

    let Me = localStorage.getItem('@player:cnt') as any
    Me = Me ? JSON.parse(Me) as Player : null

    const {room_id} = useParams()

    const [phase, setPhase] = useState<number>(1)
    // 0 - Compra
    // 1 - Preparação
    // 2 - Ação
    // 3 - Climax

    // States
    const [myAvatar, setMyAvatar] = useState<AvatarProps>({} as AvatarProps)
    const [myHand, setMyHand] = useState<Cards[]>([])
    const [myDeck, setMyDeck] = useState<number>(0)
    const [myField, setMyField] = useState<Field>([])
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false)
    const [setCard, setSetCard] = useState<string>("")

    const [enemyField, setEnemyField] = useState<Field>([])
    const [enemyDeck, setEnemyDeck] = useState<number>(0)
    const [enemyHand, setEnemyHand] = useState<number>(0)
    const [enemyAvatar, setEnemyAvatar] = useState<AvatarProps>({} as AvatarProps)

    // Hand functions / Field functions
    function handleDragStart(e:React.DragEvent<HTMLDivElement>, id:string){
        // e.preventDefault()
        e.dataTransfer.setData("id", id)
        setSetCard(id)
    }

    function handleSetCards(e:React.DragEvent<HTMLDivElement>){
        const idFromCard = setCard
        const idFromField = e.currentTarget.id
<<<<<<< HEAD
        console.log(idFromCard, idFromField)
=======
>>>>>>> 690aa80 (Refactore UI)

        if (idFromCard) {
            socket && socket.emit("set_Card", {
                room_id,
                player_id: Me.id_player,
                card: myHand.find(card => card._id === idFromCard),
                field_id: idFromField
            })
        }
    }

    function ativateCard(field_id: string){
        socket && socket.emit("activate_Card", {field_id, room_id, player_id: Me.id_player})
    }

    useEffect(()=>{        
        socket && socket.emit("init_Game", {
            room_id,
            player_id: Me.id_player,
        })
        .on("deal_Cards", (room: PrepareCards)=>{
            toast.info("Fase de preparação iniciada!")
            setMyAvatar(room.player.avatar)
            console.log(room.player.hand)
            setMyHand(room.player.hand)
            setMyDeck(room.player.deck)
            setMyField(room.player.field)
            if(room.turnOf === Me.id_player){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            
            setEnemyField(room.enemy.field)
            setEnemyAvatar(room.enemy.avatar)
            setEnemyHand(room.enemy.hand)
            setEnemyDeck(room.enemy.deck)
        })
        .on("i_Set_Card", (newField: SetCards)=>{
            setMyHand(newField.hand as Cards[])
            setMyDeck(newField.deck)
            setMyField(newField.field as Field)
        })
        .on("enemy_Set_Card", (newField: SetCards)=>{
            setEnemyField(newField.field as Field)
            setEnemyHand(newField.hand as number)
            setEnemyDeck(newField.deck)
        })
        .on("start_Action_Phase", (itsActionPhase: boolean)=> {
            itsActionPhase && toast.info("Fase de ação iniciada!")
            isMyTurn ? toast.info("Sua vez de jogar!") : toast.info("Vez do oponente jogar!")
        })
        .on("start_Action_Phase", ()=>{
            setPhase(2)
        })
        .on("i_Activate_Card", (newField: SetCards)=>{
            setMyField(newField.field as Field)
            setMyAvatar(newField.avatar)
            setMyDeck(newField.deck)
            setMyHand(newField.hand as Cards[])
        })
        .on("enemy_Activate_Card", (newField: SetCards)=>{
            setEnemyField(newField.field as Field)
            setEnemyAvatar(newField.avatar)
            setEnemyDeck(newField.deck)
            setEnemyHand(newField.hand as number)
        })
    }, [socket])

    useEffect(()=>{
        const socket = io("http://localhost:3000/game")
        setSocket(socket)
    }, [])

    return (
        <main>
<<<<<<< HEAD
            <div className="flex justify-center mt-[-4rem] w-full items-center absolute z-10">
            {Array.from({ length: enemyHand }, (_, index) => (
                <div key={index} className="cyber-tile bg-red w-[100px] h-[100px]"></div>
            ))}
            </div>
            <div className="mx-36 my-12 bg-gray-900">
                {/* Enemy Grid */}
                <div className={`p-4 ${isMyTurn === false && "animate-pulse"}`}>
                    <div className="grid grid-cols-3 gap-10">
                        {enemyField && enemyField.map((card, index) => (
                            <div key={index} id={card.field_id} className="bg-gray-800 w-full h-[170px] cyber-tile border-red-500 border-2">
                                {!card.empty && !card.card?.activate && <div className="bg-red w-full h-full"></div>}
                                {card.card?.activate && (
                                    <div>
                                        <img src={card.card.image} className="object-fill max-h-[170px] opacity-50 rotate-180"/>
                                    </div>
                                )}
                            </div>
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
                        <div className="bg-black w-[120px] h-[180px] mx-auto m-4 cyber-tile">
                            <img src={myAvatar.image}/>
                            <div className="text-white flex items-center justify-center">
                                <span>ATK: {myAvatar.attack}</span>
                                <span>HP: {myAvatar.hit_points}</span>
                                <span>DEF: {myAvatar.defense}</span>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 w-full gap-10">
                        {myField && myField.map((card, index) => (
                            <div 
                                key={index} 
                                id={card.field_id} 
                                className="bg-gray-800 w-full h-[170px] cyber-tile border-2 border-cyan-500"
                                onDragOver={(e)=>{e.preventDefault()}}
                                onDrop={(e)=>{handleSetCards(e)}}
                            >
                                {phase === 2 && isMyTurn && (
                                    <button 
                                        className="z-30 absolute bg-yellow p-2 cursor-pointer"
                                        onClick={()=>{ativateCard(card.field_id)}}    
                                    >    
                                        Ativar Carta
                                    </button>
                                )}
                                {card.card && <img src={card.card.image} className="object-fill max-h-[170px] opacity-50"/>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-cyan cyber-tile w-[100px] h-[120px] my-[-10rem] absolute right-0 mr-2">
                    <p>{myDeck}</p><br />
                    <p>DECK</p>
                </div>
            </div>
            {/* My Hand */}
            <div className="flex justify-center mt-[-7rem] w-full items-center absolute z-10">
                {myHand && myHand.length > 0 && myHand.map((card, index) => (
                    <div 
                        key={index} 
                        className="cyber-tile bg-cyan w-[100px] h-[200px] hover:scale-105 cursor-move"
                        draggable={true}
                        onDragStart={(e)=>{handleDragStart(e, card._id)}}
                        // onDrop={(e)=>{handleSetCards(e)}}
                        id={card._id}
                    >
                        <img src={card.image} draggable={false}/>
                        <div className="text-sm flex flex-col bg-gray-900">
                            <span className="text-white">{card.name}</span>
                            <span className="text-white">{card.description}</span>
                        </div>
                    </div>
                ))}
            </div>
=======
                <OponentField 
                    enemyAvatar={enemyAvatar}
                    enemyField={enemyField}
                    enemyHand={enemyHand}
                    isMyTurn={isMyTurn}
                />
                <MyField 
                    handleDragStart={handleDragStart} 
                    handleSetCards={handleSetCards} 
                    isMyTurn 
                    myAvatar={myAvatar} 
                    myDeck={myDeck} 
                    myField={myField} 
                    myHand={myHand}
                />
>>>>>>> 690aa80 (Refactore UI)
            <ToastContainer
                // limit={1}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </main>
    )
}

type Field = {
    field_id: string;
    empty: boolean;
    card: Cards | null;
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

type SetCards = {
    player: string,
    hand: Cards[] | number,
    field: Field,
    deck: number,
    avatar: Avatar
}

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
        _id: string;
        name: string;
        description: string;
        image: string;
        set_card: string;
        type_card: "OFENSIVA" | "DEFENSIVA" | "HABILIDADE" | "HABILIDADE_UNICA";
        list: number;
        activate: boolean;
        created_at: Date;
        updated_at: Date;
}