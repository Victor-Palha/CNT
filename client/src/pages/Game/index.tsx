import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Player } from "../../context/authContext"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { MyField } from "./MyField"
import { OponentField } from "./OponentField"
import { Socket, io } from "socket.io-client";
import { Dialog } from "./Dialog";
import { GameState } from "./GameState";

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
    const [dialog, setDialog] = useState<boolean>(false)
    const [cardDialog, setCardDialog] = useState<Cards | Avatar | undefined>(undefined)
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
    // Dialog
    function handleDialog(card: Cards | Avatar | undefined){
        setDialog(!dialog)
        setCardDialog(card)
    }

    // Hand functions / Field functions
    function handleDragStart(e:React.DragEvent<HTMLDivElement>, id:string){
        // e.preventDefault()
        e.dataTransfer.setData("id", id)
        setSetCard(id)
    }

    function handleSetCards(e:React.DragEvent<HTMLDivElement>){
        const idFromCard = setCard
        const idFromField = e.currentTarget.id

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

    function skipTurn(){
        socket && socket.emit("skip_Turn", {room_id, player_id: Me.id_player})
    }
    // Climax
    function climaxPhase(id: any){
        socket && socket.emit("climax_Phase", {room_id: id, player_id: Me.id_player})
    }

    useEffect(()=>{        
        socket && socket.emit("init_Game", {
            room_id,
            player_id: Me.id_player,
        })
        .on("room_Not_Found", ()=> {
            toast.error("Sala não encontrada!")
            window.location.href = "/confront/rooms"
        })
        .on("deal_Cards", (room: PrepareCards)=>{
            setPhase(room.gameState)
            setMyAvatar(room.player.avatar)
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
        .on("start_Action_Phase", (itsActionPhase: number)=> {
            setPhase(itsActionPhase)
        })
        .on("i_Activate_Card", (newField: SetCards)=>{
            setMyField(newField.field as Field)
            setMyAvatar(newField.avatar)
            setMyDeck(newField.deck)
            setMyHand(newField.hand as Cards[])
            if(newField.turnOf === Me.id_player){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            if(newField.gameState === 3 && newField.turnOf === Me.id_player){
                climaxPhase(room_id)
            }
            setPhase(newField.gameState)
        })
        .on("enemy_Activate_Card", (newField: SetCards)=>{
            setEnemyField(newField.field as Field)
            setEnemyAvatar(newField.avatar)
            setEnemyDeck(newField.deck)
            setEnemyHand(newField.hand as number)
            if(newField.turnOf === Me.id_player){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            if(newField.gameState === 3 && newField.turnOf === Me.id_player){
                climaxPhase(room_id)
            }
            setPhase(newField.gameState)
        })
        .on("skip_Turn", (data)=>{
            const {turnOf, gameState} = data
            if(turnOf === Me.id_player){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            if(gameState === 3 && turnOf === Me.id_player){
                climaxPhase(room_id)
            }
            setPhase(gameState)
        })
        .on("climax_Phase_End", (data: PrepareCards)=>{
            setPhase(data.gameState)
            setMyAvatar(data.player.avatar)
            setMyHand(data.player.hand)
            setMyDeck(data.player.deck)
            setMyField(data.player.field)
            if(data.turnOf === Me.id_player){
                setIsMyTurn(true)
            }else{
                setIsMyTurn(false)
            }
            
            setEnemyField(data.enemy.field)
            setEnemyAvatar(data.enemy.avatar)
            setEnemyHand(data.enemy.hand)
            setEnemyDeck(data.enemy.deck)
        })
        .on("game_End", (data)=>{
            const {winner} = data
            if(winner != null){
                if(winner === Me.id_player){
                    toast.success("Você ganhou!")
                }else{
                    toast.error("Você perdeu!")
                }
            }
        })
    }, [socket])

    useEffect(()=>{
        const socket = io("http://localhost:3000/game")
        setSocket(socket)
    }, [])

    return (
        <main>
                <OponentField 
                    enemyAvatar={enemyAvatar}
                    enemyField={enemyField}
                    enemyHand={enemyHand}
                    isMyTurn={isMyTurn}
                    enemyDeck={enemyDeck}
                />
                <div className="w-full justify-center items-center flex">
                    <GameState phase={phase} isMyTurn={isMyTurn} skip={skipTurn}/>
                </div>
                <MyField 
                    handleDragStart={handleDragStart} 
                    handleSetCards={handleSetCards}
                    ativateCard={ativateCard}
                    dialog={handleDialog}
                    isMyTurn={isMyTurn}
                    myAvatar={myAvatar} 
                    myDeck={myDeck} 
                    myField={myField} 
                    myHand={myHand}
                    phase={phase}
                />
                {dialog && (
                    <Dialog open={dialog} card={cardDialog} close={handleDialog}/>
                )}

            <ToastContainer
                limit={1}
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

export type Field = {
    field_id: string;
    empty: boolean;
    card: Cards | null;
}[]

type PrepareCards = {
    winner: string;
    gameState: number
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
    gameState: number;
    player: string,
    hand: Cards[] | number,
    field: Field,
    deck: number,
    avatar: Avatar
    turnOf: string
}

export type Avatar = {
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
export type Cards = {
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