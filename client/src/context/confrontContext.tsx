import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

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

export interface DeckPlayer{
    deck: {
        id_deck: string | undefined;
        name: string | undefined;
    } | null;
    cards: Cards[] | undefined;
    avatar: Avatar | undefined;
}

export type Room = {
    room_id: string;
    room_name: string;
    players: {
        player_id: string;
        socket_id: string;
        deck: DeckPlayer;
    }[] 
}

export type PrepareRoom = {
    room_id: string;
    room_name: string;
    players: {
        socket_id: string;
        player: string;
    }[]
    messages: {
        playerName: string;
        message: string;
    }[]
}

interface ConfrontContextProps {
    socket: Socket | undefined;
}

export const confrontContext = createContext({} as ConfrontContextProps)
type ConfrontProviderProps = {
    children: React.ReactNode
}


export function ConfrontProvider({children}: ConfrontProviderProps){
    const [socket, setSocket] = useState<Socket | undefined>()
    
    useEffect(()=>{
        const socket = io("http://localhost:3000")
        setSocket(socket)
    }, [])
    return (
        <confrontContext.Provider value={{socket}}>
            {children}
        </confrontContext.Provider>
    )
}