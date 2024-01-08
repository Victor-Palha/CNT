import { Server, Socket } from "socket.io";
import {CreateRoom} from "../events/create-room.event";
import {SendMessage} from "../events/send-message.event";
import {ChooseDeck} from "../events/choose-deck.event";
import {PlayerReady} from "../events/player-ready.event";
import {RoomInfo} from "../events/room-info.event";
import {LeaveRoom} from "../events/leave-room.event";
import {JoinRoom} from "../events/join-room.event";

export function eventsFactory(io: Server){
    const createRoom = new CreateRoom(io)
    const sendMessage = new SendMessage(io)
    const chooseDeck = new ChooseDeck(io)
    const playerReady = new PlayerReady(io)
    const roomInfo = new RoomInfo(io)
    const leaveRoom = new LeaveRoom(io)
    const joinRoom = new JoinRoom(io)
    return {
        setup: (socket: Socket)=>{
            createRoom.setup(socket)
            sendMessage.setup(socket)
            chooseDeck.setup(socket)
            playerReady.setup(socket)
            roomInfo.setup(socket)
            leaveRoom.setup(socket)
            joinRoom.setup(socket)
        }
    }
    
}