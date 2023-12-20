import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Player } from "../../context/authContext"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { MyField } from "./MyField"
import { OponentField } from "./OponentField"
import { Socket, io } from "socket.io-client";

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
            isMyTurn === true ? toast.info("Sua vez de jogar!") : toast.info("Vez do oponente jogar!")
            setPhase(2)
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
                />
                <MyField 
                    handleDragStart={handleDragStart} 
                    handleSetCards={handleSetCards}
                    ativateCard={ativateCard}
                    isMyTurn={isMyTurn}
                    myAvatar={myAvatar} 
                    myDeck={myDeck} 
                    myField={myField} 
                    myHand={myHand}
                    phase={phase}
                />


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