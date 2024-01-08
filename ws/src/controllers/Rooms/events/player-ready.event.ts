import { Server, Socket } from "socket.io";
import {Rooms} from "..";

type PlayerReadyData = {
    room_id: string;
    ready: boolean;
}

export function PlayerReady(socket: Socket, INSTANCE: Rooms){
    socket.on("player_Ready", (data: PlayerReadyData)=>{
        const {room_id, ready} = data
        const room = INSTANCE.getRoom(room_id)
        if(!room){
            socket.emit("room_not_found")
            return
        }

        const player = room.players.find(player => player.socket_id === socket.id)
        if(!player){
            socket.emit("player_not_found")
            return
        }

        player.ready = ready
        INSTANCE.io.to(room_id).emit("room_Info", room)
    })
}