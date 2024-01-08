import { Server, Socket } from "socket.io";
import {Rooms} from "..";
type SendMessageData = {
    room_id: string;
    message: string;
}

export function SendMessage(socket: Socket, INSTANCE: Rooms){
    socket.on("send_Message", (data: SendMessageData)=>{
        const {room_id, message} = data
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

        room.messages.push({
            playerName: player.player,
            message
        })

        INSTANCE.io.to(room_id).emit("new_Message", room.messages)
    })
}