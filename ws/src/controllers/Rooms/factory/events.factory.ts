import { Socket } from "socket.io";
import { Rooms } from "..";
import { ChooseDeck } from "../events/choose-deck.event";
import { CreateRoom } from "../events/create-room.event";
import { JoinRoom } from "../events/join-room.event";
import { LeaveRoom } from "../events/leave-room.event";
import { PlayerReady } from "../events/player-ready.event";
import { RoomInfo } from "../events/room-info.event";
import { SendMessage } from "../events/send-message.event";
import { StartGame } from "../events/start-game.event";

export function Events(socket: Socket, INSTANCE: Rooms){
    ChooseDeck(socket, INSTANCE)
    CreateRoom(socket, INSTANCE)
    JoinRoom(socket, INSTANCE)
    LeaveRoom(socket, INSTANCE)
    PlayerReady(socket, INSTANCE)
    RoomInfo(socket, INSTANCE)
    SendMessage(socket, INSTANCE)
    StartGame(socket, INSTANCE)
}